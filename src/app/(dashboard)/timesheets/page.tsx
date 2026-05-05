import { Suspense } from 'react'
import { TimesheetTable } from '@/components/timesheets'
import {
  Typography,
  TypographyTag,
  TypographyVariant,
  TypographyWeight,
} from '@/components/ui/Typography'

export default function TimesheetsPage() {
  return (
    <div className='mx-auto max-w-7xl px-6 py-8'>
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <Typography
          tag={TypographyTag.h1}
          variant={TypographyVariant.Display_XS}
          weight={TypographyWeight.SemiBold}
          className='mb-6 text-gray-900'>
          Your Timesheets
        </Typography>
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
