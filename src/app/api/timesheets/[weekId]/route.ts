import { NextResponse } from 'next/server'
import { mockTimesheets } from '@/lib/mockData'

export async function GET(
  _req: Request,
  { params }: { params: { weekId: string } },
) {
  const timesheet = mockTimesheets.find(
    (t) => t.id === Number.parseInt(params.weekId),
  )

  if (!timesheet) {
    return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 })
  }

  return NextResponse.json(timesheet)
}
