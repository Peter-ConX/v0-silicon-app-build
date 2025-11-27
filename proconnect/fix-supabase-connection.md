# Quick Fix: Supabase Connection

## What You Need to Do

1. **Open Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Get Connection Pooler URL:**
   - Click **Settings** (gear icon) → **Database**
   - Scroll to **Connection string** section
   - Click on **Connection pooling** tab
   - Select **URI** format
   - **Copy the entire connection string**

3. **Update .env File:**
   - Open `.env` file in your project
   - Find the line: `DATABASE_URL=...`
   - Replace it with the connection pooler URL you copied
   - Make sure to replace `[YOUR-PASSWORD]` with your actual database password

4. **Save and Test:**
   ```bash
   npm run db:push
   ```

## Example Connection Pooler URL Format

```
postgresql://postgres.zwbvdtflhwcalbfanpyr:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Important:** Use the connection pooler URL (port 6543), not the direct connection (port 5432).

## Why Connection Pooler?

- More reliable connections
- Better for serverless environments
- Handles connection limits better
- Recommended by Supabase for applications

After updating, run `npm run db:push` again!

