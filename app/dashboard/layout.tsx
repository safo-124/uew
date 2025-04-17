import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { verifyToken, getAuthCookie } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { DashboardNav } from '@/components/ui/dashboard-nav'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // ✅ Await the async cookie getter
  const token = await getAuthCookie()

  if (!token) {
    redirect('/login')
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      title: true,
      department: true,
      center: true,
    },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {user.role.charAt(0) + user.role.slice(1).toLowerCase()} Dashboard
          </h1>
          {children}
        </div>
      </div>
    </div>
  )
}
