import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    '/home/:path*',
    '/build/:path*',
    '/discover/:path*',
    '/showcase/:path*',
    '/missions/:path*',
    '/co-lab/:path*',
    '/mentorship/:path*',
    '/pulse/:path*',
    '/inbox/:path*',
    '/profile/:path*',
  ],
}

