"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function VideoGrid() {
  const [categories] = useState(["All", "Music", "Gaming", "News", "Live", "Sports", "Trending", "Education"])

  const videos = [
    {
      id: 1,
      title: "Nigerians Speak Only Sarcasm - A Comedy Breakdown",
      channel: "NaijaMind TV",
      views: "63.6K",
      time: "6 days ago",
      thumbnail: "/nigerian-comedy-sarcasm.jpg",
      duration: "8:42",
    },
    {
      id: 2,
      title: "I Stole 1 Million Naira From The Church 🤐",
      channel: "Voice Network TV",
      views: "127K",
      time: "3 days ago",
      thumbnail: "/church-story-viral.jpg",
      duration: "7:18",
    },
    {
      id: 3,
      title: "He Attacked me For Saying the Truth! Nigeria's True Enemy",
      channel: "DonUza",
      views: "139K",
      time: "5 months ago",
      thumbnail: "/nigerian-political-debate.jpg",
      duration: "34:45",
    },
    {
      id: 4,
      title: "Why Nigeria is on the lips of these foreigners",
      channel: "NaTivi",
      views: "307K",
      time: "1 month ago",
      thumbnail: "/nigeria-international.jpg",
      duration: "12:15",
    },
    {
      id: 5,
      title: "A Day In The Life With The Richest Black Pastor",
      channel: "FaithStories",
      views: "512K",
      time: "1 day ago",
      thumbnail: "/pastor-lifestyle.jpg",
      duration: "1:12:18",
    },
    {
      id: 6,
      title: "Why Do Nigerians Talk Like This?",
      channel: "LinguaExplained",
      views: "89K",
      time: "2 weeks ago",
      thumbnail: "/nigerian-dialect.jpg",
      duration: "9:33",
    },
  ]

  return (
    <div className="p-6">
      {/* Category Tabs */}
      <div className="mb-8 pb-6 border-b border-gray-800 overflow-x-auto">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                cat === "All"
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`} className="group cursor-pointer">
            {/* Thumbnail */}
            <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900 aspect-video">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-gray-200">{video.title}</h3>
              <p className="text-xs text-gray-400">{video.channel}</p>
              <p className="text-xs text-gray-400">
                {video.views} views · {video.time}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
