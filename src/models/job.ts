import { IJenkinsBuild } from './build';

export interface IJenkinsJob {
  _class: string;
  actions?: Array<{ [key: string]: string }>;
  description?: string;
  displayName?: string;
  displayNameOrNull?: string;
  fullDisplayName?: string;
  fullName?: string;
  name: string;
  url: string;
  buildable?: boolean;
  builds?: IJenkinsBuild[];
  color: TJenkinsJobColor;
  firstBuild?: IJenkinsBuild;
  healthReport?: IJenkinsHealthReport;
  inQueue?: boolean;
  keepDependencies?: boolean;
  lastBuild?: IJenkinsBuild;
  lastCompletedBuild?: IJenkinsBuild;
  lastFailedBuild?: IJenkinsBuild;
  lastStableBuild?: IJenkinsBuild;
  lastSuccessfulBuild?: IJenkinsBuild;
  lastUnstableBuild?: IJenkinsBuild;
  lastUnsuccessfulBuild?: IJenkinsBuild;
  nextBuildNumber?: number;
  property?: IJenkinsProperty[];
  queueItem?: any;
  concurrentBuild?: boolean;
  resumeBlocked?: boolean;
}

export interface IJenkinsHealthReport {
  description: string;
  iconClassName: string;
  iconUrl: string;
  score: number;
}

export interface IJenkinsProperty {
  _class: string;
  parameterDefinitions?: IJenkinsParameter[];
}

export interface IJenkinsParameterBase<T> {
  _class: string;
  defaultParameterValue?: T;
  description?: any;
  name: string;
  type: string;
}

export interface IJenkinsStringParameter
  extends IJenkinsParameterBase<IJenkinsStringParameter> {}

export interface IJenkinsChoiceParameter
  extends IJenkinsParameterBase<IJenkinsStringParameter> {
  choices?: string[];
}

export interface IJenkinsHideParameter
  extends IJenkinsParameterBase<IJenkinsStringParameter> {}
type IJenkinsParameter =
  | IJenkinsStringParameter
  | IJenkinsChoiceParameter
  | IJenkinsHideParameter;

type TJenkinsJobColor = 'notbuilt' | 'aborted' | 'blue' | 'red';
