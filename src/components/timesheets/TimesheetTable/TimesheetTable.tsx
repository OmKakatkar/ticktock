'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonVariant, ButtonSize } from '@/components/ui/Button'
import {
  Typography,
  TypographyTag,
  TypographyVariant,
} from '@/components/ui/Typography'
import { WeeklyTimesheet, TimesheetStatus } from '@/types'

export function TimesheetTable() {
  const router = useRouter()
  const [timesheets, setTimesheets] = useState<WeeklyTimesheet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTimesheets() {
      try {
        const res = await fetch('/api/timesheets')
        if (!res.ok) throw new Error('Failed to fetch timesheets')
        const data = await res.json()
        setTimesheets(data)
      } catch (err) {
        setError('Failed to load timesheets. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTimesheets()
  }, [])

  const getActionLabel = (status: TimesheetStatus) => {
    switch (status) {
      case 'completed':
        return 'View'
      case 'incomplete':
        return 'Update'
      case 'missing':
        return 'Create'
      default:
        return 'View'
    }
  }

  const getActionVariant = (status: TimesheetStatus) => {
    switch (status) {
      case 'completed':

      case 'incomplete':

      case 'missing':

      default:
        return ButtonVariant.Ghost
    }
  }

  if (loading) {
    return (
      <div className='animate-pulse space-y-3'>
        {[...new Array(5).keys()].map((_, i) => (
          <div
            key={i} // Keys should be unique and stable, using index is acceptable here since it's a static list
            className='h-12 rounded-md bg-gray-100'
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className='rounded-md bg-red-50 p-4 text-sm text-red-600'>
        {error}
      </div>
    )
  }

  return (
    <div>
      {/* Filters row */}
      <div className='mb-4 flex gap-3'>
        <select className='rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Date Range</option>
        </select>
        <select className='rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Status</option>
        </select>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='pb-3 text-left'>
                <button className='flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-700'>
                  Week #
                  <ChevronUpDownIcon className='h-3.5 w-3.5' />
                </button>
              </th>
              <th className='pb-3 text-left'>
                <button className='flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-700'>
                  Date
                  <ChevronUpDownIcon className='h-3.5 w-3.5' />
                </button>
              </th>
              <th className='pb-3 text-left'>
                <button className='flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-700'>
                  Status
                  <ChevronUpDownIcon className='h-3.5 w-3.5' />
                </button>
              </th>
              <th className='pb-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {timesheets.map((timesheet) => (
              <tr
                key={timesheet.id}
                className='group hover:bg-gray-50 transition-colors'>
                <td className='py-4'>
                  <Typography
                    tag={TypographyTag.span}
                    variant={TypographyVariant.Body_MD}
                    className='text-gray-900'>
                    {timesheet.week}
                  </Typography>
                </td>
                <td className='py-4'>
                  <Typography
                    tag={TypographyTag.span}
                    variant={TypographyVariant.Body_MD}
                    className='text-gray-600'>
                    {timesheet.dateRange}
                  </Typography>
                </td>
                <td className='py-4'>
                  <Badge status={timesheet.status} />
                </td>
                <td className='py-4 text-right'>
                  <Button
                    variant={getActionVariant(timesheet.status)}
                    size={ButtonSize.SM}
                    onClick={() => router.push(`/timesheets/${timesheet.id}`)}>
                    {getActionLabel(timesheet.status)}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer row */}
      <div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4'>
        <select className='rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>5 per page</option>
          <option>10 per page</option>
          <option>20 per page</option>
        </select>

        <div className='flex items-center gap-1'>
          <button className='rounded px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100'>
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`rounded px-3 py-1.5 text-sm ${
                page === 3
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}>
              {page}
            </button>
          ))}
          <button className='rounded px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
