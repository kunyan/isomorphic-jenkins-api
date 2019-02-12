import 'jest';
import JenkinsAPI from '../../src';

let api: JenkinsAPI;
beforeAll(() => {
  api = new JenkinsAPI({
    host: process.env['JENKINS_HOST'] as string,
    username: process.env['JENKINS_USERNAME'],
    token: process.env['JENKINS_TOKEN']
  });
});

test('get all jobs', async () => {
  const jobName = 'test-mono-mainline-linux';
  const response = await api.job.get(jobName);
  console.log(response);
}, 100000);
