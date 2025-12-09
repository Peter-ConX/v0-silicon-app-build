'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserPlus, Users, MessageCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'
import Link from 'next/link'

interface User {
  id: string
  name: string
  username: string
  image?: string
  followers: number
  following: number
  isFollowing?: boolean
}

export default function ConnectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { requireAuth, authModalOpen, setAuthModalOpen, authAction } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUsers()
    } else {
      setLoading(false)
    }
  }, [status])

  const fetchUsers = async () => {
    try {
      // In production, fetch from API
      // For now, using mock data
      setUsers([
        {
          id: '1',
          name: 'Creator One',
          username: 'creator1',
          followers: 1200,
          following: 450,
          isFollowing: false,
        },
        {
          id: '2',
          name: 'Creator Two',
          username: 'creator2',
          followers: 850,
          following: 320,
          isFollowing: true,
        },
      ])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async (userId: string) => {
    if (requireAuth('follow', () => handleFollowAction(userId))) {
      handleFollowAction(userId)
    }
  }

  const handleFollowAction = async (userId: string) => {
    try {
      const res = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  isFollowing: data.following,
                  followers: data.following
                    ? user.followers + 1
                    : user.followers - 1,
                }
              : user
          )
        )
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
          Connect
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <Users className="text-crimson-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Discover Creators</h3>
            <p className="text-sm text-gray-400">
              Find and follow creators you love
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <UserPlus className="text-purple-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Build Your Network</h3>
            <p className="text-sm text-gray-400">
              Connect with other creators and fans
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <MessageCircle className="text-green-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Start Conversations</h3>
            <p className="text-sm text-gray-400">
              Message creators and engage with your community
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {user.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{user.followers} followers</span>
                    <span>{user.following} following</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    user.isFollowing
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gradient-to-r from-crimson-500 to-purple-500 hover:opacity-90'
                  }`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
                <Link
                  href={`/messages?userId=${user.id}`}
                  className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors"
                >
                  Message
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        action={authAction}
      />
    </div>
  )
}

