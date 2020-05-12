/* eslint-env jest */
import fs from 'fs';
import path from 'path';

import {testRingCentral} from './utils';
import RingCentral from '../src';

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
          dateFrom: '2015-04-15T17:18:00.000Z',
        });
      const buffer = await rc.get(
        faxMessages.records?.[0].attachments?.[0].uri!,
        undefined,
        {responseType: 'arraybuffer'}
      );
      fs.writeFileSync(path.join(__dirname, 'temp.pdf'), buffer);
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
          dateFrom: '2015-04-15T17:18:00.000Z',
        });
      expect(
        faxMessages.records?.[0].attachments?.[0].uri!.startsWith('https://') // absolute CDN uri
      ).toBeTruthy();
      await rc.revoke();
    };
    await testRingCentral(testCase);
    await testRingCentral(testCase, 'wss');
  });
});
