'use client'

import { Building2, Star, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifiedBadgeProps {
  type: string | null | undefined
  className?: string
}

export function VerifiedBadge({ type, className }: VerifiedBadgeProps) {
  if (!type) return null

  const config = {
    organization: {
      icon: Building2,
      bgColor: 'bg-blue-500',
      iconColor: 'text-white',
      label: 'Verified Organization',
    },
    high_profile: {
      icon: Star,
      bgColor: 'bg-yellow-500',
      iconColor: 'text-white',
      label: 'High-Profile Individual',
    },
    premium: {
      icon: Sparkles,
      bgColor: 'bg-gray-400',
      iconColor: 'text-white',
      label: 'Premium Member',
    },
  }

  const badgeConfig = config[type as keyof typeof config]
  if (!badgeConfig) return null

  const Icon = badgeConfig.icon

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full',
        badgeConfig.bgColor,
        className
      )}
      title={badgeConfig.label}
    >
      <Icon className={cn('h-3 w-3', badgeConfig.iconColor)} />
    </span>
  )
}
