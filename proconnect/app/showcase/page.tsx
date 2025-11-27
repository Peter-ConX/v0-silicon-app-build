import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Grid, List, ThumbsUp, RefreshCw } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getShowcases() {
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

  return projects
}

export default async function ShowcasePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const showcases = await getShowcases()

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects by title, skills, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="h-8">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <List className="h-4 w-4" />
              </Button>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Fields</option>
              <option>Design</option>
              <option>Development</option>
              <option>Marketing</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Industries</option>
            </select>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Upload className="mr-2 h-4 w-4" />
              Upload Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Project Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {project.profile?.user.name || 'Anonymous'}, {project.profile?.currentRole || 'Professional'}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Endorse (128)
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Remix
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {showcases.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">No showcases yet</p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

