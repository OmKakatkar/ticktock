'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { DashboardNavProps } from './DashboardNav.types'

export function DashboardNav({ userName }: Readonly<DashboardNavProps>) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='bg-white'>
      <div className='mx-auto flex py-4 max-w-7xl items-center justify-between px-4'>
        <div className='flex items-center gap-8'>
          <span className='text-2xl leading-[150%] font-semibold text-gray-900'>
            ticktock
          </span>
          <span className='text-sm font-medium leading-[150%] text-gray-500'>
            Timesheets
          </span>
        </div>

        <div className='relative'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='flex items-center gap-1.5 leading-[150%] font-medium text-gray-700 hover:text-gray-900'>
            <span>{userName}</span>
            <ChevronDownIcon className='h-4 w-4' />
          </button>

          {menuOpen && (
            <div className='absolute right-0 mt-2 w-36 rounded-md border border-gray-200 bg-white shadow-lg'>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
