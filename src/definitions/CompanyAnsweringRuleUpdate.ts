import CompanyAnsweringRuleCallersInfoRequest from './CompanyAnsweringRuleCallersInfoRequest'
import CompanyAnsweringRuleCalledNumberInfo from './CompanyAnsweringRuleCalledNumberInfo'
import CompanyAnsweringRuleScheduleInfoRequest from './CompanyAnsweringRuleScheduleInfoRequest'
import GreetingInfo from './GreetingInfo'

class CompanyAnsweringRuleUpdate
{
  /**
   * Specifies if the rule is active or inactive. The default value is 'True'
   * Default: true
   */
  enabled?: boolean

  /**
   * Name of an answering rule specified by user. Max number of symbols is 30. The default value is 'My Rule N' where 'N' is the first free number
   */
  name?: string

  /**
   * Answering rule will be applied when calls are received from the specified caller(s)
   */
  callers?: CompanyAnsweringRuleCallersInfoRequest[]

  /**
   * Answering rule will be applied when calling the specified number(s)
   */
  calledNumbers?: CompanyAnsweringRuleCalledNumberInfo[]

  /**
   * Schedule when an answering rule should be applied
   */
  schedule?: CompanyAnsweringRuleScheduleInfoRequest

  /**
   * Specifies how incoming calls are forwarded. The default value is 'Operator' 'Operator' - play company greeting and forward to operator extension 'Disconnect' - play company greeting and disconnect 'Bypass' - bypass greeting to go to selected extension = ['Operator', 'Disconnect', 'Bypass']
   * Enum: Operator, Disconnect, Bypass
   */
  callHandlingAction?: string

  /**
   * Type of an answering rule
   * Default: Custom
   * Enum: BusinessHours, AfterHours, Custom
   */
  type?: string

  /**
   * Internal identifier of the extension the call is forwarded to. Supported for 'Bypass' mode only (that should be specified in `callHandlingAction` field)
   */
  extension?: string

  /**
   * Greetings applied for an answering rule; only predefined greetings can be applied, see Dictionary Greeting List
   */
  greetings?: GreetingInfo[]
}

export default CompanyAnsweringRuleUpdate