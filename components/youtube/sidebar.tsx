"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Play, Clock, ThumbsUp, BarChart3, Settings, HelpCircle, Music, Gamepad2, Newspaper } from "lucide-react"

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  const mainItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Play, label: "Shorts", href: "/shorts" },
    { icon: BarChart3, label: "Subscriptions", href: "/subscriptions" },
  ]

  const yourItems = [
    { icon: Clock, label: "History", href: "/history" },
    { icon: ThumbsUp, label: "Liked videos", href: "/liked" },
  ]

  const exploreItems = [
    { icon: Music, label: "Music", href: "/music" },
    { icon: Gamepad2, label: "Gaming", href: "/gaming" },
    { icon: Newspaper, label: "News", href: "/news" },
  ]

  const isActive = (href: string) => pathname === href

  if (!open) {
    return (
      <div className="w-20 bg-black border-r border-gray-800 flex flex-col items-center py-4 gap-8">
        {mainItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-3 rounded-lg transition-colors ${isActive(item.href) ? "bg-gray-900" : "hover:bg-gray-900"}`}
            title={item.label}
          >
            <item.icon className="w-6 h-6 text-white" />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="w-64 bg-black border-r border-gray-800 overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-white font-bold text-xl">Silicon</span>
      </div>

      {/* Main Navigation */}
      <div className="px-4 space-y-2">
        {mainItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href) ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white hover:bg-gray-900"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="px-4 my-4 border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500 px-4 mb-3 font-bold">YOU</p>
        <div className="space-y-2">
          {yourItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href) ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white hover:bg-gray-900"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 my-4 border-t border-gray-800 pt-4 flex-1">
        <p className="text-xs text-gray-500 px-4 mb-3 font-bold">EXPLORE</p>
        <div className="space-y-2">
          {exploreItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href) ? "bg-gray-900 text-white" : "text-gray-300 hover:text-white hover:bg-gray-900"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-gray-800 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Settings className="w-6 h-6" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="font-medium">Help</span>
        </Link>
      </div>
    </div>
  )
}
