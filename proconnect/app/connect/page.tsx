import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, Sparkles } from 'lucide-react'
import { ConnectClient } from './ConnectClient'

async function getUsers(currentUserId: string, search?: string) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { profile: { skills: { hasSome: [search] } } },
        ],
        NOT: { id: currentUserId },
      }
    : { NOT: { id: currentUserId } }

  const users = await prisma.user.findMany({
    where,
    include: {
      profile: {
        include: {
          _count: {
            select: { projects: true },
          },
        },
      },
      _count: {
        select: { followers: true, following: true },
      },
    },
    take: 20,
  })

  return users
}

async function getFollowingIds(currentUserId: string) {
  const follows = await prisma.follow.findMany({
    where: { followerId: currentUserId },
    select: { followingId: true },
  })
  return follows.map((f) => f.followingId)
}

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const users = await getUsers(session.user.id, searchParams.search)
  const followingIds = await getFollowingIds(session.user.id)

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Connect</h1>
          <p className="text-muted-foreground">
            Discover and connect with tech professionals
          </p>
        </div>

        <ConnectClient initialUsers={users} followingIds={followingIds} />
      </div>
    </DashboardLayout>
  )
}

