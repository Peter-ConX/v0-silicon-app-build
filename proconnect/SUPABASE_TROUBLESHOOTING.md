# Supabase Connection Troubleshooting

## Current Issue
Cannot reach Supabase database server. Here are solutions:

## Solution 1: Use Connection Pooler (Recommended)

Supabase's connection pooler (port 6543) is more reliable than direct connections.

### Steps:
1. Go to your Supabase Dashboard
2. Click **Settings** → **Database**
3. Scroll to **Connection string** section
4. Select **Connection pooling** tab
5. Copy the **URI** connection string
6. Update your `.env` file with this URL

The pooler URL format:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

## Solution 2: Check IP Restrictions

Supabase might be blocking your IP address:

1. Go to Supabase Dashboard
2. Click **Settings** → **Database**
3. Scroll to **Connection Pooling**
4. Check **IP Allowlist** settings
5. Add your current IP address or allow all IPs (for development)

## Solution 3: Verify Connection String Format

Your connection string should look like this:

**For Direct Connection (Port 5432):**
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.zwbvdtflhwcalbfanpyr.supabase.co:5432/postgres?sslmode=require"
```

**For Connection Pooler (Port 6543) - Recommended:**
```
DATABASE_URL="postgresql://postgres.zwbvdtflhwcalbfanpyr:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Solution 4: Test Connection from Supabase Dashboard

1. Go to Supabase Dashboard → **SQL Editor**
2. Try running a simple query: `SELECT 1;`
3. If this works, the database is accessible
4. The issue is with the connection string format

## Solution 5: Check Password Encoding

If your password contains special characters, they need to be URL-encoded:
- `#` becomes `%23`
- `!` becomes `%21`
- `@` becomes `%40`
- etc.

Or use the connection string from Supabase dashboard (it handles encoding automatically).

## Quick Fix Steps

1. **Get Connection Pooler URL:**
   - Supabase Dashboard → Settings → Database
   - Copy the **Connection pooling** URI
   - Update `.env` file

2. **Update .env:**
   ```bash
   # Replace with your connection pooler URL
   DATABASE_URL="postgresql://postgres.zwbvdtflhwcalbfanpyr:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

3. **Test Connection:**
   ```bash
   npm run db:push
   ```

## Alternative: Use Supabase CLI

If connection issues persist, you can use Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref zwbvdtflhwcalbfanpyr

# Push schema
supabase db push
```

## Still Having Issues?

1. Check Supabase status: https://status.supabase.com/
2. Verify your project is active in Supabase dashboard
3. Check your Supabase plan limits
4. Try connecting from Supabase's SQL Editor to verify database is working

