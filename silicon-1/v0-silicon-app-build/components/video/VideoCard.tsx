'use client'

import Link from 'next/link'
import { Clock, MoreVertical } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnailUrl?: string
    videoUrl: string
    views: number
    createdAt: string
    duration?: number
    user: {
      id: string
      name: string
      username: string
      image?: string
    }
  }
}

export function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  }

  return (
    <div className="group">
      <Link href={`/watch/${video.id}`} className="block" prefetch>
        {/* Thumbnail */}
        <div className="relative aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden mb-3">
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
          )}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="flex gap-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            {video.user.image ? (
              <img
                src={video.user.image}
                alt={video.user.name}
                className="w-9 h-9 rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {video.user.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-crimson-500 transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-gray-400 truncate">{video.user.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>{formatNumber(video.views)} views</span>
              <span>•</span>
              <span>{formatTimeAgo(video.createdAt)}</span>
            </div>
          </div>

          {/* More Options */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          >
            <MoreVertical size={16} className="text-gray-400" />
          </button>
        </div>
      </Link>
    </div>
  )
}
