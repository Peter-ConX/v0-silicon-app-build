'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Search,
  Briefcase,
  Users,
  MessageSquare,
  Bell,
  User,
  Wrench,
  Trophy,
  Target,
  Handshake,
  GraduationCap,
  Activity,
  Mail,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Search },
  { href: '/showcase', label: 'Showcase', icon: Trophy },
  { href: '/missions', label: 'Missions', icon: Target },
  { href: '/build', label: 'Build', icon: Wrench },
  { href: '/co-lab', label: 'Co-Lab', icon: Handshake },
  { href: '/mentorship', label: 'Mentorship', icon: GraduationCap },
  { href: '/pulse', label: 'Pulse', icon: Activity },
  { href: '/inbox', label: 'Inbox', icon: Mail },
  { href: '/profile', label: 'Profile', icon: User },
]

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-orange-50 border-b border-blue-100/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Proconnect
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side - Search & Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm w-64 bg-transparent"
              />
            </div>
            <ThemeToggle />
            {session ? (
              <Link href="/profile">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
