import { NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ROLES } from '@/lib/constants'

export async function POST(request: Request) {
  const {
    email,
    password,
    name,
    role,
    department,
    title,
    center,
  } = await request.json()

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!Object.values(ROLES).includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashedPassword = await hashPassword(password)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        department: role === 'LECTURER' || role === 'COORDINATOR' ? department : null,
        title: role === 'LECTURER' ? title : null,
        center: role === 'LECTURER' ? center : null,
      },
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Something went wrong during signup' }, { status: 500 })
  }
}
