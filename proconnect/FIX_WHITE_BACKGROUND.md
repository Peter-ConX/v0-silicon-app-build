# Fix White Background Issue

## Problem
Pages are showing white background instead of dark theme.

## Solution

### Step 1: Hard Refresh Browser
1. Open http://localhost:3000
2. Press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
3. This forces the browser to reload all CSS files

### Step 2: Clear Browser Cache (if Step 1 doesn't work)
1. Press **F12** to open DevTools
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Step 3: Check Browser Console
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Look for any red errors
4. If you see CSS loading errors, the dev server might need more time to compile

### Step 4: Verify Dev Server is Running
The dev server has been restarted. Wait 10-15 seconds for it to fully compile, then refresh.

## What You Should See After Fix

✅ **Dark background** (not white!)
✅ **Blue accent colors** for buttons and links
✅ **Modern card layouts** with shadows
✅ **Gradient backgrounds** on landing page
✅ **Styled form inputs** with borders
✅ **Professional typography**

## If Still White After These Steps

1. Check if dev server is running:
   ```bash
   # In terminal, you should see:
   # ✓ Ready in X seconds
   # ○ Compiling / ...
   ```

2. Check browser Network tab (F12 → Network):
   - Look for `globals.css` file
   - It should load successfully (status 200)
   - If it's 404, the CSS isn't being generated

3. Restart dev server manually:
   ```bash
   # Stop: Ctrl+C in terminal
   # Start: npm run dev
   ```

## Expected Appearance

- **Landing Page**: Dark background with blue gradient, white text
- **Login/Signup**: Dark card on dark background, blue buttons
- **Dashboard**: Dark sidebar, dark cards, blue accents

The app is configured for dark mode by default!

