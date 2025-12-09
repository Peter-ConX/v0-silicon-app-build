// Socket.IO client helper
// This will be used when Socket.IO is integrated with Next.js API routes

export function getSocketUrl(): string {
  if (typeof window === 'undefined') {
    return ''
  }
  return process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin
}
