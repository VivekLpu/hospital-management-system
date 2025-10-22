# CipherStudio Deployment Guide

This guide covers deploying CipherStudio to production using Vercel (frontend) and Render (backend).

## Prerequisites

1. GitHub account with the repository pushed
2. Vercel account (https://vercel.com)
3. Render account (https://render.com)
4. MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new project
4. Create a new cluster (M0 free tier)
5. Create a database user with username and password
6. Get the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/cipherstudio`)
7. Save this connection string for later

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign in with GitHub
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `cipherstudio-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
5. Add environment variables:
   - `MONGODB_URI`: Paste your MongoDB connection string
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy the service URL (e.g., `https://cipherstudio-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://cipherstudio-backend.onrender.com/api`
6. Click "Deploy"
7. Wait for deployment to complete
8. Your frontend will be available at the provided Vercel URL

## Step 4: Verify Deployment

1. Visit your Vercel frontend URL
2. Create a new project
3. Add some files and code
4. Verify the live preview works
5. Save the project
6. Refresh the page and verify the project loads correctly

## Troubleshooting

### Backend not connecting to MongoDB
- Verify the MongoDB connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas (Network Access)
- Ensure the database user has the correct permissions

### Frontend can't reach backend
- Verify the `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Check that the backend is running and accessible
- Look for CORS errors in the browser console

### Build failures
- Check the build logs in Vercel/Render
- Ensure all dependencies are installed
- Verify Node.js version compatibility (18+)

## Updating Deployment

To update your deployment after making changes:

1. Push changes to GitHub
2. Vercel and Render will automatically redeploy
3. Monitor the deployment status in their dashboards

## Performance Optimization

- Enable caching in Vercel
- Use MongoDB indexes for frequently queried fields
- Consider upgrading to paid tiers for better performance
- Implement CDN for static assets

## Security Considerations

- Never commit `.env` files to GitHub
- Use strong MongoDB passwords
- Enable HTTPS (automatic with Vercel and Render)
- Implement rate limiting on the backend
- Add authentication for user projects (future feature)

