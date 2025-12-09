import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Grid, List, ThumbsUp, RefreshCw } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ShowcaseClient } from './ShowcaseClient'

async function getShowcases(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    include: {
      profile: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 12,
  })

  // Check which projects the user has liked
  const likedProjects = await prisma.activity.findMany({
    where: {
      userId,
      type: 'project_liked',
    },
    select: {
      metadata: true,
    },
  })

  const likedProjectIds = new Set(likedProjects.map(a => a.metadata))

  // Count likes for each project
  const projectsWithLikes = await Promise.all(
    projects.map(async (project) => {
      const likeCount = await prisma.activity.count({
        where: {
          type: 'project_liked',
          metadata: project.id,
        },
      })

      return {
        ...project,
        _count: {
          likes: likeCount,
        },
        isLiked: likedProjectIds.has(project.id),
      }
    })
  )

  return projectsWithLikes
}

export default async function ShowcasePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const showcases = await getShowcases(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Showcase Your Work</h1>
          <p className="text-xl opacity-90">
            Discover inspiring projects from professionals across industries or share your own work with the community
          </p>
        </div>
      </div>

      <ShowcaseClient initialShowcases={showcases} userId={session.user.id} />
    </div>
  )
}
