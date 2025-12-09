'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Paperclip, Users } from 'lucide-react'
import { useChatStore, Message } from '@/store/useChatStore'
import { formatRelativeTime } from '@/lib/utils'
import { io, Socket } from 'socket.io-client'

export function ChatClient() {
  const { data: session } = useSession()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState<any[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!session?.user?.id) return

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      auth: { userId: session.user.id },
    })

    newSocket.on('connect', () => {
      console.log('Connected to chat server')
    })

    newSocket.on('message', (data: Message) => {
      setMessages((prev) => ({
        ...prev,
        [data.conversationId]: [...(prev[data.conversationId] || []), data],
      }))
    })

    newSocket.on('typing', ({ conversationId, userId, isTyping }) => {
      // Handle typing indicators
    })

    setSocket(newSocket)

    // Load conversations
    fetch('/api/chat/conversations')
      .then((res) => res.json())
      .then((data) => {
        setConversations(data)
        if (data.length > 0 && !activeConversation) {
          setActiveConversation(data[0].id)
        }
      })

    return () => {
      newSocket.close()
    }
  }, [session])

  useEffect(() => {
    if (activeConversation) {
      fetch(`/api/chat/messages?conversationId=${activeConversation}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages((prev) => ({ ...prev, [activeConversation]: data }))
        })
    }
  }, [activeConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages[activeConversation || '']])

  const handleSend = async () => {
    if (!message.trim() || !activeConversation || !socket) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      senderId: session?.user?.id || '',
      conversationId: activeConversation,
      type: 'text',
      read: false,
      createdAt: new Date(),
    }

    socket.emit('sendMessage', newMessage)
    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMessage],
    }))
    setMessage('')
  }

  const activeMessages = activeConversation ? messages[activeConversation] || [] : []

  return (
    <div className="flex-1 flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`p-4 border-b cursor-pointer hover:bg-accent ${
                activeConversation === conv.id ? 'bg-accent' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {conv.name?.charAt(0).toUpperCase() || 'C'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{conv.name || 'Conversation'}</p>
                  {conv.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map((msg) => {
                const isOwn = msg.senderId === session?.user?.id
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {isOwn
                            ? session?.user?.name?.charAt(0).toUpperCase() || 'U'
                            : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`space-y-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-card">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                />
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
