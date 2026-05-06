'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, ButtonSize, ButtonVariant, Input } from '@/components/ui'

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
      <div className='flex w-full flex-col justify-center px-18 bg-white md:w-1/2'>
        <div className='mx-auto w-full'>
          <h1 className='mb-5 text-xl leading-[125%] tracking-normal font-bold text-gray-900'>
            Welcome back
          </h1>

          <form
            onSubmit={handleSubmit}
            className='space-y-5'>
            <div>
              <Input
                label='Email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                isRequired
              />
            </div>

            <div>
              <Input
                label='Password'
                type='password'
                placeholder='••••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isRequired
                error={error || undefined}
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                id='remember'
                type='checkbox'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='h-4 w-4 rounded border-gray-50 text-blue-600'
              />
              <label
                htmlFor='remember'
                className='text-sm text-gray-600 font-medium leading-3.5'>
                Remember me
              </label>
            </div>

            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.LG}
              isFullWidth
              loading={loading}
              type='submit'>
              Sign in
            </Button>
          </form>
        </div>
      </div>

      {/* Right side — branding */}
      <div className='hidden flex-col justify-center bg-blue-600 px-18 md:flex md:w-1/2'>
        <div>
          <h2 className='mb-3 text-[40px] leading-[150%] font-semibold text-white'>
            ticktock
          </h2>
          <p className='leading-[150%] text-blue-100'>
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
