"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, MessageCircle, TrendingUp, Plus, Heart } from "lucide-react"

export default function CavePage() {
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const communities = [
    {
      id: 1,
      name: "Gaming Creators",
      members: "234.5K",
      description: "A community for gaming content creators to share tips, tricks, and collaborate",
      icon: "🎮",
      color: "from-purple-600 to-pink-600",
      posts: 1256,
      trending: true,
    },
    {
      id: 2,
      name: "Music Producers",
      members: "156.8K",
      description: "Connect with other music producers, share beats, and collaborate on projects",
      icon: "🎵",
      color: "from-blue-600 to-cyan-600",
      posts: 892,
      trending: true,
    },
    {
      id: 3,
      name: "Comedy Club",
      members: "198.2K",
      description: "Share your funniest content and get feedback from the comedy community",
      icon: "😂",
      color: "from-yellow-600 to-orange-600",
      posts: 2134,
      trending: true,
    },
    {
      id: 4,
      name: "Fitness & Wellness",
      members: "312.4K",
      description: "Share fitness routines, nutrition tips, and wellness advice with creators",
      icon: "💪",
      color: "from-green-600 to-emerald-600",
      posts: 1567,
      trending: false,
    },
    {
      id: 5,
      name: "Tech & Innovation",
      members: "145.3K",
      description: "Discuss latest tech trends, product reviews, and innovative ideas",
      icon: "🚀",
      color: "from-indigo-600 to-blue-600",
      posts: 978,
      trending: false,
    },
    {
      id: 6,
      name: "Fashion & Beauty",
      members: "267.9K",
      description: "Share fashion tips, beauty hacks, and styling advice with fellow creators",
      icon: "✨",
      color: "from-pink-600 to-rose-600",
      posts: 1834,
      trending: false,
    },
  ]

  const discussions = [
    {
      id: 1,
      title: "Best lighting setups for content creation",
      author: "Alex Turner",
      community: "Gaming Creators",
      replies: 234,
      likes: 1203,
    },
    {
      id: 2,
      title: "How to grow from 0 to 100K followers",
      author: "Jordan Miles",
      community: "Gaming Creators",
      replies: 567,
      likes: 2891,
    },
    {
      id: 3,
      title: "Best DAWs for beginners",
      author: "Casey Lee",
      community: "Music Producers",
      replies: 189,
      likes: 945,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Header */}
      <div className="border-b border-purple-900/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-purple-400" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Silicon Cave</h1>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Community
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Join Our Communities</h2>
          <p className="text-xl text-purple-300">
            Connect with creators, share knowledge, and collaborate on amazing projects
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Featured Communities */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-8">Featured Communities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {communities.map((community) => (
                <div
                  key={community.id}
                  onClick={() => setSelectedCommunity(community.id)}
                  className={`bg-gradient-to-br ${community.color} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedCommunity === community.id ? "ring-2 ring-white" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{community.icon}</span>
                    {community.trending && (
                      <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                        <TrendingUp className="w-4 h-4 text-yellow-300" />
                        <span className="text-xs font-semibold text-yellow-300">Trending</span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{community.name}</h4>
                  <p className="text-white/80 text-sm mb-4">{community.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-1 text-white/90">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">{community.members}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">{community.posts}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Discussions */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-900/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Trending Discussions</h3>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-black/30 rounded-lg p-4 cursor-pointer hover:bg-black/50 transition-colors"
                >
                  <p className="text-white font-semibold text-sm mb-2 line-clamp-2">{discussion.title}</p>
                  <p className="text-purple-400 text-xs mb-3">
                    {discussion.author} in {discussion.community}
                  </p>
                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3 h-3" />
                      {discussion.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {discussion.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
