'use client'

import { AddEntryModalProps } from './AddEntryModal.types'

export function AddEntryModal({ onClose }: Readonly<AddEntryModalProps>) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='rounded-xl bg-white p-6 shadow-xl w-full max-w-md'>
        <p className='text-sm text-gray-600'>Modal coming soon</p>
        <button
          onClick={onClose}
          className='mt-4 text-sm text-blue-600'>
          Close
        </button>
      </div>
    </div>
  )
}
