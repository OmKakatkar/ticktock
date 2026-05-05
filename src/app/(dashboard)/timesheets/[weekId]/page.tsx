import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { WeekDetailView } from '@/components/timesheets'

type Props = {
  params: Promise<{ weekId: string }>
}

export default async function WeekDetailPage({ params }: Props) {
  const { weekId: weekIdStr } = await params
  const weekId = parseInt(weekIdStr)

  if (Number.isNaN(weekId)) notFound()

  return (
    <div className='mx-auto max-w-4xl px-6 py-8'>
      <Suspense fallback={<WeekDetailSkeleton />}>
        <WeekDetailView weekId={weekId} />
      </Suspense>
    </div>
  )
}

function WeekDetailSkeleton() {
  return (
    <div className='animate-pulse space-y-4'>
      <div className='h-8 w-48 rounded bg-gray-200' />
      <div className='h-4 w-32 rounded bg-gray-100' />
      <div className='mt-6 space-y-3'>
        {[...new Array(5).keys()].map((_, i) => (
          <div
            key={i} // Keys should be unique and stable, using index is acceptable here since it's a static list
            className='h-12 rounded-md bg-gray-100'
          />
        ))}
      </div>
    </div>
  )
}
