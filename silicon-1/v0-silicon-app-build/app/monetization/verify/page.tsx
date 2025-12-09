'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Upload, Check } from 'lucide-react'

export default function VerifyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    governmentId: '',
    phoneNumber: '',
    payoutMethod: 'paystack',
    payoutDetails: {
      accountNumber: '',
      bankName: '',
      accountName: '',
    },
  })
  const [submitting, setSubmitting] = useState(false)

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/monetization/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/monetization?verified=pending')
      } else {
        alert(data.error || 'Failed to submit verification')
      }
    } catch (error) {
      console.error('Error submitting verification:', error)
      alert('Failed to submit verification')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
          Creator Verification
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Government ID */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">
              Government ID
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <Upload className="mx-auto mb-4 text-gray-400" size={32} />
              <p className="text-sm text-gray-400 mb-2">
                Upload a clear photo of your government-issued ID
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // In production, upload to secure storage
                    setFormData({ ...formData, governmentId: file.name })
                  }
                }}
                className="hidden"
                id="governmentId"
              />
              <label
                htmlFor="governmentId"
                className="inline-block px-4 py-2 bg-crimson-500 rounded-lg cursor-pointer hover:opacity-90"
              >
                Choose File
              </label>
              {formData.governmentId && (
                <p className="mt-2 text-sm text-green-500">
                  {formData.governmentId} selected
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="+1234567890"
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
              required
            />
            <p className="mt-2 text-xs text-gray-400">
              We'll send a verification code to this number
            </p>
          </div>

          {/* Payout Method */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <label className="block text-sm font-medium mb-4">
              Payout Method
            </label>
            <select
              value={formData.payoutMethod}
              onChange={(e) =>
                setFormData({ ...formData, payoutMethod: e.target.value })
              }
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
            >
              <option value="paystack">Paystack</option>
              <option value="stripe">Stripe</option>
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          {/* Payout Details */}
          {formData.payoutMethod === 'bank' && (
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.payoutDetails.accountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payoutDetails: {
                        ...formData.payoutDetails,
                        accountNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.payoutDetails.bankName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payoutDetails: {
                        ...formData.payoutDetails,
                        bankName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.payoutDetails.accountName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payoutDetails: {
                        ...formData.payoutDetails,
                        accountName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              'Submitting...'
            ) : (
              <>
                <Check size={20} />
                Submit Verification
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

