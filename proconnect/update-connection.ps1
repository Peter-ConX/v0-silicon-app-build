# Script to update Supabase connection string with pooler URL

Write-Host "`n=== Supabase Connection Pooler Setup ===`n" -ForegroundColor Cyan

$projectRef = "zwbvdtflhwcalbfanpyr"
$password = "##Liverpool_2005!"

Write-Host "Your project reference: $projectRef" -ForegroundColor Yellow
Write-Host "`nPlease provide your Supabase region (e.g., us-east-1, eu-west-1):" -ForegroundColor White
$region = Read-Host "Region"

if ($region) {
    # URL encode the password manually
    $encodedPassword = $password -replace '#', '%23' -replace '!', '%21'
    
    $poolerUrl = "postgresql://postgres.$projectRef`:$encodedPassword@aws-0-$region.pooler.supabase.com:6543/postgres?pgbouncer=true"
    
    Write-Host "`nGenerated Connection Pooler URL:" -ForegroundColor Green
    Write-Host $poolerUrl -ForegroundColor Cyan
    
    Write-Host "`nUpdating .env file..." -ForegroundColor Yellow
    
    # Update .env file
    $envContent = Get-Content .env -Raw
    $newEnvContent = $envContent -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"$poolerUrl`""
    $newEnvContent | Set-Content .env
    
    Write-Host "✓ .env file updated!" -ForegroundColor Green
    Write-Host "`nNow run: npm run db:push" -ForegroundColor Cyan
} else {
    Write-Host "`nNo region provided. Please get the connection string from Supabase dashboard." -ForegroundColor Red
}

