'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Play,
  Users,
  History,
  Clock,
  Heart,
  Video,
  Download,
  Music,
  Gamepad2,
  Newspaper,
  Settings,
  DollarSign,
  TrendingUp,
  Trophy,
  Film,
  Radio,
  BookOpen,
  HelpCircle,
  Flag,
  Send,
  Shield,
  Youtube,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f0f] overflow-y-auto pt-16 pb-20 z-30">
      <div className="px-3 py-2">
        {/* Main Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
              isActive('/')
                ? 'bg-[#272727] text-white'
                : 'text-gray-300 hover:bg-[#272727]'
            }`}
          >
            <Home size={24} />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/shorts"
            className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
              isActive('/shorts')
                ? 'bg-[#272727] text-white'
                : 'text-gray-300 hover:bg-[#272727]'
            }`}
          >
            <Play size={24} />
            <span className="font-medium">Shorts</span>
          </Link>
        </div>

        {/* Silcs (Subscriptions) */}
        {mounted && session && (
          <div className="mb-6 border-t border-gray-800 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
              Silcs
            </h3>
            <div className="space-y-1">
              <Link
                href="/subscriptions"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Users size={24} />
                <span>Silcs</span>
              </Link>
            </div>
          </div>
        )}

        {/* You Section */}
        {mounted && session && (
          <div className="mb-6 border-t border-gray-800 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">You</h3>
            <div className="space-y-1">
              <Link
                href="/history"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <History size={24} />
                <span>History</span>
              </Link>
              <Link
                href="/playlists"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Clock size={24} />
                <span>Playlists</span>
              </Link>
              <Link
                href="/liked"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Heart size={24} />
                <span>Liked videos</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Video size={24} />
                <span>Your videos</span>
              </Link>
              <Link
                href="/downloads"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Download size={24} />
                <span>Downloads</span>
              </Link>
            </div>
          </div>
        )}

        {/* Explore */}
        <div className="mb-6 border-t border-gray-800 pt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">Explore</h3>
          <div className="space-y-1">
            <Link
              href="/explore/music"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Music size={24} />
              <span>Music</span>
            </Link>
            <Link
              href="/explore/gaming"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Gamepad2 size={24} />
              <span>Gaming</span>
            </Link>
            <Link
              href="/explore/news"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${
                isActive('/explore/news')
                  ? 'bg-[#272727] text-white'
                  : 'text-gray-300 hover:bg-[#272727]'
              }`}
            >
              <Newspaper size={24} />
              <span>News</span>
            </Link>
            <Link
              href="/explore/sports"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Trophy size={24} />
              <span>Sports</span>
            </Link>
            <Link
              href="/explore/movies"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Film size={24} />
              <span>Movies & TV</span>
            </Link>
            <Link
              href="/explore/podcasts"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Radio size={24} />
              <span>Podcasts</span>
            </Link>
            <Link
              href="/explore/learning"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <BookOpen size={24} />
              <span>Learning</span>
            </Link>
          </div>
        </div>

        {/* More from Silicon */}
        {mounted && (
          <div className="mb-6 border-t border-gray-800 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
              More from Silicon
            </h3>
            <div className="space-y-1">
              <Link
                href="/premium"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <Youtube size={24} />
                <span>Silicon Premium</span>
              </Link>
              <Link
                href="/silicon-cave"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <TrendingUp size={24} />
                <span>Silicon Cave</span>
              </Link>
            </div>
          </div>
        )}

        {/* Settings & Help */}
        <div className="border-t border-gray-800 pt-4">
          <div className="space-y-1">
            <Link
              href="/settings"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Settings size={24} />
              <span>Settings</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <HelpCircle size={24} />
              <span>Help</span>
            </Link>
            <Link
              href="/feedback"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Send size={24} />
              <span>Send feedback</span>
            </Link>
            <Link
              href="/report"
              className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
            >
              <Flag size={24} />
              <span>Report</span>
            </Link>
          </div>
        </div>

        {/* Creator Tools */}
        {mounted && session && (
          <div className="mb-6 border-t border-gray-800 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
              Creator Tools
            </h3>
            <div className="space-y-1">
              <Link
                href="/silicon-cave"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <TrendingUp size={24} />
                <span>Silicon Cave</span>
              </Link>
              <Link
                href="/silicon-ads"
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
              >
                <DollarSign size={24} />
                <span>Silicon Ads</span>
              </Link>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="border-t border-gray-800 pt-4">
          <Link
            href="/settings"
            className="flex items-center gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#272727] transition-colors"
          >
            <Settings size={24} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}

