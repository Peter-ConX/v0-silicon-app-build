import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, UserPlus, ThumbsUp, Lightbulb, Github, Twitter, Linkedin, Globe, Edit } from 'lucide-react'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { prisma } from '@/lib/prisma'

async function getProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          verifiedType: true,
        },
      },
      projects: {
        where: { featured: true },
        take: 3,
      },
    },
  })

  const [followers, following] = await Promise.all([
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } }),
  ])

  return { profile, followers, following }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const { profile, followers, following } = await getProfile(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 h-48 relative">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" className="text-white">
            <Edit className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={session.user.image || ''} />
                <AvatarFallback className="text-2xl">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">{session.user.name || 'Anonymous'}</h1>
                  <VerifiedBadge type={session.user.verifiedType} />
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  {profile?.currentRole || 'Professional'}
                </p>
                <p className="text-gray-500 flex items-center space-x-1">
                  <span>📍</span>
                  <span>{profile?.location || 'Location not set'}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite to Project
              </Button>
              <Button variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Endorse
              </Button>
              <Button variant="outline">
                <Lightbulb className="mr-2 h-4 w-4" />
                Request Mentorship
              </Button>
            </div>
          </div>

          {profile?.bio && (
            <p className="mt-6 text-gray-700">{profile.bio}</p>
          )}

          {profile?.skills && profile.skills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{profile?.projects.length || 0}</p>
                <p className="text-sm text-gray-500">Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">312</p>
                <p className="text-sm text-gray-500">Endorsements</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{followers}</p>
                <p className="text-sm text-gray-500">Connections</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-gray-500">Missions</p>
              </CardContent>
            </Card>
          </div>

          {(profile?.github || profile?.twitter || profile?.linkedin || profile?.website) && (
            <div className="mt-6 flex items-center space-x-4">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <Github className="h-4 w-4" />
                  <span className="text-sm">github.com/okaforchidera</span>
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm">linkedin.com/in/okaforchidera</span>
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm">twitter.com/okaforchidera</span>
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">proconnect.com</span>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4 border-b mb-6">
          <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            Showcase
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Missions Completed
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Collabs
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Mentorships
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile?.projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Project Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
