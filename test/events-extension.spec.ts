import EventsExtension, {Events} from '@rc-ex/events';
import Utils from '@rc-ex/core/lib/Utils';

import {createRingCentral} from './utils';

describe('Event Emitter Extension', () => {
  test('default', async () => {
    const rc = await createRingCentral();
    const eventsExtension = new EventsExtension();
    await rc.installExtension(eventsExtension);
    eventsExtension.eventEmitter.on(Events.requestSuccess, r => {
      console.log(Utils.formatTraffic(r));
    });
    eventsExtension.enabled = false; // remove this line to enable events
    await rc.restapi().account().extension().get();
    await rc.revoke();
  });
});
