import { TimesheetEntry } from '@/types'

export type WeekDetailViewProps = {
  weekId: number
}

export type GroupedEntries = Record<string, TimesheetEntry[]>
