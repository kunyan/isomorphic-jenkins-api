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
  const response = await api.info.get();
  expect(response._class).toBe('hudson.model.Hudson');
  expect(response.jobs).toBeInstanceOf(Array);
}, 100000);
