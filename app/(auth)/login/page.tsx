'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Reusable Input Component
interface LoginInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
}

function LoginInput({ type, placeholder, value, onChange, icon }: LoginInputProps) {
  return (
    <div className="mb-6 relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
          icon ? 'pl-10' : ''
        }`}
      />
    </div>
  )
}

// Reusable Button Component
interface LoginButtonProps {
  loading: boolean
  onClick: () => void
}

function LoginButton({ loading, onClick }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
        loading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700'
      } transition-all duration-300 shadow-md hover:shadow-lg`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </span>
      ) : (
        'Sign In'
      )}
    </button>
  )
}

// Header Component
function LoginHeader() {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">UEW Claims Portal</h1>
      <p className="text-gray-600">Access your claims dashboard with your UEW credentials</p>
    </div>
  )
}

// Main Login Form Component
export default function LoginForm() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof typeof credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      toast.success('Login successful! Redirecting...')
      router.push(`/dashboard/${data.user.role.toLowerCase()}`)
    } catch (err: any) {
      toast.error(err.message || 'Login error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl mx-4">
        <LoginHeader />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <LoginInput
            type="email"
            placeholder="UEW Email"
            value={credentials.email}
            onChange={(value) => handleChange('email', value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          <LoginInput
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(value) => handleChange('password', value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          <LoginButton loading={loading} onClick={handleLogin} />
        </form>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-red-600 hover:text-red-500">
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}