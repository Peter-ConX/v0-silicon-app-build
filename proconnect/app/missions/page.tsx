import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Zap, Clock, Star, Target } from 'lucide-react'

const mockMissions = [
  {
    id: '1',
    title: 'Build a Responsive Dashboard',
    description: 'Create a responsive admin dashboard with data visualization components using React and a charting library of your choice.',
    skills: ['React', 'CSS', 'Data Visualization'],
    role: 'Frontend Specialist',
    xp: 250,
    difficulty: 2,
    timeLeft: '5 days left',
  },
  {
    id: '2',
    title: 'Design a Mobile Banking App',
    description: 'Create a modern, user-friendly mobile banking app design with a focus on security and ease of use.',
    skills: ['UI/UX', 'Mobile Design', 'Figma'],
    role: 'UX Master',
    xp: 350,
    difficulty: 3,
    timeLeft: '7 days left',
  },
  {
    id: '3',
    title: 'Develop an E-commerce API',
    description: 'Build a RESTful API for an e-commerce platform with endpoints for products, users, orders, and payments.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    role: 'Backend Architect',
    xp: 400,
    difficulty: 3,
    timeLeft: '10 days left',
  },
]

export default async function MissionsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Professional Missions</h1>
          <p className="text-xl opacity-90">
            Complete challenges to earn badges, gain experience points, and showcase your expertise
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your XP</p>
                  <p className="text-2xl font-bold">275</p>
                  <p className="text-xs text-gray-400">Overall Progress: 53%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Badges Earned</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
            Featured Missions
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            My Missions
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            All Missions
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search missions by title, description, or skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Skills</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Industries</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Levels</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockMissions.map((mission) => (
            <Card key={mission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-orange-500">Featured</Badge>
                  <div className="flex">
                    {Array.from({ length: mission.difficulty }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-orange-500 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle>{mission.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{mission.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mission.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{mission.role}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>{mission.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{mission.timeLeft}</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Accept Mission
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

