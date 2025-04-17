// lib/data.ts
import prisma from '@/lib/prisma'

export async function getLecturerDashboardData(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      role: true,
      department: true,
      title: true,
      center: true,
      // Add related data here as needed
    },
  })

  if (!user) throw new Error('User not found')

  // You can expand this later to include claims, schedule, etc.
  return {
    name: user.name,
    role: user.role,
    department: user.department,
    title: user.title,
    center: user.center,
    activeCourses: 4, // mock or derive from DB
    supervisedStudents: 87,
    pendingClaims: 3,
    approvedClaims: 12,
    upcomingClasses: [
      { course: 'CS 101', time: '09:00 AM', room: 'A101' },
      { course: 'CS 201', time: '11:00 AM', room: 'B205' },
    ],
    recentActivities: [
      { type: 'Claim', description: 'CS 101 Teaching Claim', status: 'Approved', time: '2 hours ago' },
      { type: 'Thesis', description: 'MPhil Supervision', status: 'Pending', time: '1 day ago' }
    ]
  }
}
