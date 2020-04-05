import AudioPromptInfo from './AudioPromptInfo'
import PromptLanguageInfo from './PromptLanguageInfo'

class IVRMenuPromptInfo
{
    /**
     * Prompt mode: custom media or text
     * Enum: Audio, TextToSpeech
     */
    mode?: string

    /**
     * For 'Audio' mode only. Prompt media reference
     */
    audio?: AudioPromptInfo

    /**
     * For 'TextToSpeech' mode only. Prompt text
     */
    text?: string

    /**
     * For 'TextToSpeech' mode only. Prompt language metadata
     */
    language?: PromptLanguageInfo
}

export default IVRMenuPromptInfo