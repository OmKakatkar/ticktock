import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/timesheets'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardNav userName={session.user?.name ?? 'User'} />
      <main>{children}</main>
      <footer className='py-6 text-center'>
        <p className='text-sm text-gray-400'>
          © 2024 tentwenty. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
