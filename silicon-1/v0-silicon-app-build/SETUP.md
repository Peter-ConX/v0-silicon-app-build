# Silicon Platform Setup Guide

## Quick Start

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set Up Environment Variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and add your configuration:
   - `DATABASE_URL`: SQLite for development (already set)
   - `NEXTAUTH_SECRET`: Generate a random secret key
   - `NEXTAUTH_URL`: http://localhost:3000
   - Add OAuth and payment gateway keys as needed

3. **Initialize Database**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Features Implemented

✅ **Conditional Authentication**
- Auth modal only appears when users try to like, comment, or upload
- Videos can be watched without authentication

✅ **Creator Monetization**
- 600 followers threshold
- Verification workflow (ID, phone, payout method)
- Automatic ad placement for monetized creators
- Real earnings calculation

✅ **Wallet System**
- Every user has a wallet
- Deposit/withdrawal functionality
- Transaction history
- Ready for Paystack, Stripe, bank, and crypto integration

✅ **Recommendation Algorithm**
- Content-based filtering
- Collaborative filtering
- Trending boost
- Personalized suggestions

✅ **Silicon Cave (Creator Hub)**
- Analytics dashboard
- Content management
- Monetization tools
- Community management

✅ **Silicon Ads Hub**
- Ad campaign creation
- Targeting options
- Analytics tracking
- Compliance checking

✅ **Social Features**
- Follow/unfollow system
- Direct messaging
- Likes, comments, shares

## Database Schema

The platform uses Prisma with a comprehensive schema. Key models:
- Users, Accounts, Sessions
- Videos, Shorts, Stories
- Creator Profiles, Wallets, Transactions
- Ad Campaigns, Ad Placements
- Watch History, Recommendations
- Messages, Follows

## API Endpoints

### Videos
- `GET /api/videos` - List videos
- `POST /api/videos` - Upload video
- `POST /api/videos/[id]/like` - Like/unlike video
- `POST /api/videos/[id]/watch` - Record watch

### Monetization
- `GET /api/monetization/check-eligibility` - Check if eligible
- `POST /api/monetization/enable` - Enable monetization
- `POST /api/monetization/verify` - Submit verification

### Wallet
- `GET /api/wallet` - Get wallet
- `POST /api/wallet/deposit` - Deposit funds
- `POST /api/wallet/withdraw` - Withdraw funds

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations

### Ads
- `GET /api/ads/campaigns` - List campaigns
- `POST /api/ads/campaigns` - Create campaign
- `GET /api/ads/placements` - Get ad placements

### Social
- `POST /api/follow` - Follow/unfollow user
- `GET /api/messages` - Get messages/conversations
- `POST /api/messages` - Send message

## Payment Integration

The platform is structured to integrate with:
- **Paystack**: Add `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY`
- **Stripe**: Add `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`
- **Bank Transfers**: Configure in payout details
- **Cryptocurrency**: Add crypto payment provider

## Next Steps

1. **Configure OAuth Providers**
   - Add Google OAuth credentials
   - Add other providers as needed

2. **Set Up Payment Gateways**
   - Integrate Paystack/Stripe APIs
   - Test deposit/withdrawal flows

3. **Add File Upload**
   - Set up cloud storage (AWS S3, Cloudinary, etc.)
   - Update upload endpoints to handle file uploads

4. **Implement Ad Serving**
   - Connect ad placement API to video player
   - Add ad skip functionality (after 5 seconds)

5. **Enhance Analytics**
   - Add real-time analytics tracking
   - Implement charts and graphs

6. **Add Email/SMS Verification**
   - Integrate email service (SendGrid, etc.)
   - Add SMS verification for phone numbers

7. **Production Deployment**
   - Switch to PostgreSQL
   - Set up environment variables
   - Configure CDN for video storage
   - Set up monitoring and logging

## Development Commands

\`\`\`bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database management
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma Client
\`\`\`

## Notes

- The platform uses SQLite for development (easy setup)
- For production, switch to PostgreSQL in `prisma/schema.prisma`
- All monetization features are backed by real database state
- Payment processing is structured but needs actual gateway integration
- Video URLs are currently expected to be external URLs
- In production, implement proper file upload and storage
