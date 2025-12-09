'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { VideoCard } from '@/components/video/VideoCard'

// Mock data - in production, this would come from API
const mockVideos = [
  {
    id: '1',
    title: 'Amazing Tech Review - Latest Gadgets 2024',
    description: 'Check out this incredible new technology!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/DC2626/FFFFFF?text=Tech+Review',
    views: 125000,
    likes: 5400,
    comments: 230,
    duration: 325,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '1',
      name: 'Tech Creator',
      username: 'techcreator',
      image: '',
    },
  },
  {
    id: '2',
    title: 'Gaming Setup Tour - Ultimate Battle Station',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/9333EA/FFFFFF?text=Gaming+Setup',
    views: 89000,
    likes: 3200,
    comments: 145,
    duration: 1245,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '2',
      name: 'Gamer Pro',
      username: 'gamerpro',
      image: '',
    },
  },
  {
    id: '3',
    title: 'Music Production Tutorial - Make Beats Like a Pro',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/10B981/FFFFFF?text=Music+Production',
    views: 210000,
    likes: 8900,
    comments: 420,
    duration: 1820,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '3',
      name: 'Music Master',
      username: 'musicmaster',
      image: '',
    },
  },
  {
    id: '4',
    title: 'Cooking Challenge - 5 Minute Meals',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/F59E0B/FFFFFF?text=Cooking',
    views: 45000,
    likes: 2100,
    comments: 98,
    duration: 420,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '4',
      name: 'Chef Life',
      username: 'cheflife',
      image: '',
    },
  },
  {
    id: '5',
    title: 'Travel Vlog - Exploring Tokyo',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/EF4444/FFFFFF?text=Travel',
    views: 167000,
    likes: 7200,
    comments: 310,
    duration: 2150,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '5',
      name: 'Travel Diaries',
      username: 'traveldiaries',
      image: '',
    },
  },
  {
    id: '6',
    title: 'Fitness Routine - 30 Day Challenge',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180/8B5CF6/FFFFFF?text=Fitness',
    views: 78000,
    likes: 3400,
    comments: 156,
    duration: 980,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: '6',
      name: 'Fit Life',
      username: 'fitlife',
      image: '',
    },
  },
]

const filterButtons = [
  'All',
  'Podcasts',
  'News',
  'Music',
  'Gaming',
  'Tech',
  'Cooking',
  'Travel',
  'Fitness',
  'Live',
  'Mixes',
]

export default function HomePage() {
  const { data: session } = useSession()
  const [videos, setVideos] = useState(mockVideos)
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos?limit=20')
      if (res.ok) {
        const data = await res.json()
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos)
        }
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 mt-14 flex-1 p-4">
            <div className="text-white">Loading...</div>
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
          {/* Filter Buttons */}
          <div className="sticky top-14 z-20 bg-[#0f0f0f] px-4 py-3 border-b border-gray-800">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {filterButtons.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedFilter === filter
                      ? 'bg-white text-black'
                      : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading videos...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
