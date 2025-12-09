'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Heart, MessageCircle, Share2, Bookmark, Image as ImageIcon, Video, Code } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

interface Zeet {
  id: string
  content: string
  imageUrl?: string | null
  videoUrl?: string | null
  codeBlock?: string | null
  tags: string[]
  author: {
    id: string
    name: string | null
    username: string | null
    image: string | null
    verifiedType: string | null
  }
  likes: Array<{ user: { id: string; name: string | null } }>
  _count: {
    replies: number
    likes: number
  }
  createdAt: Date
  isLiked?: boolean
}

export function HomeFeed({ initialZeets, userId }: { initialZeets: any[]; userId: string }) {
  const [zeets, setZeets] = useState<Zeet[]>(
    initialZeets.map(z => ({
      ...z,
      isLiked: z.likes?.some((like: any) => like.user.id === userId) || false
    }))
  )
  const [newZeet, setNewZeet] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if (!newZeet.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/zeets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newZeet }),
      })

      if (response.ok) {
        const zeet = await response.json()
        setZeets([zeet, ...zeets])
        setNewZeet('')
      }
    } catch (error) {
      console.error('Failed to post zeet:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (zeetId: string) => {
    try {
      const zeet = zeets.find(z => z.id === zeetId)
      if (!zeet) return

      const response = await fetch(`/api/zeets/${zeetId}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        const { liked } = await response.json()
        setZeets(zeets.map(z => 
          z.id === zeetId 
            ? { 
                ...z, 
                isLiked: liked,
                _count: { 
                  ...z._count, 
                  likes: liked ? z._count.likes + 1 : Math.max(0, z._count.likes - 1)
                } 
              }
            : z
        ))
      }
    } catch (error) {
      console.error('Failed to like zeet:', error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Post Creation Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <textarea
                value={newZeet}
                onChange={(e) => setNewZeet(e.target.value)}
                placeholder="Share your professional insights..."
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handlePost} 
                  disabled={loading || !newZeet.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Tabs */}
      <div className="flex space-x-4 border-b">
        <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
          For You
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
          Following
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
          Trending
        </button>
      </div>

      {/* Zeets Feed */}
      <div className="space-y-4">
        {zeets.map((zeet) => (
          <Card key={zeet.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src={zeet.author.image || ''} />
                  <AvatarFallback>
                    {zeet.author.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{zeet.author.name || 'Anonymous'}</span>
                    <VerifiedBadge type={zeet.author.verifiedType} />
                    <span className="text-gray-500 text-sm">
                      @{zeet.author.username || 'user'} • {formatRelativeTime(zeet.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{zeet.content}</p>
                  
                  {zeet.imageUrl && (
                    <img 
                      src={zeet.imageUrl} 
                      alt="Zeet attachment" 
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}

                  {zeet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {zeet.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-6 pt-2">
                    <button 
                      onClick={() => handleLike(zeet.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        zeet.isLiked 
                          ? 'text-red-500' 
                          : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${zeet.isLiked ? 'fill-current' : ''}`} />
                      <span>{zeet._count.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                      <MessageCircle className="h-4 w-4" />
                      <span>{zeet._count.replies}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
