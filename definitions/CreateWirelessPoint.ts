import AutomaticLocationUpdatesSiteInfo from './AutomaticLocationUpdatesSiteInfo'
import LocationUpdatesEmergencyAddressInfoRequest from './LocationUpdatesEmergencyAddressInfoRequest'

class CreateWirelessPoint
{
    /// <summary>
    /// Unique 48-bit identifier of wireless access point complying with MAC address conventions. The Mask is XX:XX:XX:XX:XX:XX, where X can be a symbol in the range of 0-9 or A-F
    /// Required
    /// </summary>
    bssid: string

    /// <summary>
    /// Wireless access point name
    /// Required
    /// </summary>
    name: string

    /// <summary>
    /// Site data. If multi-site feature is turned on for the account, then internal identifier of a site must be specified. To assign the wireless point to the main site (company) set site ID to `main-site`
    /// </summary>
    site: AutomaticLocationUpdatesSiteInfo

    /// <summary>
    /// Emergency address information. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
    /// Required
    /// </summary>
    emergencyAddress: LocationUpdatesEmergencyAddressInfoRequest

    /// <summary>
    /// Internal identifier of the emergency response location (address). Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
    /// </summary>
    emergencyLocationId: string
}

export default CreateWirelessPoint