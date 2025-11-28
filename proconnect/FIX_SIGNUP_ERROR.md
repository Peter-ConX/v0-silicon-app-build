# Fix Signup "Internal Server Error"

## The Problem
The signup is failing because the database tables don't exist yet. The `db:push` command keeps timing out when connecting to Supabase.

## Solution: Use Supabase SQL Editor (EASIEST)

Instead of using Prisma commands that hang, use Supabase's built-in SQL editor:

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/zwbvdtflhwcalbfanpyr
2. Click **SQL Editor** in the left sidebar
3. Click **New query**

### Step 2: Run This SQL Script

Copy and paste this SQL into the editor, then click **Run**:

```sql
-- Create Users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "username" TEXT,
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "verifiedType" TEXT,
    "subscriptionTier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");

-- Create Profiles table
CREATE TABLE IF NOT EXISTS "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "bioAI" TEXT,
    "location" TEXT,
    "website" TEXT,
    "company" TEXT,
    "role" TEXT,
    "currentRole" TEXT,
    "goals" TEXT,
    "skills" TEXT[],
    "techStack" TEXT[],
    "interests" TEXT[],
    "github" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "portfolio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "profiles_userId_key" ON "profiles"("userId");

-- Create Zeets table
CREATE TABLE IF NOT EXISTS "zeets" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "codeBlock" TEXT,
    "tags" TEXT[],
    "replyToId" TEXT,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zeets_pkey" PRIMARY KEY ("id")
);

-- Create Zeet Likes table
CREATE TABLE IF NOT EXISTS "zeet_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "zeetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zeet_likes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "zeet_likes_userId_zeetId_key" ON "zeet_likes"("userId", "zeetId");

-- Add foreign keys
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "zeets" ADD CONSTRAINT "zeets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "zeets" ADD CONSTRAINT "zeets_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "zeets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "zeet_likes" ADD CONSTRAINT "zeet_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "zeet_likes" ADD CONSTRAINT "zeet_likes_zeetId_fkey" FOREIGN KEY ("zeetId") REFERENCES "zeets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Step 3: Verify Tables Created
After running the SQL, check the **Table Editor** in Supabase to see if the tables were created.

### Step 4: Test Signup Again
1. Go back to http://localhost:3000/signup
2. Try creating an account again
3. It should work now!

## Why This Works
- Supabase SQL Editor connects directly (no pooler timeout)
- Creates all essential tables at once
- Faster and more reliable than Prisma commands

## Alternative: Use Prisma Studio
If you want to verify tables later:
```bash
npm run db:studio
```
This opens a visual database browser.

