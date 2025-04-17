'use client'

import { Badge } from '@/components/ui/badge'

type Status = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSED'

export function ClaimStatusBadge({ status }: { status: Status }) {
  const statusMap = {
    PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    APPROVED: { label: 'Approved', color: 'bg-green-100 text-green-800' },
    REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    PROCESSED: { label: 'Processed', color: 'bg-blue-100 text-blue-800' }
  }

  return (
    <Badge className={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}