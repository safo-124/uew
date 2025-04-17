import DashboardView from '@/components/dashboard/LecturerDashboard'
import { getAuthCookie, verifyToken } from '@/lib/auth'
import { getLecturerDashboardData } from '@/lib/data'


export default async function LecturerDashboardPage() {
  const token = await getAuthCookie()
  if (!token) throw new Error('No auth token')

  const decoded = verifyToken(token)
  if (!decoded?.email) throw new Error('Invalid token or missing email')

  const data = await getLecturerDashboardData(decoded.email)

  return <DashboardView data={data} />
}
