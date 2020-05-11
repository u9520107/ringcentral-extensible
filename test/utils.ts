import RingCentral from '../src/index';

export const createRingCentral = async (
  transport: 'https' | 'wss' = 'https'
): Promise<RingCentral> => {
  if (transport === 'https') {
    const rc = new RingCentral({
      clientId: process.env.RINGCENTRAL_CLIENT_ID!,
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
      server: process.env.RINGCENTRAL_SERVER_URL!,
    });
    await rc.login({
      username: process.env.RINGCENTRAL_USERNAME!,
      extension: process.env.RINGCENTRAL_EXTENSION!,
      password: process.env.RINGCENTRAL_PASSWORD!,
    });
    return rc;
  } else {
    // transport === 'wss'
    const rc = new RingCentral(
      {
        clientId: process.env.RINGCENTRAL_CLIENT_ID!,
        clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
        server: process.env.RINGCENTRAL_SERVER_URL!,
      },
      {
        server: process.env.RINGCENTRAL_WSG_SERVER_URL!,
      }
    );
    await rc.login({
      username: process.env.RINGCENTRAL_USERNAME!,
      extension: process.env.RINGCENTRAL_EXTENSION!,
      password: process.env.RINGCENTRAL_PASSWORD!,
    });
    rc.defaults.transport = 'wss';
    return rc;
  }
};

export const testRingCentral = async (
  transport: 'https' | 'wss',
  testCase: (rc: RingCentral) => Promise<void>
) => {
  const rc = await createRingCentral(transport);
  await testCase(rc);
};
