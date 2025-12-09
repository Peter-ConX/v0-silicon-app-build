"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Share,
  ArrowLeft,
} from "lucide-react"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const video = {
    id: params.id,
    title: "Nigerians Speak Only Sarcasm - A Comedy Breakdown",
    channel: "NaijaMind TV",
    subscribers: "5.6K",
    views: "63,647",
    date: "6 Dec 2025",
    likes: 1600,
    dislikes: 24,
    shares: 340,
    description: `Nigerians are known for their sharp humor and quick sarcastic replies. In this video, I break down why Nigerians speak sarcasm so naturally, how it became part of our culture, and why it shows up in everyday conversations. Watch to understand the real reason behind Nigeria's love for sarcasm.`,
    thumbnail: "/nigerian-comedy.jpg",
    channelImage: "/channel-avatar.jpg",
  }

  const recommendedVideos = [
    {
      id: 2,
      title: "Why Nigerians Are Funny - A Documentary",
      channel: "Comedy Central Nigeria",
      views: "234K",
      time: "2 days ago",
      thumbnail: "/nigerian-comedy-doc.jpg",
      duration: "12:34",
    },
    {
      id: 3,
      title: "Nigerian Slang Explained",
      channel: "LanguageTV",
      views: "89K",
      time: "1 week ago",
      thumbnail: "/nigerian-slang.jpg",
      duration: "8:15",
    },
    {
      id: 4,
      title: "The Psychology Behind Humor",
      channel: "MindScience",
      views: "456K",
      time: "3 days ago",
      thumbnail: "/psychology-humor.jpg",
      duration: "15:42",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800 px-4 py-3 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-white font-semibold flex-1">Video</h1>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="bg-black relative aspect-video">
            <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer group">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
              </button>
            </div>

            {/* Player Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                <Volume2 className="w-4 h-4 text-white" />
              </button>
              <div className="flex-1 h-1 bg-gray-600 rounded cursor-pointer hover:bg-red-600"></div>
              <span className="text-xs text-white">0:14 / 8:42</span>
              <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                <Settings className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                <Maximize className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>

            {/* Stats and Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Image
                  src={video.channelImage || "/placeholder.svg"}
                  alt={video.channel}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">{video.channel}</h3>
                  <p className="text-sm text-gray-400">{video.subscribers} subscribers</p>
                </div>
                <button className="ml-4 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 bg-gray-900 rounded-full p-1">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    liked ? "bg-gray-800" : "hover:bg-gray-800"
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked ? "text-white fill-white" : "text-gray-300"}`} />
                  <span className="text-sm text-gray-300">{video.likes}</span>
                </button>
                <div className="w-px h-6 bg-gray-700"></div>
                <button
                  onClick={() => setDisliked(!disliked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    disliked ? "bg-gray-800" : "hover:bg-gray-800"
                  }`}
                >
                  <ThumbsDown className={`w-5 h-5 ${disliked ? "text-white fill-white" : "text-gray-300"}`} />
                </button>
                <div className="w-px h-6 bg-gray-700"></div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Share className="w-5 h-5 text-gray-300" />
                </button>
                <div className="w-px h-6 bg-gray-700"></div>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>

            {/* View Count and Date */}
            <p className="text-sm text-gray-400 mb-4">
              {video.views} views · {video.date}
            </p>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{video.description}</p>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-400">Show more</button>
          </div>

          {/* Comments Section */}
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Comments</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Image src="/user-avatar.jpg" alt="User" width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-500 pb-2 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Recommended Videos */}
        <div className="w-96 border-l border-gray-800 p-4 overflow-y-auto max-h-screen">
          <h2 className="text-white font-semibold mb-4">Recommended</h2>
          <div className="space-y-4">
            {recommendedVideos.map((rec) => (
              <Link key={rec.id} href={`/watch/${rec.id}`} className="group">
                <div className="flex gap-3 hover:opacity-70 transition-opacity">
                  <div className="relative flex-shrink-0 w-40 aspect-video rounded overflow-hidden bg-gray-900">
                    <Image src={rec.thumbnail || "/placeholder.svg"} alt={rec.title} fill className="object-cover" />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-xs font-bold text-white px-1 py-0.5 rounded">
                      {rec.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-white line-clamp-2 group-hover:text-gray-200">{rec.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{rec.channel}</p>
                    <p className="text-xs text-gray-400">
                      {rec.views} · {rec.time}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
