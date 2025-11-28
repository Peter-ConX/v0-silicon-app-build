'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Grid, List, ThumbsUp, RefreshCw } from 'lucide-react'
import { UploadProjectModal } from '@/components/projects/UploadProjectModal'
import { useSession } from 'next-auth/react'

interface Project {
  id: string
  title: string
  description: string | null
  techStack: string[]
  profile: {
    user: {
      name: string | null
      image: string | null
    }
    currentRole: string | null
  } | null
  _count?: {
    likes: number
  }
  isLiked?: boolean
}

interface ShowcaseClientProps {
  initialShowcases: any[]
  userId: string
}

export function ShowcaseClient({ initialShowcases, userId }: ShowcaseClientProps) {
  const { data: session } = useSession()
  const [showcases, setShowcases] = useState<Project[]>(
    initialShowcases.map((p: any) => ({
      ...p,
      isLiked: p.isLiked || false,
    }))
  )
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLike = async (projectId: string) => {
    try {
      const project = showcases.find(p => p.id === projectId)
      if (!project) return

      const response = await fetch(`/api/projects/${projectId}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        const { liked } = await response.json()
        setShowcases(showcases.map(p => 
          p.id === projectId 
            ? { 
                ...p, 
                isLiked: liked,
                _count: { 
                  ...p._count || { likes: 0 }, 
                  likes: liked 
                    ? (p._count?.likes || 0) + 1 
                    : Math.max(0, (p._count?.likes || 0) - 1)
                } 
              }
            : p
        ))
      }
    } catch (error) {
      console.error('Failed to like project:', error)
    }
  }

  const filteredShowcases = showcases.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects by title, skills, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setUploadModalOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowcases.map((project) => (
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLike(project.id)}
                      className={project.isLiked ? 'text-blue-600 border-blue-600' : ''}
                    >
                      <ThumbsUp className={`mr-2 h-4 w-4 ${project.isLiked ? 'fill-current' : ''}`} />
                      Endorse ({project._count?.likes || 0})
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

          {filteredShowcases.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">
                  {searchQuery ? 'No projects found matching your search.' : 'No showcases yet'}
                </p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <UploadProjectModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => {
          // Refresh the page to show new project
          window.location.reload()
        }}
      />
    </>
  )
}

