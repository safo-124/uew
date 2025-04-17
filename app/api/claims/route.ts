import { NextResponse } from 'next/server'
import { getAuthCookie, verifyToken } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    const token = await getAuthCookie() // ✅ Await here
  
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          role: true,
          department: true,
          center: true,
          createdById: true
        }
      })
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
  
      const body = await request.json()
  
      // Determine approval flow
      let currentApproverId = null
      if (user.role === 'LECTURER') {
        // Lecturer claims go to their coordinator (same center)
        if (user.createdById) {
          currentApproverId = user.createdById
        } else {
          // Fallback to registry if no coordinator assigned
          const registryUser = await prisma.user.findFirst({
            where: { role: 'REGISTRY' },
            select: { id: true }
          })
          currentApproverId = registryUser?.id || null
        }
      } else {
        // All claims ultimately go to registry
        const registryUser = await prisma.user.findFirst({
          where: { role: 'REGISTRY' },
          select: { id: true }
        })
        currentApproverId = registryUser?.id || null
      }
  
      const claimData = {
        ...body,
        submittedById: user.id,
        status: 'PENDING',
        currentApproverId,
        department: user.department || '',
        students: undefined // Will be handled separately
      }
  
      // Create claim with student data
      const claim = await prisma.claim.create({
        data: {
          ...claimData,
          students: body.students ? {
            create: body.students.map((student: any) => ({
              studentNumber: student.studentNumber,
              studentName: student.studentName,
              thesisTitle: student.thesisTitle
            }))
          } : undefined
        },
        include: {
          students: true
        }
      })
  
      return NextResponse.json({ claim })
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to create claim' },
        { status: 500 }
      )
    }
  }
  