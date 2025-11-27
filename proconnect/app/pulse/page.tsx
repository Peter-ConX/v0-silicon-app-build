import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Eye, Download } from 'lucide-react'

export default async function PulsePage() {
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
            <h1 className="text-4xl font-bold mb-2">Pulse</h1>
            <p className="text-gray-600">Track your professional growth and engagement</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Last 6 Months</option>
            </select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,260</div>
              <p className="text-xs text-muted-foreground">+24% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Endorsements</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-muted-foreground">+18% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7%</div>
              <p className="text-xs text-muted-foreground">+3.2% from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4 mb-6 border-b">
          <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            Overview
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Content
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Skills
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Network
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[120, 180, 260, 310, 410, 360].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-600 rounded-t"
                      style={{ height: `${(height / 450) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[
                  { posts: 18, comments: 2, shares: 0 },
                  { posts: 24, comments: 3, shares: 1 },
                  { posts: 38, comments: 12, shares: 2 },
                  { posts: 55, comments: 15, shares: 3 },
                  { posts: 62, comments: 18, shares: 4 },
                  { posts: 20, comments: 8, shares: 2 },
                ].map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-x-1">
                    <div className="flex items-end space-x-0.5 w-full">
                      <div
                        className="flex-1 bg-blue-600 rounded-t"
                        style={{ height: `${(data.posts / 80) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-gray-600 rounded-t"
                        style={{ height: `${(data.comments / 80) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-gray-400 rounded-t"
                        style={{ height: `${(data.shares / 80) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded" />
                  <span className="text-xs">Posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded" />
                  <span className="text-xs">Comments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded" />
                  <span className="text-xs">Shares</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

