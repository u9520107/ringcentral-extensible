// Batch of A2P SMS messages. This object provides a specification to send message(s) to many recipients. It contains top-level attributes, such as `text`, `expiresIn`, `scheduledAt` which apply to all `messages`. In addition to that, it is possible to override this attribute for each message. This way a single API call may be used to send individual messages to many recipients
class MessageBatchResponse {
  /**
   * Unique identifier of the message batch
   */
  id?: string;

  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are going to be sent
   * Required
   */
  from?: string;

  /**
   * Total number of messages in the accepted batch
   */
  batchSize?: number;

  /**
   * Total number of messages currently processed in the batch
   */
  processedCount?: number;

  /**
   * Time of message batch last processing
   */
  lastUpdatedAt?: string;

  /**
   * Current status of a message batch
   */
  status?: 'Processing' | 'Completed';

  /**
   * Time of message batch creation
   */
  createdAt?: string;
}

export default MessageBatchResponse;
