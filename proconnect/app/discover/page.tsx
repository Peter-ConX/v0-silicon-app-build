import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, TrendingUp, Users } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getTrendingProfessionals() {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      orderBy: {
        followers: {
          _count: 'desc',
        },
      },
      take: 4,
    })

    return users
  } catch (error) {
    console.error('Error fetching trending professionals:', error)
    // Return empty array if there's an error (e.g., table doesn't exist yet)
    return []
  }
}

export default async function DiscoverPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const professionals = await getTrendingProfessionals()

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Discover</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Find Professionals & Projects</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skill, or industry..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Frontend Development', 'UX Design', 'Product Management', 'Data Science', 'Marketing'].map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
              + Add Filter
            </Badge>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h2 className="text-2xl font-semibold">Trending Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {professionals.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold">{user.name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-500">{user.profile?.currentRole || 'Professional'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.profile?.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{user._count.followers} connections</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold">Explore Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Design', count: 1240, icon: '🎨' },
              { name: 'Development', count: 1876, icon: '💻' },
              { name: 'Marketing', count: 943, icon: '📈' },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-500">{category.count} professionals</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

