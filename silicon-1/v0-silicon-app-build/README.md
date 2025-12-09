# Silicon - Social Entertainment Platform

A full-stack social entertainment platform built with Next.js, featuring video content, monetization, creator tools, and AI-powered recommendations.

## Features

### 🎥 Core Features
- **Video Watching**: Watch videos, shorts, and stories without authentication
- **Conditional Authentication**: Auth popup only appears when users want to like, comment, or upload
- **Content Types**: Videos, Shorts (max 60s), Stories (max 15s, 24h expiry)

### 💰 Monetization System
- **Creator Eligibility**: 600 real followers required to enable monetization
- **Verification Process**: Government ID, phone verification, payout method setup
- **Ad Revenue**: Automatic ads on videos, shorts, and stories for monetized creators
- **Earnings Calculation**: Based on video views, watch time, and ad clicks

### 💳 Wallet System
- **User Wallets**: Every user has a wallet with balance tracking
- **Deposits**: Support for Paystack, Stripe, bank transfers, and crypto
- **Withdrawals**: Secure withdrawal system with multiple payment methods
- **Transaction History**: Complete record of all deposits, withdrawals, and earnings

### 🤖 Recommendation Algorithm
- **Content-Based Filtering**: Matches user search keywords with video metadata
- **Collaborative Filtering**: Finds similar users and suggests their content
- **Trending Boost**: Adds weight to popular videos
- **Personalization**: Adjusts over time based on user behavior

### 🏛️ Silicon Cave (Creator Hub)
- **Analytics Dashboard**: Views, engagement, follower growth, revenue
- **Content Management**: Upload, edit, and organize videos, shorts, stories
- **Monetization Tools**: Track earnings, manage ad settings
- **Community Management**: Comments, polls, fan interactions

### 📢 Silicon Ads Hub
- **Ad Campaigns**: Upload and manage video ads (15s or 30s)
- **Targeting**: Demographics, interests, categories
- **Analytics**: Impressions, clicks, watch-through rate
- **Compliance**: Automated review system for ad guidelines
- **Pricing**: $10 minimum for 15s ads, $20 for 30s ads

### 💬 Social Features
- **Follow System**: Follow/unfollow creators
- **Messaging**: Direct messages between users
- **Engagement**: Likes, comments, shares

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Prisma with SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Video Player**: React Player
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd v0-silicon-app-build
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your configuration:
\`\`\`
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PAYSTACK_PUBLIC_KEY=your-paystack-key
STRIPE_PUBLIC_KEY=your-stripe-key
\`\`\`

4. Set up the database:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── monetization/      # Monetization pages
│   ├── wallet/           # Wallet pages
│   ├── silicon-cave/      # Creator Hub
│   ├── silicon-ads/       # Ads Hub
│   ├── connect/          # Social connections
│   └── messages/         # Messaging
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── video/            # Video components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── prisma/               # Database schema
└── public/               # Static assets
\`\`\`

## Database Schema

The platform uses Prisma with a comprehensive schema including:
- Users, Accounts, Sessions
- Videos, Shorts, Stories
- Likes, Comments, Follows
- Creator Profiles, Wallets, Transactions
- Ad Campaigns, Ad Placements
- Watch History, Search Queries, Recommendations
- Messages

## Key Features Implementation

### Conditional Authentication
Authentication modal only appears when users attempt to:
- Like a video
- Comment on content
- Upload content
- Follow a creator
- Send a message

Videos can be watched without any authentication.

### Monetization Workflow
1. User reaches 600 followers
2. "Enable Monetization" button appears
3. Creator verification (ID, phone, payout method)
4. Ads automatically appear on their content
5. Earnings calculated and added to wallet

### Recommendation Algorithm
Uses weighted scoring:
- Keyword Match (40%)
- Watch History Overlap (30%)
- Engagement Rate (20%)
- Trending Boost (10%)
- Collaborative Filtering Bonus (15%)

## Payment Integration

The platform is set up to integrate with:
- **Paystack**: For African markets
- **Stripe**: For global payments
- **Bank Transfers**: Direct bank account transfers
- **Cryptocurrency**: Crypto payment support

## Development

### Database Management
\`\`\`bash
# View database in Prisma Studio
npm run db:studio

# Push schema changes
npm run db:push

# Generate Prisma Client
npm run db:generate
\`\`\`

### Building for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## License

This project is proprietary software.

## Support

For issues and questions, please contact the development team.
