import { SignupForm } from "@/components/auth/SignupForm";


export default function SignupPage() {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Create a new account</h2>
      <SignupForm />
    </div>
  )
}