# Fix 500 Internal Server Error on Signup

## The Problem
The registration API is returning a 500 error. This is likely because Prisma Client needs to be regenerated after creating the database tables.

## Solution Steps

### Step 1: Stop the Dev Server
1. Go to the terminal where `npm run dev` is running
2. Press `Ctrl+C` to stop it

### Step 2: Regenerate Prisma Client
\`\`\`bash
npm run db:generate
\`\`\`

### Step 3: Restart Dev Server
\`\`\`bash
npm run dev
\`\`\`

### Step 4: Check Server Logs
When you try to signup, check the terminal where `npm run dev` is running. You should now see detailed error messages that will tell us exactly what's wrong.

## Alternative: Check the Error Directly

If you can't stop the server, check the terminal output when you try to signup. Look for lines that say:
- `Registration error:`
- `Error details:`

These will show the actual problem.

## Common Issues

1. **Prisma Client not generated**: Run `npm run db:generate`
2. **Database connection**: Check `.env` file has correct `DATABASE_URL`
3. **Schema mismatch**: The Prisma schema might have extra models not in the database

## Next Steps

After regenerating Prisma Client, try signing up again. If it still fails, share the error message from the terminal.
