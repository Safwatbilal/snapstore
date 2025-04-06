'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'

const StateBedget = ({ state, children }: { state: string, children: React.ReactNode }) => {
  const badgeStyles: Record<
    string,
    { variant: 'default' | 'outline' | 'destructive'; className?: string }
  > = {
    pending: { variant: 'default' },
    accepted: { variant: 'outline', className: 'bg-green-600 text-white' },
    completed: { variant: 'outline' },
    cancelled: { variant: 'destructive' },
  }

  return (
    <Badge
      variant={badgeStyles[state]?.variant}
      className={badgeStyles[state]?.className}
    >
      {children}
    </Badge>
  )
}

export default StateBedget
