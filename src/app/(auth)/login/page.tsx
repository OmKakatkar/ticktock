'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
      return
    }

    router.push('/timesheets')
  }

  return (
    <div className='flex min-h-screen'>
      {/* Left side — form */}
      <div className='flex w-full flex-col justify-center px-12 bg-white md:w-1/2 lg:px-24'>
        <div className='mx-auto w-full max-w-sm'>
          <h1 className='mb-8 text-2xl font-semibold text-gray-900'>
            Welcome back
          </h1>

          <form
            onSubmit={handleSubmit}
            className='space-y-5'>
            <div>
              <label
                htmlFor='email'
                className='mb-1.5 block text-sm font-medium text-gray-700'>
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-1.5 block text-sm font-medium text-gray-700'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                id='remember'
                type='checkbox'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-blue-600'
              />
              <label
                htmlFor='remember'
                className='text-sm text-gray-600'>
                Remember me
              </label>
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <Button
              type='submit'
              disabled={loading}
              className='w-full rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60'>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side — branding */}
      <div className='hidden flex-col justify-end bg-blue-600 p-12 md:flex md:w-1/2'>
        <div>
          <h2 className='mb-4 text-4xl font-semibold text-white'>ticktock</h2>
          <p className='max-w-sm text-sm leading-relaxed text-blue-100'>
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  )
}
