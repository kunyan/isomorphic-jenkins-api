import Info from './api/info';
import Job from './api/job';
import Fetch from './utils/fetch';

export interface IJenkinsAPIOption {
  host: string;
  token?: string;
  username?: string;
}

export default class JenkinsAPI {
  public fetch: Fetch;

  public info = new Info(this);
  public job = new Job(this);
  constructor(options: IJenkinsAPIOption) {
    this.fetch = new Fetch(options);
  }
}
