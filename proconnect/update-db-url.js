const fs = require('fs');
const path = require('path');

// Connection pooler URL with URL-encoded password
const password = '##Liverpool_2005!';
const encodedPassword = encodeURIComponent(password);
const poolerUrl = `postgresql://postgres.zwbvdtflhwcalbfanpyr:${encodedPassword}@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true`;

// Read .env file
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

// Replace DATABASE_URL line
envContent = envContent.replace(/^DATABASE_URL=.*$/m, `DATABASE_URL="${poolerUrl}"`);

// Write back to .env
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('✅ Updated .env file with Connection Pooler URL');
console.log(`URL: postgresql://postgres.zwbvdtflhwcalbfanpyr:***@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true`);

