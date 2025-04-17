import { NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { verifyToken, getAuthCookie } from '@/lib/auth'

export async function GET() {
  const token = await getAuthCookie()

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)

  if (!decoded || decoded.role !== 'REGISTRY') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const token = await getAuthCookie()

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)

  if (!decoded || decoded.role !== 'REGISTRY') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, password, name, role } = await request.json()

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      createdById: decoded.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ user })
}
