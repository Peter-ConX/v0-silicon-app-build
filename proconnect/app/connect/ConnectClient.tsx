'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, UserCheck, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  profile: {
    bio: string | null
    currentRole: string | null
    skills: string[]
    techStack: string[]
  } | null
  _count: {
    followers: number
    following: number
  }
}

export function ConnectClient({
  initialUsers,
  followingIds,
}: {
  initialUsers: User[]
  followingIds: string[]
}) {
  const router = useRouter()
  const [users, setUsers] = useState(initialUsers)
  const [following, setFollowing] = useState<Set<string>>(new Set(followingIds))
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.push(`/connect?search=${encodeURIComponent(search)}`)
    setLoading(false)
  }

  const handleFollow = async (userId: string) => {
    try {
      const response = await fetch('/api/connections/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        setFollowing((prev) => new Set(prev).add(userId))
      }
    } catch (error) {
      console.error('Failed to follow user:', error)
    }
  }

  const handleUnfollow = async (userId: string) => {
    try {
      const response = await fetch('/api/connections/unfollow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        setFollowing((prev) => {
          const next = new Set(prev)
          next.delete(userId)
          return next
        })
      }
    } catch (error) {
      console.error('Failed to unfollow user:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, email, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={loading}>
          Search
        </Button>
      </form>

      {/* AI Suggestions */}
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="p-4 flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">AI-Powered Suggestions</p>
            <p className="text-xs text-muted-foreground">
              Get personalized connection recommendations based on your skills and interests
            </p>
          </div>
          <Button size="sm" variant="outline" className="ml-auto">
            Get Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => {
          const isFollowing = following.has(user.id)
          return (
            <Card key={user.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image || ''} />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{user.name || 'Anonymous'}</h3>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    {user.profile?.currentRole && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {user.profile.currentRole}
                      </p>
                    )}
                  </div>
                </div>

                {user.profile?.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {user.profile.bio}
                  </p>
                )}

                {user.profile?.skills && user.profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {user.profile.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.profile.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{user.profile.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {user._count.followers} followers
                  </div>
                  <Button
                    size="sm"
                    variant={isFollowing ? 'outline' : 'default'}
                    onClick={() => (isFollowing ? handleUnfollow(user.id) : handleFollow(user.id))}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  )
}

