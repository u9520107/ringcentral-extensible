import {
  ExtensionInfoCallLog,
  CallLogCallerInfo,
  DelegateInfo,
  CallLogRecordingInfo,
  CallLogRecordLegInfo,
  BillingInfo,
} from '.';

class CompanyCallLogRecord {
  /**
   * Internal identifier of a cal log record
   */
  id?: string;

  /**
   * Canonical URI of a call log record
   */
  uri?: string;

  /**
   * Internal identifier of a call session
   */
  sessionId?: string;

  /**
   */
  extension?: ExtensionInfoCallLog;

  /**
   * Telephony identifier of a call session
   */
  telephonySessionId?: string;

  /**
   * Call transport
   */
  transport?: 'PSTN' | 'VoIP';

  /**
   * Caller information
   */
  from?: CallLogCallerInfo;

  /**
   * Callee information
   */
  to?: CallLogCallerInfo;

  /**
   * Call type
   */
  type?: 'Voice' | 'Fax';

  /**
   * Call direction
   */
  direction?: 'Inbound' | 'Outbound';

  /**
   * Information on a delegate extension that actually implemented a call action. For Secretary call log the field is returned if the current extension implemented a call. For Boss call log the field contains information on a Secretary extension which actually implemented a call on behalf of the current extension
   */
  delegate?: DelegateInfo;

  /**
   * Indicates whether the record is deleted. Returned for deleted records, for ISync requests
   */
  deleted?: boolean;

  /**
   * Action description of the call operation
   */
  action?:
    | 'Unknown'
    | 'Phone Login'
    | 'Calling Card'
    | 'VoIP Call'
    | 'Phone Call'
    | 'Paging'
    | 'Hunting'
    | 'Call Park'
    | 'Monitoring'
    | 'Text Relay'
    | 'External Application'
    | 'Park Location'
    | 'CallOut-CallMe'
    | 'Conference Call'
    | 'Move'
    | 'RC Meetings'
    | 'Accept Call'
    | 'FindMe'
    | 'FollowMe'
    | 'RingMe'
    | 'Transfer'
    | 'Call Return'
    | 'Ring Directly'
    | 'RingOut Web'
    | 'RingOut PC'
    | 'RingOut Mobile'
    | 'Emergency'
    | 'E911 Update'
    | 'Support'
    | 'Incoming Fax'
    | 'Outgoing Fax';

  /**
   * Status description of the call operation
   */
  result?:
    | 'Unknown'
    | 'Accepted'
    | 'Call connected'
    | 'In Progress'
    | 'Voicemail'
    | 'Reply'
    | 'Missed'
    | 'Busy'
    | 'Rejected'
    | 'No Answer'
    | 'Hang Up'
    | 'Blocked'
    | 'Suspended account'
    | 'Call Failed'
    | 'Call Failure'
    | 'Internal Error'
    | 'IP Phone Offline'
    | 'No Calling Credit'
    | 'Restricted Number'
    | 'Wrong Number'
    | 'Answered Not Accepted'
    | 'Stopped'
    | 'International Disabled'
    | 'International Restricted'
    | 'Abandoned'
    | 'Declined'
    | 'Received'
    | 'Fax on Demand'
    | 'Partial Receive'
    | 'Receive Error'
    | 'Fax Receipt Error'
    | 'Sent'
    | 'Fax Partially Sent'
    | 'Send Error'
    | 'Fax Not Sent'
    | 'Fax Poor Line';

  /**
   */
  reason?:
    | 'Accepted'
    | 'Connected'
    | 'line Busy'
    | 'Not Answered'
    | 'No Answer'
    | 'Hang Up'
    | 'Stopped'
    | 'Internal Error'
    | 'No Credit'
    | 'Restricted Number'
    | 'Wrong Number'
    | 'International Disabled'
    | 'International Restricted'
    | 'Bad Number'
    | 'Info 411 Restricted'
    | 'Customer 611 Restricted'
    | 'No Digital Line'
    | 'Failed Try Again'
    | 'Max Call Limit'
    | 'Too Many Calls'
    | 'Calls Not Accepted'
    | 'Number Not Allowed'
    | 'Number Blocked'
    | 'Number Disabled'
    | 'Resource Error'
    | 'Call Loop'
    | 'Fax Not Received'
    | 'Fax Partially Sent'
    | 'Fax Not Sent'
    | 'Fax Poor Line'
    | 'Fax Prepare Error'
    | 'Fax Save Error'
    | 'Fax Send Error';

  /**
   */
  reasonDescription?: string;

  /**
   * The call start datetime in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z
   */
  startTime?: string;

  /**
   * Call duration in seconds
   */
  duration?: number;

  /**
   * Call recording data. Returned if a call is recorded
   */
  recording?: CallLogRecordingInfo;

  /**
   * Indicates that the recording is too short and therefore wouldn't be returned. The flag is not returned if the value is false
   */
  shortRecording?: boolean;

  /**
   * For 'Detailed' view only. Leg description
   */
  legs?: CallLogRecordLegInfo[];

  /**
   * Billing information related to the call. Returned for 'Detailed' view only
   */
  billing?: BillingInfo;

  /**
   * For 'Detailed' view only. The datetime when the call log record was modified in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z
   */
  lastModifiedTime?: string;
}

export default CompanyCallLogRecord;
