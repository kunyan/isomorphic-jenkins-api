import JenkinsAPI from '../index';
import { IJenkinsJob } from '../models/job';

export default class Job {
  private jenkins: JenkinsAPI;

  constructor(jenkins: JenkinsAPI) {
    this.jenkins = jenkins;
  }

  public get(jobName: string) {
    const path = `/job/${jobName}/api/json/`;
    return this.jenkins.fetch.get<IJenkinsJob>(path);
  }

  public build(jobName: string, parameters?: { [key: string]: string }) {
    const path = `/job/${jobName}/build`;

    const formData = new FormData();

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        formData.append(key, parameters[key]);
      });
      formData.append(
        'json',
        JSON.stringify({
          parameter: Object.keys(parameters).map((key: string) => ({
            name: key,
            value: parameters[key]
          }))
        })
      );
    }

    this.jenkins.fetch.post<IJenkinsJob>(path, formData);
  }

  public buildWithParameters(
    jobName: string,
    parameters: { [key: string]: string } = {}
  ) {
    const path = `/job/${jobName}/buildWithParameters`;

    const formData = new FormData();
    Object.keys(parameters).forEach(key => {
      formData.append(key, parameters[key]);
    });

    this.jenkins.fetch.post<IJenkinsJob>(path, formData);
  }
}
