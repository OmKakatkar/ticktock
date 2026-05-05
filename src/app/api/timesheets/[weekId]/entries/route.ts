import { NextResponse } from 'next/server'
import { mockEntries } from '@/lib/mockData'

export async function GET(
  _req: Request,
  { params }: { params: { weekId: string } },
) {
  const entries = mockEntries.filter(
    (e) => e.weekId === Number.parseInt(params.weekId),
  )

  return NextResponse.json(entries)
}

export async function POST(
  req: Request,
  { params }: { params: { weekId: string } },
) {
  const body = await req.json()

  const newEntry = {
    id: Date.now(),
    weekId: Number.parseInt(params.weekId),
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
