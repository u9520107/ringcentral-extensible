class MessageAttachmentInfoIntId
{
  /**
   * Internal identifier of a message attachment
   */
  id?: number

  /**
   * Canonical URI of a message attachment
   */
  uri?: string

  /**
   * Type of message attachment
   * Enum: AudioRecording, AudioTranscription, Text, SourceDocument, RenderedDocument, MmsAttachment
   */
  type?: string

  /**
   * MIME type for a given attachment, for instance 'audio/wav'
   */
  contentType?: string

  /**
   * Voicemail only Duration of the voicemail in seconds
   */
  vmDuration?: number

  /**
   * Name of a file attached
   */
  filename?: string

  /**
   * Size of attachment in bytes
   */
  size?: number
}

export default MessageAttachmentInfoIntId