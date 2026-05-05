import { NextResponse } from 'next/server'
import { mockEntries } from '@/lib/mockData'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ weekId: string }> },
) {
  const { weekId } = await params
  const entries = mockEntries.filter((e) => e.weekId === parseInt(weekId))
  return NextResponse.json(entries)
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ weekId: string }> },
) {
  const { weekId } = await params
  const body = await req.json()

  const newEntry = {
    id: Date.now(),
    weekId: parseInt(weekId),
    date: body.date,
    displayDate: body.displayDate,
    taskName: body.taskName,
    project: body.project,
    hours: body.hours,
    type: body.type,
  }

  mockEntries.push(newEntry)
  return NextResponse.json(newEntry, { status: 201 })
}
