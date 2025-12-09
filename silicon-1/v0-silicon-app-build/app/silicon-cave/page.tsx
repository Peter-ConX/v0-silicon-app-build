'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart3,
  Video,
  Users,
  DollarSign,
  Upload,
  Settings,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
} from 'lucide-react'
import { formatNumber, formatCurrency } from '@/lib/utils'

interface Analytics {
  totalViews: number
  totalLikes: number
  totalComments: number
  totalFollowers: number
  totalEarnings: number
  recentVideos: any[]
}

export default function SiliconCavePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchAnalytics()
    }
  }, [status, router])

  const fetchAnalytics = async () => {
    try {
      // In production, fetch from API
      // For now, using mock data
      setAnalytics({
        totalViews: 125000,
        totalLikes: 5400,
        totalComments: 230,
        totalFollowers: 850,
        totalEarnings: 1250.50,
        recentVideos: [],
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
              Silicon Cave
            </h1>
          </div>
          <p className="text-gray-400">Your creator dashboard and analytics hub</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'content', label: 'Content', icon: Video },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'monetization', label: 'Monetization', icon: DollarSign },
            { id: 'community', label: 'Community', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-crimson-500 text-crimson-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="text-crimson-500" size={24} />
                  <span className="text-gray-400 text-sm">Total Views</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="text-pink-500" size={24} />
                  <span className="text-gray-400 text-sm">Total Likes</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalLikes)}</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-purple-500" size={24} />
                  <span className="text-gray-400 text-sm">Followers</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalFollowers)}</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-green-500" size={24} />
                  <span className="text-gray-400 text-sm">Earnings</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(analytics.totalEarnings)}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/upload"
                  className="flex items-center gap-3 p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                >
                  <Upload className="text-crimson-500" size={24} />
                  <div>
                    <p className="font-medium">Upload Video</p>
                    <p className="text-sm text-gray-400">Create new content</p>
                  </div>
                </Link>

                <Link
                  href="/silicon-cave?tab=analytics"
                  className="flex items-center gap-3 p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                >
                  <BarChart3 className="text-purple-500" size={24} />
                  <div>
                    <p className="font-medium">View Analytics</p>
                    <p className="text-sm text-gray-400">Track performance</p>
                  </div>
                </Link>

                <Link
                  href="/monetization"
                  className="flex items-center gap-3 p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                >
                  <DollarSign className="text-green-500" size={24} />
                  <div>
                    <p className="font-medium">Monetization</p>
                    <p className="text-sm text-gray-400">Manage earnings</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Content</h2>
              <Link
                href="/upload"
                className="px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Upload New
              </Link>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <p className="text-gray-400 text-center py-8">
                Your videos will appear here. Start uploading to see your content library.
              </p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <h3 className="font-bold mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Watch Time</span>
                    <span className="font-medium">2:45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engagement Rate</span>
                    <span className="font-medium">4.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subscriber Growth</span>
                    <span className="font-medium text-green-500">+12%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
                <h3 className="font-bold mb-4">Top Performing Content</h3>
                <p className="text-gray-400 text-sm">
                  Analytics charts and top videos will appear here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Monetization Tab */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Monetization</h2>
              <Link
                href="/monetization"
                className="px-4 py-2 bg-crimson-500 rounded-lg font-medium hover:opacity-90"
              >
                Manage Monetization
              </Link>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <div className="mb-4">
                <p className="text-gray-400 mb-2">Total Earnings</p>
                <p className="text-3xl font-bold">{formatCurrency(analytics.totalEarnings)}</p>
              </div>
              <Link
                href="/wallet"
                className="inline-block px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90"
              >
                View Wallet
              </Link>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Management</h2>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <p className="text-gray-400">
                Manage comments, polls, and fan interactions will appear here
              </p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <p className="text-gray-400">Creator settings and preferences will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

