import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-2">
          {/* Replace with your actual UEW logo */}
          <Image 
  src="/code-logo.png" 
  alt="UEW Logo" 
  width={64} 
  height={64} 
  className="rounded-full"
/>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800">
          UEW Claims Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your claims dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button 
            variant="link" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to home
          </Button>
        </Link>
      </div>
    </div>
  )
}