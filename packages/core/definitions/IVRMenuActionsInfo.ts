import {IVRMenuExtensionInfo} from './index';

class IVRMenuActionsInfo {
  /**
   * Key. The following values are supported: numeric: '1' to '9' Star Hash NoInput
   */
  input?: string;

  /**
   * Internal identifier of an answering rule
   */
  action?:
    | 'Connect'
    | 'Voicemail'
    | 'DialByName'
    | 'Transfer'
    | 'Repeat'
    | 'ReturnToRoot'
    | 'ReturnToPrevious'
    | 'Disconnect';

  /**
   */
  extension?: IVRMenuExtensionInfo;

  /**
   * For 'Transfer' action only. PSTN number in E.164 format
   */
  phoneNumber?: string;
}

export default IVRMenuActionsInfo;
