'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { LayoutDashboard, Users, FileText, CheckCircle, LogOut, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  const isActive = (path: string) => pathname?.startsWith(path)

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/code-logo.png"
                alt="CoDE Logo"
                width={40}
                height={40}
                className="h-8 w-auto mr-2"
              />
              <h1 className="text-lg font-bold text-[#0056A3]">
                CoDE Portal
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(`/dashboard/${user.role.toLowerCase()}`)
                    ? 'bg-[#0056A3]/10 text-[#0056A3]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              {user.role === 'REGISTRY' && (
                <Link
                  href="/dashboard/registry/users"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard/registry/users')
                      ? 'bg-[#0056A3]/10 text-[#0056A3]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              )}

              {user.role === 'LECTURER' && (
                <Link
                  href="/dashboard/lecturer/claims"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard/lecturer/claims')
                      ? 'bg-[#0056A3]/10 text-[#0056A3]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Claim
                </Link>
              )}

              {(user.role === 'REGISTRY' || user.role === 'COORDINATOR') && (
                <Link
                  href="/dashboard/approvals"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard/approvals')
                      ? 'bg-[#0056A3]/10 text-[#0056A3]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approvals
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#0056A3] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* User profile and logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <div className="flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-[#D21034] mr-1"></span>
                <span className="text-xs text-gray-500 capitalize">
                  {user.role.toLowerCase()}
                </span>
              </div>
              {user.role === 'LECTURER' && (
                <div className="flex space-x-2 mt-1">
                  {user.title && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {user.title}
                    </span>
                  )}
                  {user.department && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {user.department}
                    </span>
                  )}
                  {user.center && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {user.center}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:bg-[#D21034]/10 hover:text-[#D21034]"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <Link
            href={`/dashboard/${user.role.toLowerCase()}`}
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive(`/dashboard/${user.role.toLowerCase()}`)
                ? 'bg-[#0056A3]/10 text-[#0056A3]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          {user.role === 'REGISTRY' && (
            <Link
              href="/dashboard/registry/users"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/dashboard/registry/users')
                  ? 'bg-[#0056A3]/10 text-[#0056A3]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Manage Users
            </Link>
          )}

          {user.role === 'LECTURER' && (
            <Link
              href="/dashboard/lecturer/claims"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/dashboard/lecturer/claims')
                  ? 'bg-[#0056A3]/10 text-[#0056A3]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Submit Claim
            </Link>
          )}

          {(user.role === 'REGISTRY' || user.role === 'COORDINATOR') && (
            <Link
              href="/dashboard/approvals"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/dashboard/approvals')
                  ? 'bg-[#0056A3]/10 text-[#0056A3]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0056A3]'
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              Approvals
            </Link>
          )}

          {/* Mobile user info and logout */}
          <div className="pt-4 pb-2 border-t border-gray-200">
            <div className="flex items-center px-3 py-2">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#0056A3]/10 flex items-center justify-center text-[#0056A3] font-medium">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <div className="flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#D21034] mr-1"></span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
            {user.role === 'LECTURER' && (
              <div className="px-3 mt-2 flex flex-wrap gap-2">
                {user.title && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {user.title}
                  </span>
                )}
                {user.department && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {user.department}
                  </span>
                )}
                {user.center && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {user.center}
                  </span>
                )}
              </div>
            )}
            <div className="mt-3 px-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full text-gray-600 hover:bg-[#D21034]/10 hover:text-[#D21034] justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}