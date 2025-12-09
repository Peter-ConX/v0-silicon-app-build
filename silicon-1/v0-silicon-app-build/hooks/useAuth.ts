'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authAction, setAuthAction] = useState<string>('continue')

  const requireAuth = (action: string = 'continue', callback?: () => void) => {
    if (status === 'loading') return
    if (!session) {
      setAuthAction(action)
      setAuthModalOpen(true)
      return false
    }
    if (callback) callback()
    return true
  }

  return {
    session,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    authModalOpen,
    setAuthModalOpen,
    authAction,
    requireAuth,
  }
}

