export type TimesheetStatus = 'completed' | 'incomplete' | 'missing'

export interface WeeklyTimesheet {
  id: number
  week: number
  dateRange: string
  startDate: string
  endDate: string
  status: TimesheetStatus
  totalHours: number
}

export interface TimesheetEntry {
  id: number
  weekId: number
  date: string
  displayDate: string
  taskName: string
  project: string
  hours: number
  type: string
}

export interface User {
  email: string
  password: string
  name: string
}
