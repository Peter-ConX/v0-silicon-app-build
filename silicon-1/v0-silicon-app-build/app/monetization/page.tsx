'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Upload, CreditCard, Shield } from 'lucide-react'
import Link from 'next/link'

interface EligibilityData {
  eligible: boolean
  monetized: boolean
  verified: boolean
  followers: number
  requiredFollowers: number
  creatorProfile?: {
    verificationStatus: string
  }
}

export default function MonetizationPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [eligibility, setEligibility] = useState<EligibilityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchEligibility()
    }
  }, [status, router])

  const fetchEligibility = async () => {
    try {
      const res = await fetch('/api/monetization/check-eligibility')
      const data = await res.json()
      setEligibility(data)
    } catch (error) {
      console.error('Error fetching eligibility:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnableMonetization = async () => {
    try {
      const res = await fetch('/api/monetization/enable', {
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/monetization/verify')
      } else {
        alert(data.error || 'Failed to enable monetization')
      }
    } catch (error) {
      console.error('Error enabling monetization:', error)
      alert('Failed to enable monetization')
    }
  }

  if (loading || !eligibility) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
          Creator Monetization
        </h1>

        {/* Eligibility Status */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            {eligibility.eligible ? (
              <CheckCircle className="text-green-500" size={32} />
            ) : (
              <XCircle className="text-gray-500" size={32} />
            )}
            <div>
              <h2 className="text-xl font-bold">
                {eligibility.eligible
                  ? 'You\'re Eligible for Monetization!'
                  : 'Not Yet Eligible'}
              </h2>
              <p className="text-gray-400">
                {eligibility.followers} / {eligibility.requiredFollowers} followers
              </p>
            </div>
          </div>

          {!eligibility.eligible && (
            <div className="bg-black/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                You need {eligibility.requiredFollowers - eligibility.followers} more followers
                to enable monetization. Keep creating great content!
              </p>
            </div>
          )}
        </div>

        {/* Monetization Status */}
        {eligibility.eligible && (
          <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">Monetization Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Verification</span>
                <span
                  className={
                    eligibility.verified
                      ? 'text-green-500'
                      : eligibility.creatorProfile?.verificationStatus === 'pending'
                      ? 'text-yellow-500'
                      : 'text-gray-500'
                  }
                >
                  {eligibility.verified
                    ? 'Verified'
                    : eligibility.creatorProfile?.verificationStatus === 'pending'
                    ? 'Pending Review'
                    : 'Not Verified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Monetization</span>
                <span className={eligibility.monetized ? 'text-green-500' : 'text-gray-500'}>
                  {eligibility.monetized ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {eligibility.eligible && !eligibility.monetized && (
          <div className="space-y-4">
            {eligibility.creatorProfile?.verificationStatus !== 'pending' && (
              <button
                onClick={handleEnableMonetization}
                className="w-full py-3 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Enable Monetization
              </button>
            )}

            {eligibility.creatorProfile?.verificationStatus === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-500 text-sm">
                  Your verification is under review. We'll notify you once it's complete.
                </p>
              </div>
            )}

            {!eligibility.verified && eligibility.creatorProfile?.verificationStatus !== 'pending' && (
              <Link
                href="/monetization/verify"
                className="block w-full py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors text-center"
              >
                Complete Verification
              </Link>
            )}
          </div>
        )}

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <Upload className="text-crimson-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Ad Revenue</h3>
            <p className="text-sm text-gray-400">
              Earn from ads shown on your videos, shorts, and stories
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <CreditCard className="text-purple-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Multiple Payouts</h3>
            <p className="text-sm text-gray-400">
              Get paid via bank, Paystack, Stripe, or crypto
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <Shield className="text-green-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Secure & Verified</h3>
            <p className="text-sm text-gray-400">
              Your identity is verified for secure transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
