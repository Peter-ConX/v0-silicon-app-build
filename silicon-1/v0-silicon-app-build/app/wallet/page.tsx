'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Wallet {
  id: string
  balance: number
  totalEarned: number
  totalWithdrawn: number
  transactions: Transaction[]
}

interface Transaction {
  id: string
  type: string
  amount: number
  status: string
  description: string
  createdAt: string
}

export default function WalletPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchWallet()
    }
  }, [status, router])

  const fetchWallet = async () => {
    try {
      const res = await fetch('/api/wallet')
      const data = await res.json()
      setWallet(data)
    } catch (error) {
      console.error('Error fetching wallet:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(depositAmount),
          paymentMethod: 'paystack',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // In production, redirect to payment gateway
        alert(`Redirecting to payment... ${data.paymentUrl}`)
        setShowDeposit(false)
        setDepositAmount('')
        fetchWallet()
      } else {
        alert(data.error || 'Failed to process deposit')
      }
    } catch (error) {
      console.error('Error processing deposit:', error)
      alert('Failed to process deposit')
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (!wallet || parseFloat(withdrawAmount) > wallet.balance) {
      alert('Insufficient balance')
      return
    }

    try {
      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(withdrawAmount),
          paymentMethod: 'paystack',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Withdrawal request submitted')
        setShowWithdraw(false)
        setWithdrawAmount('')
        fetchWallet()
      } else {
        alert(data.error || 'Failed to process withdrawal')
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error)
      alert('Failed to process withdrawal')
    }
  }

  if (loading || !wallet) {
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
          My Wallet
        </h1>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-crimson-500" size={24} />
              <span className="text-gray-400 text-sm">Balance</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(wallet.balance)}</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-gray-400 text-sm">Total Earned</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(wallet.totalEarned)}</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <ArrowUp className="text-purple-500" size={24} />
              <span className="text-gray-400 text-sm">Total Withdrawn</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(wallet.totalWithdrawn)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowDeposit(true)}
            className="flex-1 py-3 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <ArrowDown size={20} />
            Deposit
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="flex-1 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg font-medium hover:border-crimson-500 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowUp size={20} />
            Withdraw
          </button>
        </div>

        {/* Deposit Modal */}
        {showDeposit && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500 mb-4"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleDeposit}
                  className="flex-1 py-2 bg-crimson-500 rounded-lg font-medium hover:opacity-90"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowDeposit(false)
                    setDepositAmount('')
                  }}
                  className="flex-1 py-2 bg-gray-700 rounded-lg font-medium hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                max={wallet.balance}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500 mb-4"
              />
              <p className="text-sm text-gray-400 mb-4">
                Available: {formatCurrency(wallet.balance)}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 py-2 bg-crimson-500 rounded-lg font-medium hover:opacity-90"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => {
                    setShowWithdraw(false)
                    setWithdrawAmount('')
                  }}
                  className="flex-1 py-2 bg-gray-700 rounded-lg font-medium hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transactions */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {wallet.transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No transactions yet</p>
            ) : (
              wallet.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.type === 'deposit' || transaction.type === 'earning'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {transaction.type === 'deposit' || transaction.type === 'earning'
                        ? '+'
                        : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p
                      className={`text-xs ${
                        transaction.status === 'completed'
                          ? 'text-green-500'
                          : transaction.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
