import { useId } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { SelectProps } from './Select.types'

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  isRequired,
  containerClassName,
  disabled,
}: Readonly<SelectProps>) {
  const id = useId()
  const selectedOption = options.find((o) => o.value === value)

  return (
    <div className={classNames('flex flex-col gap-2', containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className='text-sm font-medium text-gray-700'>
          {label}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      <Listbox
        value={value}
        onChange={onChange}
        disabled={disabled}>
        {({ open }) => {
          const defaultStyles = open
            ? 'border-blue-500'
            : 'border-gray-300 hover:border-gray-400'
          const borderStyles = error ? 'border-red-500' : defaultStyles

          return (
            <div className='relative'>
              <ListboxButton
                className={classNames(
                  'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  'disabled:bg-gray-50 disabled:cursor-not-allowed',
                  'transition-colors bg-white',
                  borderStyles,
                )}>
                <span
                  className={classNames(
                    selectedOption ? 'text-gray-900' : 'text-gray-400',
                  )}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                {open ? (
                  <ChevronUpIcon className='h-4 w-4 text-gray-400' />
                ) : (
                  <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                )}
              </ListboxButton>

              <ListboxOptions
                className={classNames(
                  'absolute z-10 mt-1 w-full rounded-md border border-gray-200',
                  'bg-white shadow-lg focus:outline-none',
                  'max-h-60 overflow-auto',
                )}>
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    className={({ focus, selected }) =>
                      classNames(
                        'cursor-pointer px-3 py-2 text-sm',
                        focus && 'bg-blue-50',
                        selected && 'font-medium text-blue-600',
                      )
                    }>
                    {option.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          )
        }}
      </Listbox>

      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  )
}
