'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Upload, Play, TrendingUp, Eye, MousePointerClick, DollarSign } from 'lucide-react'
import { formatNumber, formatCurrency } from '@/lib/utils'

interface AdCampaign {
  id: string
  title: string
  adVideoUrl: string
  duration: number
  budget: number
  spent: number
  impressions: number
  clicks: number
  watchThroughRate: number
  status: string
  createdAt: string
}

export default function SiliconAdsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    adVideoUrl: '',
    thumbnailUrl: '',
    duration: 15,
    budget: 10,
    targetDemographics: '',
    targetInterests: '',
    targetCategories: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchCampaigns()
    }
  }, [status, router])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/ads/campaigns')
      if (res.ok) {
        const data = await res.json()
        setCampaigns(data.campaigns || [])
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.duration !== 15 && formData.duration !== 30) {
      alert('Ad duration must be 15 or 30 seconds')
      return
    }

    if (formData.duration === 15 && formData.budget < 10) {
      alert('Minimum payment for 15-second ad is $10')
      return
    }

    if (formData.duration === 30 && formData.budget < 20) {
      alert('Minimum payment for 30-second ad is $20')
      return
    }

    try {
      const res = await fetch('/api/ads/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setShowUpload(false)
        setFormData({
          title: '',
          description: '',
          adVideoUrl: '',
          thumbnailUrl: '',
          duration: 15,
          budget: 10,
          targetDemographics: '',
          targetInterests: '',
          targetCategories: '',
        })
        fetchCampaigns()
      } else {
        alert(data.error || 'Failed to create campaign')
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Failed to create campaign')
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg flex items-center justify-center font-bold">
                S
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
                Silicon Ads
              </h1>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Upload size={20} />
              Upload Ad
            </button>
          </div>
          <p className="text-gray-400">Manage your video ad campaigns</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Play className="text-crimson-500" size={24} />
              <span className="text-gray-400 text-sm">Active Campaigns</span>
            </div>
            <p className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="text-purple-500" size={24} />
              <span className="text-gray-400 text-sm">Total Impressions</span>
            </div>
            <p className="text-2xl font-bold">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.impressions, 0))}
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <MousePointerClick className="text-green-500" size={24} />
              <span className="text-gray-400 text-sm">Total Clicks</span>
            </div>
            <p className="text-2xl font-bold">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.clicks, 0))}
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-yellow-500" size={24} />
              <span className="text-gray-400 text-sm">Total Spent</span>
            </div>
            <p className="text-2xl font-bold">
              {formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0))}
            </p>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-lg p-12 border border-gray-800 text-center">
              <p className="text-gray-400 mb-4">No ad campaigns yet</p>
              <button
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90"
              >
                Create Your First Campaign
              </button>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{campaign.duration}s ad</span>
                      <span
                        className={`px-2 py-1 rounded ${
                          campaign.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : campaign.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-gray-500/20 text-gray-500'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Budget</p>
                    <p className="font-bold">{formatCurrency(campaign.budget)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Impressions</p>
                    <p className="font-medium">{formatNumber(campaign.impressions)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Clicks</p>
                    <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Watch-Through</p>
                    <p className="font-medium">{(campaign.watchThroughRate * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Spent</p>
                    <p className="font-medium">{formatCurrency(campaign.spent)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-2xl border border-gray-800 my-8">
              <h2 className="text-2xl font-bold mb-6">Create Ad Campaign</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <input
                    type="url"
                    value={formData.adVideoUrl}
                    onChange={(e) => setFormData({ ...formData, adVideoUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                    <select
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value),
                          budget: parseInt(e.target.value) === 15 ? 10 : 20,
                        })
                      }
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                    >
                      <option value={15}>15 seconds ($10 minimum)</option>
                      <option value={30}>30 seconds ($20 minimum)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Budget</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: parseFloat(e.target.value) })
                      }
                      min={formData.duration === 15 ? 10 : 20}
                      step="0.01"
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Target Categories (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.targetCategories}
                    onChange={(e) =>
                      setFormData({ ...formData, targetCategories: e.target.value })
                    }
                    placeholder="gaming, tech, music"
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90"
                  >
                    Create Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="flex-1 py-2 bg-gray-700 rounded-lg font-medium hover:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
