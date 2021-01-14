import {CompanyCallLogRecord, CompanyCallLogSyncInfo} from './index';

class AccountCallLogSyncResponse {
  /**
   * Link to account call log sync resource
   */
  uri?: string;

  /**
   * List of call log records with synchronization information. For 'ISync' the total number of returned records is limited to 250; this includes both new records and the old ones, specified by the recordCount parameter
   */
  records?: CompanyCallLogRecord[];

  /**
   */
  syncInfo?: CompanyCallLogSyncInfo;
}

export default AccountCallLogSyncResponse;
