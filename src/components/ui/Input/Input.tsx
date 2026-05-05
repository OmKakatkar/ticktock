import { useId } from 'react'
import classNames from 'classnames'
import { InputProps } from './Input.types'

export function Input({
  label,
  error,
  helpText,
  isRequired,
  containerClassName,
  className,
  ref,
  ...rest
}: InputProps) {
  const id = useId()

  return (
    <div className={classNames('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className='text-sm font-medium text-gray-700'>
          {label}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        className={classNames(
          'w-full rounded-md border px-3 py-2 text-sm text-gray-900',
          'placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-colors',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 hover:border-gray-400',
          className,
        )}
        {...rest}
      />

      {error && <p className='text-xs text-red-500'>{error}</p>}
      {helpText && !error && (
        <p className='text-xs text-gray-500'>{helpText}</p>
      )}
    </div>
  )
}
