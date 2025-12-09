# Vercel Deployment Guide for ProConnect

This guide will help you deploy ProConnect to Vercel.

## Prerequisites

- ✅ GitHub repository with your code pushed
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Supabase database (or your PostgreSQL database) ready

## Step 1: Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Select the `proconnect` repository

## Step 2: Configure Environment Variables

In Vercel project settings, add these environment variables:

### Required Environment Variables

\`\`\`bash
# Database
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres

# NextAuth
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string

# OAuth Providers (Optional - if you're using them)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI (for Petrix AI)
OPENAI_API_KEY=your_openai_api_key

# Email (Optional - for email verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@proconnect.com
\`\`\`

### How to Generate NEXTAUTH_SECRET

Run this command in your terminal:
\`\`\`bash
openssl rand -base64 32
\`\`\`

Or use an online generator: https://generate-secret.vercel.app/32

## Step 3: Configure Build Settings

Vercel should auto-detect Next.js, but verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (or `prisma generate && npm run build`)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install`

### Custom Build Command (Recommended)

Since we use Prisma, update the build command to:
\`\`\`bash
prisma generate && npm run build
\`\`\`

## Step 4: Database Setup

### If using Supabase:

1. Make sure your Supabase database is accessible from the internet
2. Use the **Connection Pooler URL** (port 6543) for better performance:
   \`\`\`
   postgresql://postgres.zwbvdtflhwcalbfanpyr:[YOUR_PASSWORD]@aws-1-eu-west-3.pooler.supabase.com:6543/postgres
   \`\`\`
3. URL-encode your password if it contains special characters

### Run Prisma Migrations

After deployment, you may need to run migrations. You can do this via:
- Vercel CLI: `vercel env pull` then `npx prisma migrate deploy`
- Or use Supabase SQL Editor to run the SQL from `COPY_THIS_SQL_COMPLETE.txt`

## Step 5: Deploy

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Step 6: Post-Deployment Checklist

- [ ] Verify database connection works
- [ ] Test user registration/login
- [ ] Test profile picture upload
- [ ] Test project upload
- [ ] Test like/endorse functionality
- [ ] Verify environment variables are set correctly
- [ ] Check Vercel logs for any errors

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - Prisma client not generated (add `prisma generate` to build command)
   - TypeScript errors

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check if your database allows connections from Vercel's IPs
3. For Supabase, ensure you're using the pooler URL (port 6543)

### NextAuth Issues

1. Verify `NEXTAUTH_URL` matches your Vercel domain
2. Ensure `NEXTAUTH_SECRET` is set
3. Check OAuth callback URLs in provider settings

### Environment Variables Not Working

1. Redeploy after adding new environment variables
2. Check variable names match exactly (case-sensitive)
3. Remove any quotes around values in Vercel dashboard

## Vercel CLI Alternative

If you prefer using CLI:

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... etc
\`\`\`

## Production Optimizations

1. **Enable Vercel Analytics** (optional)
2. **Set up custom domain** (optional)
3. **Configure Redis** (if using for caching/presence)
4. **Set up monitoring** (Vercel has built-in monitoring)

## Important Notes

- ⚠️ Never commit `.env` files to GitHub
- ⚠️ Use Vercel's environment variables for secrets
- ⚠️ Update `NEXTAUTH_URL` to your production domain
- ⚠️ Use connection pooler for Supabase in production
- ⚠️ Consider using Vercel's Edge Config for frequently accessed data

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test database connection separately
