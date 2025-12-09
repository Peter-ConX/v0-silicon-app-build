# Fix Database Push Issue

## Problem
The `npm run db:push` command is hanging or taking too long.

## Solutions

### Option 1: Use Prisma Migrate (Recommended)
Instead of `db:push`, use migrations which are more reliable:

\`\`\`bash
# Create a migration
npm run db:migrate -- --name add_zeets

# This will:
# 1. Create migration files
# 2. Apply them to database
# 3. Generate Prisma Client
\`\`\`

### Option 2: Check Connection String
The connection pooler might be timing out. Try:

1. Go to Supabase Dashboard
2. Get a fresh connection string
3. Make sure it's the **Connection Pooler** URL (port 6543)
4. Update `.env` file

### Option 3: Use Direct Connection Temporarily
For initial setup, you can try direct connection:

1. Supabase Dashboard → Settings → Database
2. Get **Direct connection** URL (port 5432)
3. Make sure your IP is whitelisted in Supabase
4. Update `.env` temporarily
5. Run `npm run db:push`
6. Switch back to pooler URL

### Option 4: Manual Schema Creation
If push keeps failing, you can:

1. Use Supabase SQL Editor
2. Manually create tables based on Prisma schema
3. Or use Supabase's table editor

## Quick Fix
Try stopping the current process (Ctrl+C) and run:

\`\`\`bash
# Generate Prisma Client first
npm run db:generate

# Then try push again with timeout
npm run db:push -- --skip-generate
\`\`\`

If it still hangs, the connection pooler might be having issues. Try the migration approach instead.
