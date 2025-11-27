# ProConnect

A world-class networking platform built specifically for tech-savvy people including software engineers, founders, AI/ML researchers, data scientists, designers, product managers, DevOps, security analysts, and creators.

## 🚀 Features

- **Authentication**: Email, OAuth (GitHub, Google, Twitter), 2FA
- **User Dashboard**: Profile, skills, tech stack, activity feed
- **Connect**: Networking system with AI-suggested connections
- **Real-time Chat**: Socket.IO powered chat with typing indicators, read receipts
- **AI Features**: Bio generation, connection suggestions, chat summarization
- **Developer Tools**: Code sharing, markdown support, project showcase
- **Library**: Book tracking and recommendations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Shadcn/UI, Zustand, Framer Motion
- **Backend**: Next.js API Routes, Express, Socket.IO
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Auth**: NextAuth.js

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start Docker services (PostgreSQL and Redis):
```bash
docker-compose up -d
```

5. Set up the database:
```bash
npm run db:generate
npm run db:push
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker

The project includes Docker Compose configuration for PostgreSQL and Redis. Start them with:

```bash
docker-compose up -d
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📄 License

MIT

