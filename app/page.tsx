import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0056A3] via-[#0056A3] to-[#D21034]">
      {/* CoDE Header */}
      <header className="absolute top-0 w-full py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image 
            src="/code-logo.png" // Replace with CoDE logo
            alt="CoDE Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
          <div>
            <h2 className="text-white font-bold text-lg">College of Distance Education</h2>
            <p className="text-white/90 text-sm">University of Education, Winneba</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center space-x-3">
              <Image 
                src="/code-logo.png" // CoDE logo
                alt="CoDE Logo"
                width={40}
                height={40}
              />
              <h1 className="text-3xl font-bold text-[#0056A3]">
                CoDE Forms & Claims Portal
              </h1>
            </div>
            
            <p className="text-lg text-gray-700">
              Streamline your academic form submissions and expense claims with our dedicated tracking system for CoDE staff and administrators.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Track form submission status</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Expense claim processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Document management</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Secure role-based access</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full bg-[#0056A3] hover:bg-[#003D75] text-white">
                  Staff Sign In
                </Button>
              </Link>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-[#0056A3] text-[#0056A3] hover:bg-blue-50">
                  Request Account
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex items-center">
            <div className="bg-gray-50 rounded-lg p-4 h-full w-full flex items-center justify-center border border-gray-200">
              <Image 
                src="/code.jpg" // Distance education themed image
                alt="Distance Education Illustration"
                width={400}
                height={300}
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-center text-white/90 text-sm">
        <p>© {new Date().getFullYear()} College of Distance Education, UEW. All rights reserved.</p>
      </footer>
    </div>
  )
}

// Check icon component
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}