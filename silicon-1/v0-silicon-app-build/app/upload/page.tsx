'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Upload, Video, Image as ImageIcon, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/auth/AuthModal'

export default function UploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { requireAuth, authModalOpen, setAuthModalOpen, authAction } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    category: '',
    tags: '',
    contentType: 'video', // video, short, story
  })
  const [uploading, setUploading] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    requireAuth('upload')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!requireAuth('upload')) {
      return
    }

    setUploading(true)

    try {
      const endpoint =
        formData.contentType === 'video'
          ? '/api/videos'
          : formData.contentType === 'short'
          ? '/api/shorts'
          : '/api/stories'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((t) => t.trim()),
        }),
      })

      if (res.ok) {
        router.push('/silicon-cave?tab=content')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to upload')
      }
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Failed to upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
          Upload Content
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-4">Content Type</label>
            <div className="grid grid-cols-3 gap-4">
              {['video', 'short', 'story'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, contentType: type })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.contentType === type
                      ? 'border-crimson-500 bg-crimson-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Video className="mx-auto mb-2" size={24} />
                  <p className="text-sm capitalize">{type}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              rows={4}
            />
          </div>

          {/* Video Upload */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Upload file to storage
                  const uploadFormData = new FormData()
                  uploadFormData.append('video', file)
                  
                  try {
                    const res = await fetch('/api/upload/video', {
                      method: 'POST',
                      body: uploadFormData,
                    })
                    
                    if (res.ok) {
                      const data = await res.json()
                      setFormData({
                        ...formData,
                        videoUrl: data.videoUrl,
                        thumbnailUrl: data.thumbnailUrl || formData.thumbnailUrl,
                      })
                    } else {
                      alert('Failed to upload video. Please try again or use a video URL instead.')
                    }
                  } catch (error) {
                    console.error('Upload error:', error)
                    alert('Upload failed. You can also paste a video URL below.')
                  }
                }
              }}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-crimson-500 file:text-white hover:file:bg-crimson-600"
            />
            <p className="text-xs text-gray-400 mt-2">
              {formData.contentType === 'short'
                ? 'Max 60 seconds'
                : formData.contentType === 'story'
                ? 'Max 15 seconds'
                : 'Full length videos'}
            </p>
            
            {/* Alternative: Video URL */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-gray-400">
                Or paste a video URL
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
            <input
              type="url"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              >
                <option value="">Select category</option>
                <option value="gaming">Gaming</option>
                <option value="tech">Tech</option>
                <option value="music">Music</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="gaming, tech, review"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              'Uploading...'
            ) : (
              <>
                <Upload size={20} />
                Upload {formData.contentType.charAt(0).toUpperCase() + formData.contentType.slice(1)}
              </>
            )}
          </button>
        </form>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        action={authAction}
      />
    </div>
  )
}
