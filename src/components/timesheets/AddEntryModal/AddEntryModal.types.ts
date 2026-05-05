import { TimesheetEntry } from '@/types'

export type AddEntryModalProps = {
  weekId: number
  date: string
  onClose: () => void
  onSuccess: (entry: TimesheetEntry) => void
}
