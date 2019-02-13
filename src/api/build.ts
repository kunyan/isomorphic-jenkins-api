import JenkinsAPI from '../index';
import { IJenkinsJob } from '../models/job';
import { IJenkinsBuild } from '../models/build';

export default class Build {
  private jenkins: JenkinsAPI;
  constructor(jenkins: JenkinsAPI) {
    this.jenkins = jenkins;
  }

  public get(jobName: string, buildNumber: number) {
    const path = `/job/${jobName}/${buildNumber}/api/json/`;
    return this.jenkins.fetch.get<IJenkinsBuild>(path);
  }

  public stop(jobName: string, buildNumber: number) {
    const path = `/job/${jobName}/${buildNumber}/stop/`;
    return this.jenkins.fetch.get<IJenkinsBuild>(path);
  }
}
