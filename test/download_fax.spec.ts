/* eslint-env jest */
import fs from 'fs';
import path from 'path';

import {testRingCentral} from './utils';
import RingCentral from '../packages/core';

jest.setTimeout(64000);

describe('fax', () => {
  test('download fax', async () => {
    const testCase = async (rc: RingCentral) => {
      const faxMessages = await rc
        .restapi()
        .account()
        .extension()
        .messageStore()
        .list({
          messageType: ['Fax'],
          direction: ['Inbound'],
          dateFrom: '2010-04-15T17:18:00.000Z',
        });
      if (faxMessages.records?.length === 0) {
        await rc.revoke();
        return;
      }
      const r = await rc.get<Buffer>(
        faxMessages.records?.[0].attachments?.[0].uri!,
        undefined,
        {responseType: 'arraybuffer'}
      );
      fs.writeFileSync(path.join(__dirname, 'temp.pdf'), r.data);
      await rc.revoke();
    };
    await testRingCentral(testCase);
    // await testRingCentral(testCase, 'wss'); // This does not work because WSG cannot do binary download
  });

  test('CDN URI', async () => {
    const testCase = async (rc: RingCentral) => {
      const faxMessages = await rc
        .restapi()
        .account()
        .extension()
        .messageStore()
        .list({
          messageType: ['Fax'],
          direction: ['Inbound'],
          dateFrom: '2010-04-15T17:18:00.000Z',
        });
      if (faxMessages.records?.length === 0) {
        await rc.revoke();
        return;
      }
      expect(
        faxMessages.records?.[0].attachments?.[0].uri!.startsWith('https://') // absolute CDN uri
      ).toBeTruthy();
      await rc.revoke();
    };
    await testRingCentral(testCase);
    // await testRingCentral(testCase, 'wss'); // todo: https://jira.ringcentral.com/browse/PLA-49506
  });
});
