import { Suspense } from 'react'
import { TimesheetTable } from '@/components/timesheets'

export default function TimesheetsPage() {
  return (
    <div className='mx-auto max-w-7xl px-6 py-8'>
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h1 className='mb-6 text-2xl font-semibold text-gray-900'>
          Your Timesheets
        </h1>

        <Suspense fallback={<TimesheetTableSkeleton />}>
          <TimesheetTable />
        </Suspense>
      </div>
    </div>
  )
}

function TimesheetTableSkeleton() {
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
