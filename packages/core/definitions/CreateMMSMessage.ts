import {
  MessageStoreCallerInfoRequest,
  MessageCountryInfo,
  Attachment,
} from './index';

class CreateMMSMessage {
  /**
   * Message sender information. The `phoneNumber` value should be one the account phone numbers allowed to send media messages
   * Required
   */
  from?: MessageStoreCallerInfoRequest;

  /**
   * Message receiver(s) information. The `phoneNumber` value is required
   * Required
   */
  to?: MessageStoreCallerInfoRequest[];

  /**
   * Text of a message. Max length is 1000 symbols (2-byte UTF-16 encoded). If a character is encoded in 4 bytes in UTF-16 it is treated as 2 characters, thus restricting the maximum message length to 500 symbols
   */
  text?: string;

  /**
   */
  country?: MessageCountryInfo;

  /**
   * Files to send
   * Required
   */
  attachments?: Attachment[];
}

export default CreateMMSMessage;
