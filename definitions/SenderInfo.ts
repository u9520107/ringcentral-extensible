class SenderInfo
{
    /// <summary>
    /// Phone number in E.164 (with '+' sign) format
    /// </summary>
    phoneNumber: string

    /// <summary>
    /// Extension number
    /// </summary>
    extensionNumber: string

    /// <summary>
    /// Contains party location (city, state) if one can be determined from phoneNumber. This property is filled only when phoneNumber is not empty and server can calculate location information from it (for example, this information is unavailable for US toll-free numbers)
    /// </summary>
    location: string

    /// <summary>
    /// Symbolic name associated with a caller/callee. If the phone does not belong to the known extension, only the location is returned, the name is not determined then
    /// </summary>
    name: string
}

export default SenderInfo