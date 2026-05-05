import Link from 'next/link'
import classNames from 'classnames'
import {
  ButtonAsButton,
  ButtonAsLink,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './Button.types'

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case ButtonVariant.Primary:
      return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300'
    case ButtonVariant.Secondary:
      return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300'
    case ButtonVariant.Ghost:
      return 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    case ButtonVariant.Danger:
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
}

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.SM:
      return 'px-3 py-1.5 text-sm'
    case ButtonSize.MD:
      return 'px-4 py-2 text-sm'
    case ButtonSize.LG:
      return 'px-6 py-3 text-base'
  }
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:cursor-not-allowed'

export function Button({
  variant = ButtonVariant.Primary,
  size = ButtonSize.MD,
  loading = false,
  isFullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = classNames(
    baseClasses,
    getVariantClasses(variant),
    getSizeClasses(size),
    isFullWidth && 'w-full',
    className,
  )

  const content = loading ? (
    <span className='flex items-center gap-2'>
      <svg
        className='h-4 w-4 animate-spin'
        viewBox='0 0 24 24'
        fill='none'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8v8z'
        />
      </svg>
      {children}
    </span>
  ) : (
    children
  )

  if ('href' in rest && rest.href) {
    const { href, isExternal, ...linkRest } = rest as ButtonAsLink
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target='_blank'
          rel='noopener noreferrer'
          {...linkRest}>
          {content}
        </a>
      )
    }
    return (
      <Link
        href={href}
        className={classes}
        {...linkRest}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      disabled={loading || (rest as ButtonAsButton).disabled}
      {...(rest as ButtonAsButton)}>
      {content}
    </button>
  )
}
