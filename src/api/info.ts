import JenkinsAPI from '..';
import { IJenkins } from '../models/info';

export default class Info {
  private jenkins: JenkinsAPI;
  constructor(jenkins: JenkinsAPI) {
    this.jenkins = jenkins;
  }

  public get() {
    const path = '/api/json/info';
    return this.jenkins.fetch.get<IJenkins>(path);
  }
}
