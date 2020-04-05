import NoteCreatorInfo from './NoteCreatorInfo'
import LastModifiedByInfo from './LastModifiedByInfo'
import LockedByInfo from './LockedByInfo'

class GetGlipNoteInfo
{
  /**
   * Internal identifier of a note
   */
  id?: string

  /**
   * Title of a note
   */
  title?: string

  /**
   * Internal identifiers of the chat(s) where the note is posted or shared.
   */
  chatIds?: string[]

  /**
   * Preview of a note (first 150 characters of a body)
   */
  preview?: string

  /**
   * Text of a note
   */
  body?: string

  /**
   * Note creator information
   */
  creator?: NoteCreatorInfo

  /**
   * Note last modification information
   */
  lastModifiedBy?: LastModifiedByInfo

  /**
   * Returned for the note being edited (locked) at the current moment. Information on the user editing the note
   */
  lockedBy?: LockedByInfo

  /**
   * Note publishing status. Any note is created in 'Draft' status. After it is posted it becomes 'Active'
   * Enum: Active, Draft
   */
  status?: string

  /**
   * Creation time
   */
  creationTime?: string

  /**
   * Datetime of the note last update
   */
  lastModifiedTime?: string

  /**
   * Enum: Note
   */
  type?: string
}

export default GetGlipNoteInfo