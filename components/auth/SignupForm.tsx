'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FiUser, FiUsers, FiFileText, FiAlertCircle, FiUserPlus, FiLoader } from 'react-icons/fi'

const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Business Administration',
]

const lecturerTitles = [
  'Professor',
  'Associate Professor',
  'Senior Lecturer',
  'Lecturer',
  'Assistant Lecturer',
]

const centers = [
  'Main Campus',
  'Accra City Campus',
  'Kumasi Campus',
  'Mampong Campus',
  'Winneba Campus',
]

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('LECTURER')
  const [department, setDepartment] = useState('')
  const [title, setTitle] = useState('')
  const [center, setCenter] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          ...(role === 'LECTURER' && { department, title, center }),
          ...(role === 'COORDINATOR' && { department }),
        }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Signup failed')

      // Auto login after signup
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginRes.json()
      if (!loginRes.ok) throw new Error(loginData.error || 'Login failed')

      router.push(`/dashboard/${loginData.user.role.toLowerCase()}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
            <FiUser className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Join the UEW Claims Portal and start managing your claims
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
            <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@uew.edu.gh"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="role" className="mb-1 block">
                Role
              </Label>
              <Select
                value={role}
                onValueChange={(value) => {
                  setRole(value)
                  if (value !== 'LECTURER') {
                    setDepartment('')
                    setTitle('')
                    setCenter('')
                  }
                }}
              >
                <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 shadow-lg">
                  <SelectItem value="LECTURER">
                    <span className="flex items-center">
                      <FiUser className="h-4 w-4 mr-2 text-blue-500" />
                      Lecturer
                    </span>
                  </SelectItem>
                  <SelectItem value="COORDINATOR">
                    <span className="flex items-center">
                      <FiUsers className="h-4 w-4 mr-2 text-purple-500" />
                      Coordinator
                    </span>
                  </SelectItem>
                  <SelectItem value="REGISTRY">
                    <span className="flex items-center">
                      <FiFileText className="h-4 w-4 mr-2 text-green-500" />
                      Registry
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'LECTURER' && (
              <>
                <div>
                  <Label htmlFor="department" className="mb-1 block">
                    Department
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-lg">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title" className="mb-1 block">
                    Title
                  </Label>
                  <Select value={title} onValueChange={setTitle}>
                    <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-lg">
                      {lecturerTitles.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="center" className="mb-1 block">
                    Center
                  </Label>
                  <Select value={center} onValueChange={setCenter}>
                    <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select center" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-lg">
                      {centers.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {role === 'COORDINATOR' && (
              <div>
                <Label htmlFor="department" className="mb-1 block">
                  Department
                </Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 shadow-lg">
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <FiLoader className="animate-spin h-4 w-4 mr-2" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FiUserPlus className="h-4 w-4 mr-2" />
                Create account
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}