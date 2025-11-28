# Quick Start - Testing ProConnect

## Step 1: Add Your OpenAI API Key

1. Open the `.env` file in your project root
2. Find this line:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Replace `your-openai-api-key-here` with your actual OpenAI API key
4. Save the file

**Example:**
```
OPENAI_API_KEY=sk-proj-abc123xyz...
```

## Step 2: Start the Development Server

Open terminal in your project folder and run:

```bash
npm run dev
```

Wait until you see: `✓ Ready in X seconds`

## Step 3: Open in Browser

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the login page

## Step 4: Test the Platform

### A. Create an Account
1. Click "Sign up" or go to `/signup`
2. Fill in the form
3. Create account
4. You'll be redirected to login

### B. Login
1. Enter your email and password
2. Click "Sign In"
3. You'll be redirected to `/home`

### C. Test Main Features

**Home Page:**
- See the feed
- Click "Post" button to create a Zeet
- Type a message and post it
- Like posts by clicking the heart icon

**Petrix AI:**
- Look for the floating chat button (bottom-right corner)
- Click it to open Petrix
- Ask: "How can I improve my profile?"
- Should get an AI response

**Navigation:**
- Click through all tabs:
  - Home, Discover, Showcase, Missions, Build, Co-Lab, Mentorship, Pulse, Inbox, Profile
- Each should load without errors

**Theme Toggle:**
- Click the moon/sun icon in the top navigation
- Page should switch between light and dark mode

## Step 5: Test Standalone HTML

1. Find `proconnect-index.html` in your project folder
2. Double-click it to open in your browser
3. Should show the landing page

## Common Issues

**If pages show white background:**
- Press `Ctrl + Shift + R` to hard refresh

**If you get database errors:**
- Make sure Supabase is connected
- Run: `npm run db:push`

**If Petrix doesn't respond:**
- Check `.env` has your OpenAI key
- Check browser console (F12) for errors

## What to Test

✅ Sign up and login
✅ Create a Zeet (post)
✅ Navigate all pages
✅ Use Petrix AI
✅ Toggle theme
✅ View profile
✅ Check all navigation links

---

**Ready to test!** Start with `npm run dev` and open http://localhost:3000

