# ProConnect Setup Check Script

Write-Host "`n=== ProConnect Setup Check ===`n" -ForegroundColor Cyan

# Check .env file
Write-Host "1. Checking .env file..." -ForegroundColor Yellow
if (Test-Path .env) {
    $envContent = Get-Content .env -Raw
    if ($envContent -match "DATABASE_URL") {
        Write-Host "   ✓ .env file exists" -ForegroundColor Green
        $dbUrl = ($envContent | Select-String -Pattern 'DATABASE_URL="([^"]+)"').Matches.Groups[1].Value
        if ($dbUrl -match "pooler") {
            Write-Host "   ✓ Using connection pooler (recommended)" -ForegroundColor Green
        } elseif ($dbUrl -match ":5432") {
            Write-Host "   ⚠ Using direct connection (try pooler if issues)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ✗ DATABASE_URL not found in .env" -ForegroundColor Red
    }
} else {
    Write-Host "   ✗ .env file not found" -ForegroundColor Red
}

# Check node_modules
Write-Host "`n2. Checking dependencies..." -ForegroundColor Yellow
if (Test-Path node_modules) {
    Write-Host "   ✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ✗ Run: npm install" -ForegroundColor Red
}

# Check Prisma Client
Write-Host "`n3. Checking Prisma..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma") {
    Write-Host "   ✓ Prisma Client generated" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Run: npm run db:generate" -ForegroundColor Yellow
}

# Test database connection
Write-Host "`n4. Testing database connection..." -ForegroundColor Yellow
try {
    $result = node test-connection.js 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✓ Database connection successful!" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Database connection failed" -ForegroundColor Red
        Write-Host "   See SUPABASE_TROUBLESHOOTING.md for help" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠ Could not test connection" -ForegroundColor Yellow
}

# Check if dev server is running
Write-Host "`n5. Checking dev server..." -ForegroundColor Yellow
$nodeProcess = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcess) {
    Write-Host "   ✓ Node.js process running" -ForegroundColor Green
    Write-Host "   → Check http://localhost:3000" -ForegroundColor Cyan
} else {
    Write-Host "   ⚠ Dev server not running" -ForegroundColor Yellow
    Write-Host "   → Run: npm run dev" -ForegroundColor Cyan
}

Write-Host "`n=== Check Complete ===`n" -ForegroundColor Cyan
