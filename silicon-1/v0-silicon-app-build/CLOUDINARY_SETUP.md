# Cloudinary Setup Guide

## Quick Setup Steps

1. **Create a Cloudinary Account**
   - Go to https://cloudinary.com/users/register/free
   - Sign up for a free account (25GB storage, 25GB bandwidth/month)

2. **Get Your Credentials**
   - After signing up, go to your Dashboard
   - You'll see your credentials:
     - Cloud Name
     - API Key
     - API Secret

3. **Add to Environment Variables**
   - Create or update your `.env` file:
   \`\`\`env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   \`\`\`

4. **Restart Your Dev Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## What Cloudinary Does

- ✅ Automatically optimizes videos
- ✅ Generates thumbnails automatically
- ✅ Provides CDN for fast delivery
- ✅ Handles multiple video formats
- ✅ Free tier: 25GB storage + 25GB bandwidth/month

## Testing

1. Go to `/upload` page
2. Select a video file
3. Fill in the form
4. Click "Upload Video"
5. The video will be uploaded to Cloudinary and the URL will be saved

## Troubleshooting

**Error: "Cloudinary not configured"**
- Make sure you've added the environment variables
- Restart your dev server after adding them
- Check that the values are correct (no extra spaces)

**Error: "File size exceeds limit"**
- Free tier has a 100MB upload limit per file
- For larger files, upgrade your Cloudinary plan or use AWS S3

**Video not playing?**
- Check that the video URL is accessible
- Make sure the video format is supported (MP4, MOV, AVI, etc.)
