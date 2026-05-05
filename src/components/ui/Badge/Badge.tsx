import classNames from 'classnames'
import { TimesheetStatus } from '@/types'
import { BadgeProps } from './Badge.types'

const statusConfig: Record<
  TimesheetStatus,
  { label: string; className: string }
> = {
  completed: {
    label: 'COMPLETED',
    className: 'bg-green-100 text-green-700',
  },
  incomplete: {
    label: 'INCOMPLETE',
    className: 'bg-yellow-100 text-yellow-700',
  },
  missing: {
    label: 'MISSING',
    className: 'bg-red-100 text-red-500',
  },
}

export function Badge({ status, className }: Readonly<BadgeProps>) {
  const config = statusConfig[status]

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        config.className,
        className,
      )}>
      {config.label}
    </span>
  )
}
