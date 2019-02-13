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

test('get single job', async () => {
  const jobName = 'test-mono-mainline-linux';
  const response = await api.job.get(jobName);
  expect(response.builds).toBeInstanceOf(Array);
}, 100000);

test.skip('trigger a job build', async () => {
  const jobName = 'test-mono-mainline-linux';
  const parameters = {
    tag: 'latest'
  };
  await api.job.buildWithParameters(jobName, parameters);
}, 100000);
