"use client"

import { MainNav } from "@/components/layout/MainNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function CavePage() {
  const communities = [
    {
      id: 1,
      name: "AI Builders Cave",
      description: "A space for AI/ML engineers to discuss cutting-edge research and build projects together",
      members: 3421,
      active: "1.2k online",
      category: "AI/ML",
      image: "AI",
    },
    {
      id: 2,
      name: "Web Dev Summit",
      description: "Connect with frontend and full-stack developers, share tips and collaborate",
      members: 5632,
      active: "2.1k online",
      category: "Web Dev",
      image: "Web",
    },
    {
      id: 3,
      name: "Startup Founders",
      description: "Network with founders, share experiences, and discuss growth strategies",
      members: 2854,
      active: "856 online",
      category: "Startups",
      image: "Startup",
    },
    {
      id: 4,
      name: "Mobile Dev Lab",
      description: "iOS, Android, and React Native developers sharing code and best practices",
      members: 4123,
      active: "1.5k online",
      category: "Mobile",
      image: "Mobile",
    },
  ]

  const discussions = [
    {
      id: 1,
      title: "Best practices for scaling React applications",
      author: "Jane Smith",
      community: "Web Dev Summit",
      replies: 247,
      views: 3421,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "GPT-4 vs Open Source Models Comparison",
      author: "Alex Chen",
      community: "AI Builders Cave",
      replies: 512,
      views: 8934,
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      title: "Funding Round Tips for First-Time Founders",
      author: "Marcus Johnson",
      community: "Startup Founders",
      replies: 189,
      views: 2156,
      timestamp: "6 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <MainNav />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Communities</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Join the Cave
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded professionals, share knowledge, and collaborate on exciting projects in our vibrant
            communities.
          </p>
        </div>

        {/* Featured Communities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Communities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.map((community) => (
              <Card key={community.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-bold mb-3">
                    {community.image.charAt(0)}
                  </div>
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {community.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{community.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{community.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      {community.active}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Discussions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Popular Discussions</h2>
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{discussion.author}</span>
                        <span>in {discussion.community}</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{discussion.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Community</h2>
          <p className="text-lg mb-6 opacity-90">
            Build a space for your community to connect, share ideas, and grow together.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Start a Community
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
