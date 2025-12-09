'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Settings, Video, Users, DollarSign, TrendingUp } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchUser()
    }
  }, [status, session, router])

  const fetchUser = async () => {
    try {
      // In production, fetch from API
      setUser({
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        followers: 850,
        following: 320,
        totalViews: 125000,
        totalLikes: 5400,
      })
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-[#1a1a1a] rounded-lg p-8 border border-gray-800 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || ''}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <span>{user.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name || 'User'}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-6 mb-6">
            <div>
              <p className="text-2xl font-bold">{formatNumber(user.followers)}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(user.following)}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(user.totalViews)}</p>
              <p className="text-sm text-gray-400">Total Views</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/silicon-cave"
              className="px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Silicon Cave
            </Link>
            <Link
              href="/monetization"
              className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors"
            >
              Monetization
            </Link>
            <Link
              href="/wallet"
              className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors"
            >
              Wallet
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
            <Video className="text-crimson-500 mb-2" size={24} />
            <p className="text-sm text-gray-400 mb-1">Videos</p>
            <p className="text-xl font-bold">12</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
            <Users className="text-purple-500 mb-2" size={24} />
            <p className="text-sm text-gray-400 mb-1">Followers</p>
            <p className="text-xl font-bold">{formatNumber(user.followers)}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
            <TrendingUp className="text-green-500 mb-2" size={24} />
            <p className="text-sm text-gray-400 mb-1">Growth</p>
            <p className="text-xl font-bold">+12%</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
            <DollarSign className="text-yellow-500 mb-2" size={24} />
            <p className="text-sm text-gray-400 mb-1">Earnings</p>
            <p className="text-xl font-bold">$1,250</p>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Your Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/silicon-cave?tab=content"
              className="p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              <Video className="text-crimson-500 mb-2" size={24} />
              <p className="font-medium">Videos</p>
              <p className="text-sm text-gray-400">Manage your videos</p>
            </Link>
            <Link
              href="/upload"
              className="p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              <Video className="text-purple-500 mb-2" size={24} />
              <p className="font-medium">Upload</p>
              <p className="text-sm text-gray-400">Create new content</p>
            </Link>
            <Link
              href="/silicon-ads"
              className="p-4 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              <DollarSign className="text-green-500 mb-2" size={24} />
              <p className="font-medium">Ads</p>
              <p className="text-sm text-gray-400">Manage ad campaigns</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

