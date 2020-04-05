class MessageStoreConfiguration
{
    /// <summary>
    /// Retention policy setting, specifying how long to keep messages; the supported value range is 7-90 days
    /// Maximum: 90
    /// Minimum: 7
    /// </summary>
    retentionPeriod: number
}

export default MessageStoreConfiguration