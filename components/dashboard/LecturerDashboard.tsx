// app/dashboard/lecturer/dashboard-view.tsx
'use client'

import { Calendar, BookOpen, FileText, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function DashboardView({ data }: { data: any }) {
  const {
    name,
    department,
    title,
    center,
    activeCourses,
    supervisedStudents,
    pendingClaims,
    approvedClaims,
    upcomingClasses,
    recentActivities
  } = data

  const claimProgress = (approvedClaims / (approvedClaims + pendingClaims)) * 100

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {title} {name}</h1>
        <p className="text-blue-100 mt-2">{department} | {center}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen className="h-6 w-6" />} title="Active Courses" value={activeCourses.toString()} description="This semester" color="text-blue-600" bgColor="bg-blue-50" />
        <StatCard icon={<Users className="h-6 w-6" />} title="Students" value={supervisedStudents.toString()} description="Under supervision" color="text-green-600" bgColor="bg-green-50" />
        <StatCard icon={<FileText className="h-6 w-6" />} title="Pending Claims" value={pendingClaims.toString()} description="Awaiting approval" color="text-yellow-600" bgColor="bg-yellow-50" />
        <StatCard icon={<CheckCircle className="h-6 w-6" />} title="Approved Claims" value={approvedClaims.toString()} description="This semester" color="text-purple-600" bgColor="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.length > 0 ? upcomingClasses.map((cls: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{cls.course}</h3>
                  <p className="text-sm text-gray-500">{cls.time} • {cls.room}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500 text-center py-4">No classes scheduled for today</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/timetable">View Full Timetable</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Claims Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Approval Progress</span>
                  <span className="font-medium">{Math.round(claimProgress)}%</span>
                </div>
                <Progress value={claimProgress} className="h-2" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Approved: {approvedClaims}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Pending: {pendingClaims}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button className="flex-1" asChild>
                <Link href="/dashboard/lecturer/claims"><FileText className="h-4 w-4 mr-2" />New Claim</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/claims">View All Claims</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.length > 0 ? recentActivities.map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'Claim' ? <FileText className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{activity.description}</h3>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={activity.status === 'Approved' ? 'default' : 'secondary'}
                        className={
                          activity.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {activity.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, description, color, bgColor }: {
  icon: React.ReactNode,
  title: string,
  value: string,
  description: string,
  color: string,
  bgColor: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
