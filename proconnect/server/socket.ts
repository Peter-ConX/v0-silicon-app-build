import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'

export function initializeSocket(server: HTTPServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.use(async (socket, next) => {
    const userId = socket.handshake.auth.userId
    if (!userId) {
      return next(new Error('Authentication error'))
    }
    socket.data.userId = userId
    next()
  })

  io.on('connection', async (socket) => {
    const userId = socket.data.userId

    // Set user presence
    await redis.setex(`presence:${userId}`, 300, 'online')
    socket.broadcast.emit('userOnline', { userId })

    // Join user's room
    socket.join(`user:${userId}`)

    // Join conversation rooms
    socket.on('joinConversation', async (conversationId: string) => {
      socket.join(`conversation:${conversationId}`)
    })

    // Handle sending messages
    socket.on('sendMessage', async (messageData: any) => {
      try {
        // Save message to database
        const message = await prisma.message.create({
          data: {
            conversationId: messageData.conversationId,
            senderId: userId,
            receiverId: messageData.receiverId,
            content: messageData.content,
            type: messageData.type || 'text',
            fileUrl: messageData.fileUrl,
            fileName: messageData.fileName,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        })

        // Update conversation
        await prisma.conversation.update({
          where: { id: messageData.conversationId },
          data: { updatedAt: new Date() },
        })

        // Emit to conversation room
        io.to(`conversation:${messageData.conversationId}`).emit('message', message)

        // Emit to receiver if direct message
        if (messageData.receiverId) {
          io.to(`user:${messageData.receiverId}`).emit('newMessage', message)
        }
      } catch (error) {
        console.error('Error sending message:', error)
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Handle typing indicators
    socket.on('typing', ({ conversationId, isTyping }: { conversationId: string; isTyping: boolean }) => {
      socket.to(`conversation:${conversationId}`).emit('typing', {
        conversationId,
        userId,
        isTyping,
      })
    })

    // Handle read receipts
    socket.on('markAsRead', async (conversationId: string) => {
      try {
        await prisma.message.updateMany({
          where: {
            conversationId,
            receiverId: userId,
            read: false,
          },
          data: {
            read: true,
            readAt: new Date(),
          },
        })

        socket.to(`conversation:${conversationId}`).emit('messagesRead', {
          conversationId,
          userId,
        })
      } catch (error) {
        console.error('Error marking as read:', error)
      }
    })

    // Handle disconnect
    socket.on('disconnect', async () => {
      await redis.setex(`presence:${userId}`, 60, 'offline')
      socket.broadcast.emit('userOffline', { userId })
    })

    // Refresh presence
    const presenceInterval = setInterval(async () => {
      await redis.setex(`presence:${userId}`, 300, 'online')
    }, 60000) // Every minute

    socket.on('disconnect', () => {
      clearInterval(presenceInterval)
    })
  })

  return io
}
