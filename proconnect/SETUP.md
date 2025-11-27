# ProConnect Setup Guide

## Prerequisites

- Node.js 20+ 
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional, for local development)

## Quick Start

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (e.g., `http://localhost:3000`)
- OAuth provider credentials (GitHub, Google, Twitter)
- `REDIS_URL` - Redis connection string
- `OPENAI_API_KEY` - For AI features (optional)

### 3. Database Setup

Start PostgreSQL and Redis with Docker:

```bash
docker-compose up -d
```

Or use your own PostgreSQL and Redis instances.

Generate Prisma Client:

```bash
npm run db:generate
```

Push schema to database:

```bash
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## OAuth Setup

### GitHub
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

### Google
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Client Secret to `.env`

### Twitter/X
1. Go to Twitter Developer Portal
2. Create an app and get API keys
3. Set callback URL: `http://localhost:3000/api/auth/callback/twitter`
4. Copy Client ID and Client Secret to `.env`

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t proconnect .
docker run -p 3000:3000 --env-file .env proconnect
```

### Railway/Render

1. Connect your GitHub repository
2. Add environment variables
3. Deploy

## Database Migrations

For production, use migrations:

```bash
npm run db:migrate
```

## Socket.IO Setup

For production, you may want to run Socket.IO as a separate service or integrate it with your deployment platform. The current setup includes Socket.IO server code in `server/socket.ts`.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/database`

### Redis Connection Issues
- Verify Redis is running
- Check `REDIS_URL` format: `redis://localhost:6379`

### Authentication Issues
- Verify OAuth credentials are correct
- Check callback URLs match your app URL
- Ensure `NEXTAUTH_SECRET` is set

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma Client: `npm run db:generate`

## Next Steps

1. Customize your profile
2. Add projects to showcase
3. Connect with other users
4. Explore AI features
5. Share code snippets
6. Build your network!

