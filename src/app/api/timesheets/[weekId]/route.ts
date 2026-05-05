import { NextResponse } from 'next/server'
import { mockTimesheets } from '@/lib/mockData'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ weekId: string }> },
) {
  const { weekId } = await params
  const timesheet = mockTimesheets.find((t) => t.id === Number.parseInt(weekId))

  if (!timesheet) {
    return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 })
  }

  return NextResponse.json(timesheet)
}
