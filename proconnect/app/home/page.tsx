import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { HomeFeed } from './HomeFeed'

async function getZeets() {
  const zeets = await prisma.zeet.findMany({
    include: {
      author: {
        include: {
          profile: true,
        },
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })

  return zeets
}

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const zeets = await getZeets()

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <HomeFeed initialZeets={zeets} userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}
