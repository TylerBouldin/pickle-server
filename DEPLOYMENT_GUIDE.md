# Deployment Guide

## ✅ What's Been Completed

### Server (pickle-server)
- ✅ Express.js server set up with CORS
- ✅ API endpoints created for products, courts, and groups
- ✅ Beautiful API documentation page (index.html)
- ✅ Product images copied and static serving configured
- ✅ package.json with start script
- ✅ Server tested locally and working

### React App (pickleball-react)
- ✅ Modal component created for displaying item details
- ✅ Shop page updated to fetch products from API
- ✅ Products are clickable and show details in modal
- ✅ NearYou page updated to fetch courts and groups from API
- ✅ Courts and groups are clickable and show details in modals
- ✅ Loading and error states added
- ✅ Hover effects and beautiful styling added

## 🚀 Next Steps - What YOU Need to Do

### Step 1: Test Everything Locally (OPTIONAL)

1. Make sure your server is running:
   ```bash
   cd C:\Users\tyler\OneDrive\Documents\pickle-server
   npm start
   ```

2. In another terminal, run your React app:
   ```bash
   cd C:\Users\tyler\OneDrive\Documents\pickleball-react
   npm start
   ```

3. Visit http://localhost:3000 and test:
   - Click on products in the Shop page
   - Click on courts in the NearYou page
   - Click on groups in the NearYou page
   - Verify modals open with detailed information

### Step 2: Deploy Server to Render

1. **Commit and push your server code to GitHub:**
   ```bash
   cd C:\Users\tyler\OneDrive\Documents\pickle-server
   git add .
   git commit -m "Add Express API server with products, courts, and groups endpoints"
   git push origin main
   ```

2. **Create Web Service on Render:**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your `pickle-server` repository
   - Settings:
     - **Name:** pickle-server (or any name you want)
     - **Region:** Choose closest to you
     - **Branch:** main
     - **Root Directory:** (leave blank)
     - **Runtime:** Node
     - **Build Command:** (leave blank or use `npm install`)
     - **Start Command:** `npm start`
   - Click "Create Web Service"

3. **Wait for deployment** (takes 2-3 minutes)

4. **Copy your server URL** (e.g., `https://pickle-server-abcd.onrender.com`)

### Step 3: Update React App with Production API URL

1. **Create a `.env` file** in your React project:
   ```bash
   cd C:\Users\tyler\OneDrive\Documents\pickleball-react
   ```

2. **Create `.env` file with this content:**
   ```
   REACT_APP_API_URL=https://your-render-server-url.onrender.com
   ```
   Replace `your-render-server-url.onrender.com` with your actual Render URL from Step 2.

3. **Commit and push React app:**
   ```bash
   git add .
   git commit -m "Update Shop and NearYou pages to fetch from API server with clickable modals"
   git push origin main
   ```

### Step 4: Deploy React App

If you're using Render for React app:
1. Go to your React app service on Render
2. It should auto-deploy from the new commit
3. Add the environment variable `REACT_APP_API_URL` with your server URL

If you're using Netlify/Vercel:
1. Add environment variable `REACT_APP_API_URL` in your hosting platform
2. Redeploy

### Step 5: Update Your Main 242 Page

Add these links to your main 242 homework page:
- Link to server GitHub: `https://github.com/TylerBouldin/pickle-server`
- Link to Render server: `https://your-server-url.onrender.com`
- Link to client GitHub: `https://github.com/TylerBouldin/pickleball-react`
- Link to client website: Your deployed React app URL

## 🎯 Requirements Checklist

### Server Requirements
- ✅ Node server with Express
- ✅ Array of items (products, courts, groups)
- ✅ Images folder with product images
- ✅ Data provided via GET requests
- ✅ index.html showing available API requests with beautiful styling
- ⏳ Deployed on Render (you need to do this)

### React App Requirements
- ✅ Pulls data from server API
- ✅ Displays information in beautiful format
- ✅ Items are clickable
- ✅ Shows item details in modal
- ✅ Beautifully styled and matches design
- ✅ Uses React state and props appropriately
- ✅ Broken down into components
- ✅ Individual stylesheets for components
- ⏳ Deployed with production API URL (you need to do this)

## 🔍 Troubleshooting

### If products/courts/groups don't load:
1. Check browser console for errors
2. Make sure server is running
3. Verify CORS is enabled (it is!)
4. Check that API_URL is correct

### If modals don't work:
1. Check browser console for errors
2. Make sure Modal.css is loaded
3. Try clicking different items

### If images don't show:
1. Check that images exist in `public/images` folder in React app
2. Check that images exist in `images` folder in server
3. Verify image file names match

## 📝 Notes

- The server runs on port 3001 locally (Render assigns a port in production)
- React app uses environment variables for API URL
- All data is currently hardcoded in `app.js` (easy to modify)
- CORS is enabled for all origins (good for development)

## 🎉 You're Almost Done!

Just deploy to Render and update your environment variables, and you'll have everything working perfectly!

