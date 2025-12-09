# Supabase Database Setup Guide

## Supabase Connection String Format

Supabase requires a specific connection string format. Here are the correct formats:

### Option 1: Direct Connection (Port 5432)
\`\`\`
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
\`\`\`

### Option 2: Connection Pooler (Port 6543) - Recommended
\`\`\`
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
\`\`\`

### Option 3: With SSL (Most Reliable)
\`\`\`
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
\`\`\`

## How to Get Your Supabase Connection String

1. Go to your Supabase project dashboard
2. Click on **Settings** → **Database**
3. Scroll down to **Connection string**
4. Select **URI** format
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual database password

## Important Notes

- **Password**: Use your database password (not your Supabase account password)
- **Project Reference**: Found in your Supabase project URL
- **SSL**: Supabase requires SSL connections
- **Connection Pooling**: Recommended for production

## Example

If your Supabase project URL is: `https://zwbvdtflhwcalbfanpyr.supabase.co`

Your connection string should look like:
\`\`\`
DATABASE_URL="postgresql://postgres.zwbvdtflhwcalbfanpyr:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
\`\`\`

Or for direct connection:
\`\`\`
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.zwbvdtflhwcalbfanpyr.supabase.co:5432/postgres?sslmode=require"
\`\`\`

## After Updating .env

1. Save the `.env` file
2. Run: `npm run db:push`
3. Verify connection works
