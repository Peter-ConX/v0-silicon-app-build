'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Mic, Menu, Plus, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Logo } from './Logo'

export function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] z-40 flex items-center px-4 border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-4 mr-6">
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
          <Menu size={20} className="text-white" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-white hidden sm:block">Silicon</span>
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full h-10 pl-4 pr-10 bg-[#121212] border border-gray-800 rounded-l-full focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-[#272727] rounded-full transition-colors"
            >
              <Search size={18} className="text-gray-400" />
            </button>
          </div>
          <button
            type="button"
            className="h-10 w-10 bg-[#272727] border border-l-0 border-gray-800 rounded-r-full hover:bg-[#3f3f3f] transition-colors flex items-center justify-center"
          >
            <Mic size={18} className="text-white" />
          </button>
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-4">
        {mounted && session ? (
          <>
            <Link
              href="/upload"
              className="p-2 hover:bg-[#272727] rounded-full transition-colors"
            >
              <Plus size={20} className="text-white" />
            </Link>
            <Link
              href="/notifications"
              className="p-2 hover:bg-[#272727] rounded-full transition-colors relative"
            >
              <Bell size={20} className="text-white" />
            </Link>
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || ''}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User size={18} className="text-white" />
              )}
            </Link>
          </>
        ) : (
          <Link
            href="/auth/signin"
            className="px-4 py-1.5 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}

