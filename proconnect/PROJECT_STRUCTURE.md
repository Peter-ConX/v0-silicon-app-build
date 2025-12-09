# ProConnect Project Structure

## Overview
ProConnect is a full-stack networking platform built with Next.js 14, TypeScript, Prisma, and Socket.IO.

## Directory Structure

\`\`\`
proconnect/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── chat/                 # Chat endpoints
│   │   ├── connections/          # Follow/unfollow endpoints
│   │   ├── ai/                   # AI features endpoints
│   │   ├── profile/              # Profile management
│   │   ├── notifications/        # Notifications
│   │   └── projects/             # Project management
│   ├── about/                    # About page
│   ├── chat/                     # Chat page
│   ├── connect/                  # Connect/Networking page
│   ├── dashboard/                # User dashboard
│   ├── features/                 # Features page
│   ├── library/                  # Library/Books page
│   ├── login/                    # Login page
│   ├── profile/                  # Profile page
│   ├── settings/                 # Settings page
│   ├── signup/                   # Signup page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── developer/                # Developer tools components
│   ├── layout/                   # Layout components (Sidebar, etc.)
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility libraries
│   ├── ai.ts                     # AI helper functions
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   ├── redis.ts                  # Redis client & helpers
│   ├── socket-client.ts          # Socket.IO client helpers
│   └── utils.ts                  # General utilities
├── prisma/                       # Prisma schema
│   └── schema.prisma             # Database schema
├── server/                       # Server-side code
│   ├── socket.ts                 # Socket.IO server setup
│   └── index.ts                  # Server entry point (if needed)
├── store/                        # Zustand stores
│   ├── useAuthStore.ts           # Auth state
│   └── useChatStore.ts           # Chat state
├── types/                        # TypeScript types
│   └── next-auth.d.ts            # NextAuth type extensions
├── middleware.ts                 # Next.js middleware
├── docker-compose.yml             # Docker Compose config
├── Dockerfile                     # Docker configuration
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
\`\`\`

## Key Features

### Authentication
- NextAuth.js with multiple providers (GitHub, Google, Twitter)
- Email/password authentication
- JWT sessions
- 2FA support (structure in place)

### Database
- PostgreSQL with Prisma ORM
- Models: User, Profile, Follow, Conversation, Message, Notification, Activity, Book, Project

### Real-time Features
- Socket.IO for real-time chat
- Presence tracking with Redis
- Typing indicators
- Read receipts

### AI Features
- Bio generation
- Connection suggestions
- Chat summarization
- Career advice

### Developer Tools
- Code sharing component
- Markdown editor
- Project showcase

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.example`)
3. Start Docker services: `docker-compose up -d`
4. Run database migrations: `npm run db:push`
5. Start development server: `npm run dev`

## Deployment

The project is configured for deployment on:
- Vercel (recommended for Next.js)
- Railway
- Render
- DigitalOcean
- Any platform supporting Docker

See `Dockerfile` and `docker-compose.yml` for containerization setup.
