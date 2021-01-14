import {LocationUpdatesEmergencyAddressInfo} from './index';

class PrivateIpRangeInfo {
  /**
   */
  id?: string;

  /**
   */
  startIp?: string;

  /**
   */
  endIp?: string;

  /**
   * Network name
   */
  name?: string;

  /**
   */
  emergencyAddress?: LocationUpdatesEmergencyAddressInfo;

  /**
   * Emergency response location (address) internal identifier. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
   */
  emergencyLocationId?: string;

  /**
   */
  matched?: boolean;
}

export default PrivateIpRangeInfo;
