'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  createdAt: string
  sender: {
    id: string
    name: string
    username: string
    image?: string
  }
  receiver: {
    id: string
    name: string
    username: string
    image?: string
  }
}

interface Conversation {
  user: {
    id: string
    name: string
    username: string
    image?: string
  }
  lastMessage: Message
  unread: number
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      if (userId) {
        fetchMessages(userId)
      } else {
        fetchConversations()
      }
    }
  }, [status, router, userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/messages')
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations || [])
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (targetUserId: string) => {
    try {
      const res = await fetch(`/api/messages?userId=${targetUserId}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !userId) return

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: userId,
          content: content.trim(),
        }),
      })

      if (res.ok) {
        const newMessage = await res.json()
        setMessages((prev) => [...prev, newMessage])
        setContent('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (userId) {
    // Show conversation view
    const otherUser = messages[0]?.sender.id === session?.user?.id
      ? messages[0]?.receiver
      : messages[0]?.sender

    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link
              href="/messages"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            {otherUser && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                  {otherUser.image ? (
                    <img
                      src={otherUser.image}
                      alt={otherUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {otherUser.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{otherUser.name}</p>
                  <p className="text-sm text-gray-400">@{otherUser.username}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender.id === session?.user?.id
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      isOwn
                        ? 'bg-gradient-to-r from-crimson-500 to-purple-500'
                        : 'bg-[#1a1a1a] border border-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-black/80 backdrop-blur-sm border-t border-gray-800 p-4">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:border-crimson-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Show conversations list
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-crimson-500 to-purple-500 bg-clip-text text-transparent">
          Messages
        </h1>

        <div className="space-y-2">
          {conversations.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-lg p-12 border border-gray-800 text-center">
              <p className="text-gray-400">No conversations yet</p>
              <Link
                href="/connect"
                className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-crimson-500 to-purple-500 rounded-lg font-medium hover:opacity-90"
              >
                Find People to Message
              </Link>
            </div>
          ) : (
            conversations.map((conv) => (
              <Link
                key={conv.user.id}
                href={`/messages?userId=${conv.user.id}`}
                className="block bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 hover:border-crimson-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-crimson-500 to-purple-500 flex items-center justify-center">
                    {conv.user.image ? (
                      <img
                        src={conv.user.image}
                        alt={conv.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <span className="text-white font-bold">
                        {conv.user.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{conv.user.name}</h3>
                      {conv.unread > 0 && (
                        <span className="bg-crimson-500 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {conv.lastMessage.content}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

