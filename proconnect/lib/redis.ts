import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

redis.on('error', (err) => {
  console.error('Redis Client Error', err)
})

export default redis

// Presence tracking helpers
export async function setUserPresence(userId: string, status: 'online' | 'offline') {
  await redis.setex(`presence:${userId}`, 300, status) // 5 minute TTL
}

export async function getUserPresence(userId: string): Promise<'online' | 'offline' | null> {
  const status = await redis.get(`presence:${userId}`)
  return status as 'online' | 'offline' | null
}

export async function refreshUserPresence(userId: string) {
  await redis.setex(`presence:${userId}`, 300, 'online')
}
