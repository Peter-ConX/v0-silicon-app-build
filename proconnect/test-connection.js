// Test Supabase connection
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('✅ Connection successful!')
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query test successful:', result)
    
    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('\nTroubleshooting tips:')
    console.error('1. Check your DATABASE_URL in .env file')
    console.error('2. Verify your Supabase password is correct')
    console.error('3. Check Supabase dashboard → Settings → Database')
    console.error('4. Try using connection pooler URL (port 6543)')
    console.error('5. Check if your IP needs to be whitelisted in Supabase')
    process.exit(1)
  }
}

testConnection()

