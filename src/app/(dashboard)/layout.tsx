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
    <div className='min-h-screen bg-[#f8f8f8]'>
      <DashboardNav userName={session.user?.name ?? 'User'} />
      <main>{children}</main>
      <footer className='mx-auto mb-24 max-w-7xl max-[1280px]:mx-6'>
        <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center'>
          <p className='text-sm text-gray-400'>
            © 2024 tentwenty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
