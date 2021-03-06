/* eslint-env jest */
import RingCentral from '../src/index';
import {
  MeetingRequestResource,
  MeetingScheduleResource,
  TimezoneResource,
  HostInfoRequest,
} from '../src/definitions';
import {testRingCentral} from './utils';

jest.setTimeout(64000);

describe('schedule meeting', () => {
  test('for myself', async () => {
    const testCase = async (rc: RingCentral) => {
      // schedule a meeting
      const meetingRequestResource = new MeetingRequestResource();
      meetingRequestResource.topic = 'test meeting';
      meetingRequestResource.meetingType = 'Scheduled';
      const meetingScheduleResource = new MeetingScheduleResource();
      // the format is important! wrong format won't work at all!
      // new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString()  does NOT work, wrong format
      meetingScheduleResource.startTime = meetingScheduleResource.startTime =
        '2030-05-01T00:01:49Z';
      meetingScheduleResource.durationInMinutes = 30;
      const timezoneResource = new TimezoneResource();
      timezoneResource.id = '58';
      meetingScheduleResource.timeZone = timezoneResource;
      meetingRequestResource.schedule = meetingScheduleResource;
      const meetingResponseResource = await rc
        .restapi()
        .account()
        .extension()
        .meeting()
        .post(meetingRequestResource);

      // don't forget to clean up
      await rc
        .restapi()
        .account()
        .extension()
        .meeting(meetingResponseResource.id)
        .delete();
      await rc.revoke();
    };
    await testRingCentral(testCase);
    await testRingCentral(testCase, 'wss');
  });

  test('for others', async () => {
    const testCase = async (rc: RingCentral) => {
      const rc2 = new RingCentral({
        clientId: process.env.RINGCENTRAL_CLIENT_ID!,
        clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
        server: process.env.RINGCENTRAL_SERVER_URL!,
      });
      await rc2.login({
        username: process.env.RINGCENTRAL_USERNAME2!,
        extension: process.env.RINGCENTRAL_EXTENSION2!,
        password: process.env.RINGCENTRAL_PASSWORD2!,
      });

      const ext2 = await rc2.restapi().account().extension().get();

      // schedule a meeting
      const meetingRequestResource = new MeetingRequestResource();
      meetingRequestResource.topic = 'test meeting';
      meetingRequestResource.meetingType = 'Scheduled';
      const meetingScheduleResource = new MeetingScheduleResource();
      // the format is important! wrong format won't work at all!
      // new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString()  does NOT work, wrong format
      meetingScheduleResource.startTime = '2030-05-01T00:01:49Z';
      meetingScheduleResource.durationInMinutes = 30;
      const timezoneResource = new TimezoneResource();
      timezoneResource.id = '58';
      meetingScheduleResource.timeZone = timezoneResource;
      meetingRequestResource.schedule = meetingScheduleResource;
      const hostInfoRequest = new HostInfoRequest();
      hostInfoRequest.id = ext2.id?.toString();
      meetingRequestResource.host = hostInfoRequest;
      const meetingResponseResource = await rc
        .restapi()
        .account()
        .extension()
        .meeting()
        .post(meetingRequestResource);

      // don't forget to clean up
      await rc
        .restapi()
        .account()
        .extension()
        .meeting(meetingResponseResource.id)
        .delete();

      await rc.revoke();
      await rc2.revoke();
    };
    await testRingCentral(testCase);
    await testRingCentral(testCase, 'wss');
  });
});
