import JenkinsAPI from '..';
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
}
