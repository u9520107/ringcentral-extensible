import ActiveCallInfoWithoutSIP from './ActiveCallInfoWithoutSIP'

class DetailedExtensionPresenceEventBody
{
    /// <summary>
    /// Internal identifier of an extension
    /// Default: ~
    /// </summary>
    extensionId: string

    /// <summary>
    /// Telephony presence status. Returned if telephony status is changed.
    /// Enum: NoCall, CallConnected, Ringing, OnHold, ParkedCall
    /// </summary>
    telephonyStatus: string

    /// <summary>
    /// List of the latest 7 active calls on extension
    /// </summary>
    activeCalls: ActiveCallInfoWithoutSIP[]

    /// <summary>
    /// Order number of a notification to state the chronology
    /// </summary>
    sequence: number

    /// <summary>
    /// Aggregated presence status, calculated from a number of sources
    /// Enum: Offline, Busy, Available
    /// </summary>
    presenceStatus: string

    /// <summary>
    /// User-defined presence status (as previously published by the user)
    /// Enum: Offline, Busy, Available
    /// </summary>
    userStatus: string

    /// <summary>
    /// Meetings presence status
    /// Enum: Connected, Disconnected
    /// </summary>
    meetingStatus: string

    /// <summary>
    /// Extended DnD (Do not Disturb) status
    /// Enum: TakeAllCalls, DoNotAcceptAnyCalls, DoNotAcceptDepartmentCalls, TakeDepartmentCallsOnly
    /// </summary>
    dndStatus: string

    /// <summary>
    /// If 'True' enables other extensions to see the extension presence status
    /// </summary>
    allowSeeMyPresence: boolean

    /// <summary>
    /// If 'True' enables to ring extension phone, if any user monitored by this extension is ringing
    /// </summary>
    ringOnMonitoredCall: boolean

    /// <summary>
    /// If 'True' enables the extension user to pick up a monitored line on hold
    /// </summary>
    pickUpCallsOnHold: boolean

    /// <summary>
    /// Total number of active calls on extension at the present moment
    /// </summary>
    totalActiveCalls: number

    /// <summary>
    /// Internal identifier of a subscription owner extension
    /// </summary>
    ownerId: string
}

export default DetailedExtensionPresenceEventBody