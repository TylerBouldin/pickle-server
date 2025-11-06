# Pickleball API Server

A Node.js/Express API server that provides data for pickleball products, courts, and community groups.

## Features

- RESTful API with JSON responses
- CORS enabled for cross-origin requests
- Static image serving
- Beautiful API documentation page

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Courts
- `GET /api/courts` - Get all courts
- `GET /api/courts/:id` - Get court by ID

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID

### Images
- `GET /images/:imageName` - Get product images

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

Server will run on http://localhost:3001

Visit http://localhost:3001 to see the API documentation.

## Deploying to Render

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** (leave empty)
   - **Start Command:** `npm start`
   - Render will automatically set the PORT environment variable
6. Click "Create Web Service"
7. Copy your server URL (e.g., `https://pickle-server.onrender.com`)

## Technologies Used

- Node.js
- Express.js
- CORS

## Project Structure

```
pickle-server/
├── app.js              # Main server file
├── index.html          # API documentation
├── images/             # Product images
├── package.json        # Dependencies
└── README.md          # This file
```
