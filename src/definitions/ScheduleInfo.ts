import WeeklyScheduleInfo from './WeeklyScheduleInfo'
import RangesInfo from './RangesInfo'

class ScheduleInfo
{
  /**
   * Weekly schedule
   */
  weeklyRanges?: WeeklyScheduleInfo

  /**
   * Specific data ranges
   */
  ranges?: RangesInfo[]

  /**
   * The user's schedule specified for business hours or after hours; it can also be set/retrieved calling the corresponding method
   * Enum: BusinessHours, AfterHours
   */
  ref?: string
}

export default ScheduleInfo