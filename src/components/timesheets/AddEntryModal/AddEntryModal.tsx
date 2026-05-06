'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Select } from '@/components/ui/Select'
import { Button, ButtonVariant } from '@/components/ui/Button'
import { mockProjects, mockWorkTypes } from '@/lib/mockData'

import { AddEntryModalProps, FormErrors } from './AddEntryModal.types'

export function AddEntryModal({
  weekId,
  date,
  onClose,
  onSuccess,
}: Readonly<AddEntryModalProps>) {
  const [project, setProject] = useState('')
  const [type, setType] = useState('')
  const [taskName, setTaskName] = useState('')
  const [hours, setHours] = useState(1)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const projectOptions = mockProjects.map((p) => ({ value: p, label: p }))
  const typeOptions = mockWorkTypes.map((t) => ({ value: t, label: t }))

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!project) newErrors.project = 'Please select a project'
    if (!type) newErrors.type = 'Please select a type of work'
    if (!taskName.trim()) newErrors.taskName = 'Task description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setSubmitError('')

    try {
      const res = await fetch(`/api/timesheets/${weekId}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          displayDate: date,
          taskName: taskName.trim(),
          project,
          hours,
          type,
        }),
      })

      if (!res.ok) throw new Error('Failed to add entry')

      const newEntry = await res.json()
      onSuccess(newEntry)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}>
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
        {/* Header */}
        <div className='mb-5 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Add New Entry</h2>
          <button
            onClick={onClose}
            className='rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
            <XMarkIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Form */}
        <div className='space-y-4'>
          <Select
            label='Select Project'
            isRequired
            options={projectOptions}
            value={project}
            onChange={setProject}
            placeholder='Project Name'
            error={errors.project}
          />

          <Select
            label='Type of Work'
            isRequired
            options={typeOptions}
            value={type}
            onChange={setType}
            placeholder='Bug fixes'
            error={errors.type}
          />

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700'>
              Task description
              <span className='ml-1 text-red-500'>*</span>
            </label>
            <textarea
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder='Write text here ...'
              rows={4}
              className={`w-full resize-none rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.taskName
                  ? 'border-red-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.taskName && (
              <p className='text-xs text-red-500'>{errors.taskName}</p>
            )}
            <p className='text-xs text-gray-400'>A note for extra info</p>
          </div>

          {/* Hours stepper */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700'>
              Hours
              <span className='ml-1 text-red-500'>*</span>
            </label>
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setHours((h) => Math.max(1, h - 1))}
                disabled={hours <= 1}
                className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40'>
                −
              </button>
              <span className='w-8 text-center text-sm font-medium text-gray-900'>
                {hours}
              </span>
              <button
                onClick={() => setHours((h) => Math.min(24, h + 1))}
                disabled={hours >= 24}
                className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40'>
                +
              </button>
            </div>
          </div>

          {submitError && <p className='text-sm text-red-500'>{submitError}</p>}
        </div>

        {/* Footer */}
        <div className='mt-6 flex items-center gap-4'>
          <Button
            variant={ButtonVariant.Primary}
            onClick={handleSubmit}
            loading={loading}
            className='flex-1'>
            Add entry
          </Button>
          <button
            onClick={onClose}
            className='text-sm text-gray-500 hover:text-gray-700'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
