import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { comparePasswords, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const passwordMatch = await comparePasswords(password, user.password)

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  })

  await setAuthCookie(token)

  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  })
}
