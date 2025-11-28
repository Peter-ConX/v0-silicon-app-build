# ProConnect Testing Guide

## 🚀 Quick Start Testing

### Step 1: Add Your OpenAI API Key

1. Open the `.env` file in your project root
2. Find the line: `OPENAI_API_KEY=your-openai-api-key-here`
3. Replace `your-openai-api-key-here` with your actual OpenAI API key
4. Save the file

### Step 2: Start the Development Server

```bash
npm run dev
```

Wait for the message: `✓ Ready in X seconds`

### Step 3: Open the Platform

Open your browser and go to:
- **Main App**: http://localhost:3000
- **Standalone HTML**: Open `proconnect-index.html` directly in your browser

---

## 📋 Testing Checklist

### Authentication
- [ ] **Sign Up Page** (`/signup`)
  - Create a new account
  - Try OAuth (GitHub/Google) - may need credentials configured
  - Check for validation errors

- [ ] **Login Page** (`/login`)
  - Login with email/password
  - Test "Forgot Password" link
  - Try OAuth login

### Main Pages (After Login)

- [ ] **Home Page** (`/home`)
  - See the Twitter-like feed
  - Create a new Zeet (post)
  - Like a Zeet
  - Check feed tabs (For You, Following, Trending)

- [ ] **Build Page** (`/build`)
  - View project cards
  - Click "Start New Project"
  - Search and filter projects

- [ ] **Discover Page** (`/discover`)
  - Search for professionals
  - View trending professionals
  - Explore categories

- [ ] **Showcase Page** (`/showcase`)
  - Browse project showcases
  - Click "Upload Project"
  - Test filters (All Fields, All Industries)

- [ ] **Missions Page** (`/missions`)
  - View featured missions
  - Check XP, badges, and progress stats
  - Click "Accept Mission"
  - Test filters

- [ ] **Co-Lab Page** (`/co-lab`)
  - View collaboration projects
  - Check project progress bars
  - Test status filters (Active, Planning, Completed)

- [ ] **Mentorship Page** (`/mentorship`)
  - Browse mentor profiles
  - Check ratings and reviews
  - Test "Request Mentorship" button
  - Search mentors

- [ ] **Pulse Page** (`/pulse`)
  - View analytics dashboard
  - Check profile views, endorsements, engagement
  - View charts (may need data to show properly)

- [ ] **Inbox Page** (`/inbox`)
  - View message list
  - Open a message thread
  - Test reply functionality
  - Check tabs (Inbox, Starred, Archive)

- [ ] **Profile Page** (`/profile`)
  - View your profile
  - Check verified badge (if applicable)
  - View stats (Projects, Endorsements, Connections, Missions)
  - Test tabs (Showcase, Missions Completed, Collabs, Mentorships)

### Features

- [ ] **Petrix AI Assistant**
  - Click the floating chat button (bottom-right)
  - Ask a question like "How can I improve my profile?"
  - Test quick question buttons
  - Verify OpenAI integration works

- [ ] **Theme Toggle**
  - Click the moon/sun icon in navigation
  - Verify light/dark mode switches
  - Check if preference is saved

- [ ] **Verified Badges**
  - Check if badges appear next to usernames
  - Hover to see tooltip
  - Test different badge types (Organization, High-Profile, Premium)

- [ ] **Navigation**
  - Test all navigation links
  - Verify active page highlighting
  - Check mobile responsiveness

### Public Pages

- [ ] **Standalone HTML** (`proconnect-index.html`)
  - Open directly in browser
  - Check all links work
  - Verify styling

- [ ] **Pricing Page** (`/pricing`)
  - View all 4 pricing tiers
  - Test monthly/yearly toggle
  - Check "Subscribe" buttons

- [ ] **Terms Page** (`/terms`)
  - Read Terms of Service
  - Verify content displays correctly

- [ ] **Privacy Page** (`/privacy`)
  - Read Privacy Policy
  - Verify content displays correctly

- [ ] **About Page** (`/about`)
  - View about content
  - Test "Join Proconnect" button

---

## 🐛 Common Issues & Fixes

### Issue: White background / No styling
**Fix**: Hard refresh browser (Ctrl + Shift + R)

### Issue: Database connection errors
**Fix**: 
1. Make sure PostgreSQL is running
2. Check `.env` DATABASE_URL is correct
3. Run: `npm run db:push` or `npm run db:migrate`

### Issue: Petrix AI not responding
**Fix**:
1. Check `.env` has `OPENAI_API_KEY` set
2. Verify API key is valid
3. Check browser console for errors

### Issue: Can't see pages after login
**Fix**:
1. Check middleware is working
2. Verify session is created
3. Check browser console for errors

### Issue: Navigation not showing
**Fix**:
1. Make sure you're logged in
2. Check if MainNav component is imported
3. Verify routes are correct

---

## 📊 Testing Scenarios

### Scenario 1: New User Journey
1. Visit homepage → See signup prompt
2. Sign up → Redirected to login
3. Login → Redirected to /home
4. Create first Zeet → Appears in feed
5. Explore Discover → Find professionals
6. View Profile → See your stats

### Scenario 2: Content Creation
1. Go to Showcase → Upload a project
2. Go to Build → Start a new project
3. Go to Missions → Accept a mission
4. Go to Co-Lab → Start collaboration

### Scenario 3: Networking
1. Go to Discover → Find a professional
2. View their profile
3. Send a message (Inbox)
4. Request mentorship

### Scenario 4: AI Assistant
1. Click Petrix icon (bottom-right)
2. Ask: "How can I improve my profile?"
3. Ask: "Suggest missions for my skills"
4. Test quick questions

---

## ✅ Success Criteria

The platform is working correctly if:
- ✅ All pages load without errors
- ✅ Navigation works smoothly
- ✅ You can create and view Zeets
- ✅ Petrix AI responds to questions
- ✅ Theme toggle works
- ✅ All forms submit successfully
- ✅ No console errors in browser DevTools

---

## 🔍 Debugging Tips

1. **Check Browser Console** (F12)
   - Look for red errors
   - Check network tab for failed requests

2. **Check Server Logs**
   - Look at terminal where `npm run dev` is running
   - Check for error messages

3. **Check Database**
   - Run: `npm run db:studio`
   - Verify tables exist
   - Check if data is being saved

4. **Check Environment Variables**
   - Verify `.env` file has all required keys
   - Make sure no typos in variable names

---

## 🎯 Next Steps After Testing

1. Create test data (users, zeets, projects)
2. Test all API endpoints
3. Test real-time features (if Socket.IO is set up)
4. Test on mobile devices
5. Test different browsers

Happy Testing! 🚀

