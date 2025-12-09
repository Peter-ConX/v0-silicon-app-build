"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Lock, Heart } from "lucide-react"

export default function ReportPage() {
  const [reportType, setReportType] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const reportTypes = [
    {
      id: "harassment",
      title: "Harassment & Bullying",
      icon: "😠",
      description: "Content targeting individuals or groups with hate or harassment",
    },
    {
      id: "misinformation",
      title: "Misinformation",
      icon: "⚠️",
      description: "False or misleading information that could cause harm",
    },
    {
      id: "spam",
      title: "Spam & Scams",
      icon: "🚫",
      description: "Suspicious links, fake giveaways, or suspicious behavior",
    },
    {
      id: "sexual",
      title: "Sexual Content",
      icon: "🔞",
      description: "Inappropriate sexual or adult content",
    },
    {
      id: "violence",
      title: "Violence & Harm",
      icon: "⚔️",
      description: "Content promoting violence or dangerous behavior",
    },
    {
      id: "fake-account",
      title: "Fake Account",
      icon: "🆔",
      description: "Impersonation or fraudulent account",
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setReportType("")
      setDescription("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Header */}
      <div className="border-b border-purple-900/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-purple-400" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Report Center</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold text-white">Help Keep Silicon Safe</h2>
          </div>
          <p className="text-lg text-purple-300">
            Report inappropriate content, fake accounts, or harmful behavior to help us maintain a safe community for
            everyone.
          </p>
        </div>

        {/* Report Types */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">What would you like to report?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-6 rounded-lg text-left transition-all duration-300 border ${
                  reportType === type.id
                    ? "border-red-500 bg-red-900/20"
                    : "border-purple-900/30 bg-purple-900/10 hover:border-purple-700/50 hover:bg-purple-900/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{type.icon}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">{type.title}</h4>
                    <p className="text-sm text-purple-300">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Form */}
        {reportType && (
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-900/30 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Report Details</h3>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Creator or Content URL (optional)</label>
              <input
                type="text"
                placeholder="Enter the profile or content link..."
                className="w-full bg-black/50 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed information about the report..."
                className="w-full bg-black/50 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 resize-none h-32"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              Submit Report
            </button>
          </form>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-600/50 rounded-lg p-6 mb-8 text-center">
            <p className="text-green-400 font-semibold">✓ Report submitted successfully</p>
            <p className="text-green-300 text-sm mt-2">Our team will review your report and take appropriate action.</p>
          </div>
        )}

        {/* Safety Tips */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
              <h4 className="text-lg font-bold text-white">Protect Yourself</h4>
            </div>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>• Keep your password strong and unique</li>
              <li>• Don't share personal information</li>
              <li>• Enable two-factor authentication</li>
              <li>• Report suspicious activity immediately</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border border-pink-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h4 className="text-lg font-bold text-white">Community Guidelines</h4>
            </div>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>• Be respectful to all community members</li>
              <li>• Don't harass or bully others</li>
              <li>• Share only authentic content</li>
              <li>• Report violations to moderators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
