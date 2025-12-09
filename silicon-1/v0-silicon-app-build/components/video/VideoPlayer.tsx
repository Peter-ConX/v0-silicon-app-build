'use client'

import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'
import { formatNumber } from '@/lib/utils'

interface VideoPlayerProps {
  video: {
    id: string
    title: string
    description?: string
    videoUrl: string
    thumbnailUrl?: string
    views: number
    likes: number
    comments: number
    user: {
      id: string
      name: string
      username: string
      image?: string
    }
  }
  isLiked?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
}

export function VideoPlayer({
  video,
  isLiked = false,
  onLike,
  onComment,
  onShare,
}: VideoPlayerProps) {
  const { requireAuth, authModalOpen, setAuthModalOpen, authAction } = useAuth()
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(video.likes)
  const playerRef = useRef<ReactPlayer>(null)

  const handleLike = async () => {
    if (requireAuth('like', async () => {
      await toggleLike()
    })) {
      await toggleLike()
    }
  }

  const toggleLike = async () => {
    try {
      const res = await fetch(`/api/videos/${video.id}/like`, {
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        setLiked(data.liked)
        setLikeCount(prev => data.liked ? prev + 1 : prev - 1)
        if (onLike) onLike()
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleComment = () => {
    if (requireAuth('comment', () => {
      if (onComment) onComment()
    })) {
      if (onComment) onComment()
    }
  }

  const handleShare = () => {
    if (requireAuth('share', () => {
      if (onShare) onShare()
    })) {
      if (onShare) onShare()
    }
  }

  return (
    <>
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
        <ReactPlayer
          ref={playerRef}
          url={video.videoUrl}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
          light={video.thumbnailUrl}
          onClickPreview={() => setPlaying(true)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setPlaying(!playing)}
            className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors"
          >
            {playing ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        {video.description && (
          <p className="text-gray-400 text-sm mb-4">{video.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                liked ? 'text-crimson-500' : 'text-gray-400 hover:text-crimson-500'
              }`}
            >
              <Heart className={liked ? 'fill-current' : ''} size={24} />
              <span>{formatNumber(likeCount)}</span>
            </button>

            <button
              onClick={handleComment}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <MessageCircle size={24} />
              <span>{formatNumber(video.comments)}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Share2 size={24} />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500" />
              <div>
                <p className="text-sm font-medium">{video.user.name}</p>
                <p className="text-xs text-gray-400">@{video.user.username}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          {formatNumber(video.views)} views
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        action={authAction}
      />
    </>
  )
}

