import { IJenkinsJob } from './job';
import { IJenkinsView } from './view';

export interface IJenkins {
  _class: string;
  assignedLabels: Array<{ [key: string]: string }>;
  mode: string;
  nodeDescription: string;
  nodeName: string;
  numExecutors: number;
  description: string;
  jobs: IJenkinsJob[];
  overallLoad: object;
  primaryView: IJenkinsView;
  quietingDown: boolean;
  slaveAgentPort: number;
  unlabeledLoad: Array<{ [key: string]: string }>;
  useCrumbs: boolean;
  useSecurity: boolean;
  views: IJenkinsView[];
}
