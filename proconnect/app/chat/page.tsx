'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Paperclip } from 'lucide-react'
import { useChatStore, Message } from '@/store/useChatStore'
import { formatRelativeTime } from '@/lib/utils'
import { ChatClient } from './ChatClient'

export default function ChatPage() {
  return (
    <DashboardLayout>
      <div className="h-full flex">
        <ChatClient />
      </div>
    </DashboardLayout>
  )
}

