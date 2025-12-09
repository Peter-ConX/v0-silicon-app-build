"use client"

import { Menu, Search, Upload, Bell } from "lucide-react"
import Link from "next/link"

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6 gap-4">
      {/* Left: Menu */}
      <button onClick={onMenuClick} className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Center: Search */}
      <div className="flex-1 max-w-96">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-full border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <Link
          href="/upload"
          className="p-2 hover:bg-gray-900 rounded-lg transition-colors flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <Upload className="w-6 h-6" />
        </Link>
        <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
          <Bell className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>
        <Link href="/profile" className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
        </Link>
      </div>
    </div>
  )
}
