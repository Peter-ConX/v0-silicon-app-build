"use client"

import { useState } from "react"
import Sidebar from "@/components/youtube/sidebar"
import TopBar from "@/components/youtube/top-bar"
import VideoGrid from "@/components/youtube/video-grid"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Video Grid */}
        <div className="flex-1 overflow-y-auto">
          <VideoGrid />
        </div>
      </div>
    </div>
  )
}
