import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Users, Calendar } from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    title: 'Design System for E-commerce Platform',
    description: 'Creating a comprehensive design system for a large-scale e-commerce platform with a focus on accessibility and performance.',
    skills: ['UI/UX', 'Design Systems', 'Figma', 'React'],
    progress: 65,
    members: 3,
    dueDate: 'Jul 15, 2023',
  },
  {
    id: '2',
    title: 'AI-Powered Content Recommendation Engine',
    description: 'Developing a machine learning algorithm that analyzes user behavior to provide personalized content recommendations across multiple platforms.',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'API Development'],
    progress: 40,
    members: 3,
    dueDate: 'Aug 30, 2023',
  },
]

export default async function CoLabPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Co-Lab</h1>
            <p className="text-gray-600">Collaborate with professionals on innovative projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Start New Collaboration
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search collaborations by title, description, or skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-2 mb-6">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
            Active
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Planning
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Completed
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-500">Active</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.members} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due {project.dueDate}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

