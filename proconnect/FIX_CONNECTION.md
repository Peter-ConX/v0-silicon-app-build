# Fix Supabase Connection - REQUIRED

## The Problem
Direct connection (port 5432) is being blocked by Supabase. This is normal - Supabase requires using the **Connection Pooler** for external connections.

## Solution: Use Connection Pooler

### Step 1: Get Connection Pooler URL

1. **Go to Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/zwbvdtflhwcalbfanpyr/settings/database
   ```

2. **Find Connection String Section:**
   - Scroll down to "Connection string"
   - You'll see tabs: "URI", "JDBC", "Connection pooling"

3. **Click "Connection pooling" tab**

4. **Copy the URI connection string**
   - It will look like:
   ```
   postgresql://postgres.zwbvdtflhwcalbfanpyr:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### Step 2: Update .env File

1. Open `.env` file in your project
2. Find the line: `DATABASE_URL=...`
3. Replace it with the connection pooler URL you copied
4. Make sure to replace `[YOUR-PASSWORD]` with: `##Liverpool_2005!`
   - Or use the password that Supabase shows (it might be auto-encoded)

### Step 3: Test Connection

```bash
npm run db:push
```

## Alternative: Check IP Allowlist

If you MUST use direct connection:

1. Go to Supabase Dashboard → Settings → Database
2. Scroll to "Connection Pooling" section
3. Check "IP Allowlist" settings
4. Add your current IP address
5. Or allow all IPs (for development only)

## Why Connection Pooler?

- ✅ More reliable connections
- ✅ Better for serverless/cloud deployments
- ✅ Handles connection limits better
- ✅ Recommended by Supabase
- ✅ Works from any IP address

## Quick Copy-Paste Format

Once you get the pooler URL from Supabase, it should be:

```
DATABASE_URL="postgresql://postgres.zwbvdtflhwcalbfanpyr:##Liverpool_2005!@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Replace `[REGION]` with your actual region (e.g., `us-east-1`, `eu-west-1`)

