import { create } from 'zustand'

export interface Message {
  id: string
  content: string
  senderId: string
  receiverId?: string
  conversationId: string
  type: 'text' | 'image' | 'file' | 'code' | 'voice'
  fileUrl?: string
  fileName?: string
  read: boolean
  createdAt: Date
}

export interface Conversation {
  id: string
  type: 'direct' | 'group'
  name?: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
}

interface ChatState {
  conversations: Conversation[]
  activeConversation: string | null
  messages: Record<string, Message[]>
  typingUsers: Record<string, Set<string>>
  setConversations: (conversations: Conversation[]) => void
  setActiveConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  addMessage: (conversationId: string, message: Message) => void
  setTyping: (conversationId: string, userId: string, isTyping: boolean) => void
  markAsRead: (conversationId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversation: null,
  messages: {},
  typingUsers: {},
  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (id) => set({ activeConversation: id }),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),
  setTyping: (conversationId, userId, isTyping) =>
    set((state) => {
      const typing = state.typingUsers[conversationId] || new Set()
      if (isTyping) {
        typing.add(userId)
      } else {
        typing.delete(userId)
      }
      return {
        typingUsers: {
          ...state.typingUsers,
          [conversationId]: typing,
        },
      }
    }),
  markAsRead: (conversationId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((msg) =>
          msg.read ? msg : { ...msg, read: true }
        ),
      },
    })),
}))

