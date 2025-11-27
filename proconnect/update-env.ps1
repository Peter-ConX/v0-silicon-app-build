# Update .env with Supabase connection string

$password = "##Liverpool_2005!"
# URL encode special characters
$encodedPassword = $password -replace '#', '%23' -replace '!', '%21'

# Direct connection URL
$directUrl = "postgresql://postgres:$encodedPassword@db.zwbvdtflhwcalbfanpyr.supabase.co:5432/postgres?sslmode=require"

Write-Host "Updating .env file..." -ForegroundColor Yellow

# Read current .env
$envLines = Get-Content .env

# Update DATABASE_URL line
$newEnvLines = $envLines | ForEach-Object {
    if ($_ -match '^DATABASE_URL=') {
        "DATABASE_URL=`"$directUrl`""
    } else {
        $_
    }
}

$newEnvLines | Set-Content .env -Encoding UTF8

Write-Host "✓ .env file updated with direct connection" -ForegroundColor Green
Write-Host "`nIf this doesn't work, you'll need to use Connection Pooler:" -ForegroundColor Yellow
Write-Host "1. Go to Supabase Dashboard → Settings → Database" -ForegroundColor White
Write-Host "2. Get Connection Pooler URL (port 6543)" -ForegroundColor White
Write-Host "3. Update DATABASE_URL in .env" -ForegroundColor White

