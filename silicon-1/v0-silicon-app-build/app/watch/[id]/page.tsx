'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ReactPlayer from 'react-player'
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Save,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { VideoCard } from '@/components/video/VideoCard'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'
import { formatNumber } from '@/lib/utils'

interface Video {
  id: string
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  views: number
  likes: number
  comments: number
  createdAt: string
  duration?: number
  user: {
    id: string
    name: string
    username: string
    image?: string
    followers: number
  }
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { requireAuth, authModalOpen, setAuthModalOpen, authAction } = useAuth()
  const [video, setVideo] = useState<Video | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchVideo()
      fetchRelatedVideos()
    }
  }, [params.id])

  const fetchVideo = async () => {
    try {
      const res = await fetch(`/api/videos/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setVideo(data)
        
        // Check if user liked this video
        if (session) {
          const likeRes = await fetch(`/api/videos/${params.id}/like`)
          // This would check if liked, for now we'll skip
        }
      }
    } catch (error) {
      console.error('Error fetching video:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedVideos = async () => {
    try {
      const res = await fetch('/api/videos?limit=10')
      if (res.ok) {
        const data = await res.json()
        // Filter out current video
        setRelatedVideos(data.videos?.filter((v: any) => v.id !== params.id) || [])
      }
    } catch (error) {
      console.error('Error fetching related videos:', error)
    }
  }

  const handleLike = async () => {
    if (requireAuth('like', async () => {
      await toggleLike()
    })) {
      await toggleLike()
    }
  }

  const toggleLike = async () => {
    try {
      const res = await fetch(`/api/videos/${video?.id}/like`, {
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        setLiked(data.liked)
        if (video) {
          setVideo({
            ...video,
            likes: data.liked ? video.likes + 1 : video.likes - 1,
          })
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleSubscribe = async () => {
    if (!video) return
    if (requireAuth('subscribe', async () => {
      await toggleSubscribe()
    })) {
      await toggleSubscribe()
    }
  }

  const toggleSubscribe = async () => {
    try {
      const res = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: video?.user.id }),
      })
      if (res.ok) {
        const data = await res.json()
        setSubscribed(data.following)
      }
    } catch (error) {
      console.error('Error toggling subscribe:', error)
    }
  }

  const handleWatch = () => {
    if (video) {
      // Record watch
      fetch(`/api/videos/${video.id}/watch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchTime: 0, completed: false }),
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 mt-14 flex-1 p-4">
            <div>Loading...</div>
          </main>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 mt-14 flex-1 p-4">
            <div>Video not found</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 mt-14 flex-1">
          <div className="flex gap-6 p-6">
            {/* Main Video Section */}
            <div className="flex-1 max-w-4xl">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                  onStart={handleWatch}
                  light={video.thumbnailUrl}
                />
              </div>

              {/* Video Title */}
              <h1 className="text-xl font-semibold mb-4">{video.title}</h1>

              {/* Video Actions */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {video.user.image ? (
                      <img
                        src={video.user.image}
                        alt={video.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {video.user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{video.user.name}</p>
                      <p className="text-sm text-gray-400">
                        {formatNumber(video.user.followers)} subscribers
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      subscribed
                        ? 'bg-[#272727] text-white'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] transition-colors ${
                      liked ? 'text-crimson-500' : ''
                    }`}
                  >
                    <ThumbsUp size={20} />
                    <span>{formatNumber(video.likes)}</span>
                  </button>
                  <button className="p-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] transition-colors">
                    <ThumbsDown size={20} />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] transition-colors">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] transition-colors">
                    <Save size={20} />
                    <span>Save</span>
                  </button>
                  <button className="p-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-[#272727] rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div>
                    <span className="font-medium">{formatNumber(video.views)} views</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-400">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {video.description && (
                  <div>
                    <button
                      onClick={() => setShowDescription(!showDescription)}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-2"
                    >
                      {showDescription ? (
                        <>
                          <ChevronUp size={16} />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Show more
                        </>
                      )}
                    </button>
                    {showDescription && (
                      <p className="text-sm whitespace-pre-line">{video.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-800 pt-4">
                <h2 className="text-lg font-semibold mb-4">
                  {formatNumber(video.comments)} Comments
                </h2>
                <div className="text-center py-8 text-gray-400">
                  Comments feature coming soon
                </div>
              </div>
            </div>

            {/* Related Videos Sidebar */}
            <div className="w-96 space-y-2">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard key={relatedVideo.id} video={relatedVideo} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        action={authAction}
      />
    </div>
  )
}
