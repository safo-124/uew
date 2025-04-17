import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET as string

// Hash password for signup
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Compare raw password with hashed
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: { userId: string; role: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

// Verify and decode token
export function verifyToken(token: string): { userId: string; role: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string; email: string }
  } catch (error) {
    return null
  }
}

// Set JWT cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })
}

// Get token from cookie
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = cookies()
  return cookieStore.get('auth-token')?.value
}

// Remove auth cookie (logout)
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}
