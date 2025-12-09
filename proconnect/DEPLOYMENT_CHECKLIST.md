# ProConnect Vercel Deployment Checklist

## Before Deployment

### 1. Environment Variables Setup

Add these in Vercel Dashboard → Settings → Environment Variables:

#### Required:
- [ ] `DATABASE_URL` - Your Supabase PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your Vercel domain (e.g., `https://proconnect.vercel.app`)
- [ ] `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

#### Optional (but recommended):
- [ ] `OPENAI_API_KEY` - For Petrix AI features
- [ ] `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - For GitHub OAuth
- [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google OAuth
- [ ] `REDIS_URL` - If using Redis for caching

### 2. Database Setup

- [ ] Ensure your Supabase database is accessible
- [ ] Use Connection Pooler URL (port 6543) for production
- [ ] Run the SQL script from `COPY_THIS_SQL_COMPLETE.txt` in Supabase SQL Editor
- [ ] Test database connection

### 3. GitHub Repository

- [ ] Code is pushed to GitHub
- [ ] `.env` file is NOT committed (should be in `.gitignore`)
- [ ] All necessary files are committed

### 4. Build Configuration

- [ ] `vercel.json` is in the repository
- [ ] `package.json` has correct build scripts
- [ ] Prisma schema is up to date

## Deployment Steps

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `proconnect` repository

### Step 2: Configure Project

1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `./` (default)
3. **Build Command:** `prisma generate && npm run build` (or use vercel.json)
4. **Output Directory:** `.next` (default)
5. **Install Command:** `npm install`

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add all variables from `.env.example`

**Important:**
- For `NEXTAUTH_URL`, use your Vercel domain: `https://your-project.vercel.app`
- For `DATABASE_URL`, use Supabase Connection Pooler URL (port 6543)
- URL-encode special characters in passwords

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Check deployment logs for errors

### Step 5: Post-Deployment

- [ ] Visit your deployed site
- [ ] Test user registration
- [ ] Test login
- [ ] Test profile picture upload
- [ ] Test project upload
- [ ] Test like/endorse functionality
- [ ] Check Vercel logs for errors

## Common Issues & Solutions

### Issue: Build fails with Prisma error
**Solution:** Add `prisma generate` to build command in `vercel.json`

### Issue: Database connection fails
**Solution:** 
- Verify `DATABASE_URL` is correct
- Use Supabase Connection Pooler URL (port 6543)
- Check if database allows external connections

### Issue: NextAuth not working
**Solution:**
- Verify `NEXTAUTH_URL` matches your Vercel domain exactly
- Ensure `NEXTAUTH_SECRET` is set
- Check OAuth callback URLs in provider settings

### Issue: Environment variables not working
**Solution:**
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)
- Remove quotes around values

## Quick Deploy Commands (CLI)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
# ... add all other variables

# Deploy to production
vercel --prod
\`\`\`

## Production URLs

After deployment, update these:

1. **OAuth Callback URLs:**
   - GitHub: `https://your-project.vercel.app/api/auth/callback/github`
   - Google: `https://your-project.vercel.app/api/auth/callback/google`

2. **NEXTAUTH_URL:**
   - Set to: `https://your-project.vercel.app`

## Monitoring

- Check Vercel Dashboard → Deployments for build logs
- Check Vercel Dashboard → Functions for API logs
- Use Vercel Analytics (optional)

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Enable Vercel Analytics
3. Set up error monitoring (Sentry, etc.)
4. Configure CDN for static assets
5. Set up automated backups for database
