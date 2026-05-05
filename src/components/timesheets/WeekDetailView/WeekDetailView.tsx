'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
  Typography,
  TypographyTag,
  TypographyVariant,
  TypographyWeight,
} from '@/components/ui/Typography'
import { Button, ButtonVariant, ButtonSize } from '@/components/ui/Button'
import { AddEntryModal } from '@/components/timesheets'
import { WeeklyTimesheet, TimesheetEntry } from '@/types'
import { GroupedEntries, WeekDetailViewProps } from './WeekDetailView.types'

export function WeekDetailView({ weekId }: Readonly<WeekDetailViewProps>) {
  const router = useRouter()
  const [timesheet, setTimesheet] = useState<WeeklyTimesheet | null>(null)
  const [entries, setEntries] = useState<TimesheetEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [timesheetRes, entriesRes] = await Promise.all([
          fetch(`/api/timesheets/${weekId}`),
          fetch(`/api/timesheets/${weekId}/entries`),
        ])

        if (!timesheetRes.ok) throw new Error('Timesheet not found')

        const timesheetData = await timesheetRes.json()
        const entriesData = await entriesRes.json()

        setTimesheet(timesheetData)
        setEntries(entriesData)
      } catch (err) {
        setError('Failed to load timesheet.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [weekId])

  const groupedEntries: GroupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.displayDate]) acc[entry.displayDate] = []
    acc[entry.displayDate].push(entry)
    return acc
  }, {} as GroupedEntries)

  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0)
  const targetHours = 40
  const progressPercent = Math.min((totalHours / targetHours) * 100, 100)

  const isReadOnly = timesheet?.status === 'completed'

  function handleAddEntry(date: string) {
    setSelectedDate(date)
    setModalOpen(true)
  }

  function handleEntryAdded(newEntry: TimesheetEntry) {
    setEntries((prev) => [...prev, newEntry])
    setModalOpen(false)
  }

  if (loading) {
    return (
      <div className='animate-pulse space-y-4'>
        <div className='h-8 w-48 rounded bg-gray-200' />
        <div className='h-4 w-32 rounded bg-gray-100' />
      </div>
    )
  }

  if (error || !timesheet) {
    return (
      <div className='rounded-md bg-red-50 p-4 text-sm text-red-600'>
        {error || 'Timesheet not found.'}
      </div>
    )
  }

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      {/* Header */}
      <div className='mb-1 flex items-start justify-between'>
        <Typography
          tag={TypographyTag.h1}
          variant={TypographyVariant.Display_XS}
          weight={TypographyWeight.SemiBold}
          className='text-gray-900'>
          This week&apos;s timesheet
        </Typography>
        <Typography
          tag={TypographyTag.span}
          variant={TypographyVariant.Body_SM}
          className='text-gray-500'>
          {totalHours}/{targetHours} hrs
        </Typography>
      </div>

      <Typography
        tag={TypographyTag.p}
        variant={TypographyVariant.Body_SM}
        className='mb-4 text-gray-400'>
        {timesheet.dateRange}
      </Typography>

      {/* Progress bar */}
      <div className='mb-6 flex items-center gap-3'>
        <div className='h-2 flex-1 overflow-hidden rounded-full bg-gray-100'>
          <div
            className='h-full rounded-full bg-orange-400 transition-all'
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <Typography
          tag={TypographyTag.span}
          variant={TypographyVariant.Body_XS}
          className='text-gray-400'>
          {Math.round(progressPercent)}%
        </Typography>
      </div>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className='mb-6 text-sm text-blue-600 hover:underline'>
        ← Back to timesheets
      </button>

      {/* Day groups */}
      <div className='space-y-6'>
        {Object.entries(groupedEntries).map(([date, dayEntries]) => (
          <div key={date}>
            <Typography
              tag={TypographyTag.h2}
              variant={TypographyVariant.Body_MD}
              weight={TypographyWeight.SemiBold}
              className='mb-2 text-gray-900'>
              {date}
            </Typography>

            <div className='overflow-hidden rounded-lg border border-gray-200'>
              {dayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className='flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50'>
                  <Typography
                    tag={TypographyTag.span}
                    variant={TypographyVariant.Body_MD}
                    className='flex-1 text-gray-900'>
                    {entry.taskName}
                  </Typography>

                  <div className='flex items-center gap-3'>
                    <Typography
                      tag={TypographyTag.span}
                      variant={TypographyVariant.Body_SM}
                      className='text-gray-500'>
                      {entry.hours} hrs
                    </Typography>

                    <span className='rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600'>
                      {entry.project}
                    </span>

                    {!isReadOnly && (
                      <div className='relative'>
                        <button
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === entry.id ? null : entry.id,
                            )
                          }
                          className='rounded p-1 hover:bg-gray-100'>
                          <EllipsisHorizontalIcon className='h-4 w-4 text-gray-400' />
                        </button>

                        {activeMenu === entry.id && (
                          <div className='absolute right-0 z-10 mt-1 w-28 rounded-md border border-gray-200 bg-white shadow-lg'>
                            <button className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                              Edit
                            </button>
                            <button className='w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50'>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add new task row */}
              {!isReadOnly && (
                <button
                  onClick={() => handleAddEntry(date)}
                  className='flex w-full items-center justify-center gap-2 border-t border-dashed border-gray-200 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50'>
                  <PlusIcon className='h-4 w-4' />
                  Add new task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <AddEntryModal
          weekId={weekId}
          date={selectedDate}
          onClose={() => setModalOpen(false)}
          onSuccess={handleEntryAdded}
        />
      )}
    </div>
  )
}
