# Quick Start Deployment Guide

This is a simplified guide to get Trendzz deployed quickly. For detailed deployment options, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## Prerequisites

- Node.js 18+ installed (Node.js 16 reached end-of-life in September 2023)
- MongoDB database (local or cloud like MongoDB Atlas)
- Cloudinary account (required for image/video uploads)

## Step 1: Environment Configuration

### Backend Setup

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `backend/.env` and fill in your credentials:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-random-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Frontend Setup

1. Copy the example environment file:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Edit `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   **For production deployment**, change this to your deployed backend URL:
   ```env
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

## Step 2: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 3: Start the Application

### Development Mode

Run backend and frontend in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend (build and serve):**
```bash
cd frontend
npm run build
# Use a static file server like 'serve'
npx serve -s build
```

## Step 4: Verify Deployment

1. Open http://localhost:3000 in your browser
2. Try creating an account
3. Upload an image (tests Cloudinary integration)
4. Check browser console for errors

## Common Issues

### Port Already in Use
If port 5000 is in use, the backend will automatically try the next available port.

### Cloudinary Uploads Fail
- Verify all three Cloudinary credentials are set in `backend/.env`
- Check credentials are correct on your Cloudinary dashboard

### MongoDB Connection Failed
- Ensure MongoDB is running (if local)
- Check MongoDB Atlas IP whitelist (if using Atlas)
- Verify connection string format

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- In development, both services should run on localhost

## Platform-Specific Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```
Set environment variable in Vercel dashboard: `REACT_APP_API_URL`

### Render (Backend)
1. Create new Web Service
2. Build Command: `cd backend && npm install`
3. Start Command: `cd backend && npm start`
4. Add all environment variables from `backend/.env`

### Railway (Backend)
```bash
cd backend
railway init
railway up
```
Add environment variables via Railway dashboard.

## Next Steps

- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment options
- Set up monitoring and logging
- Configure domain names and SSL certificates
- Review security best practices

## Need Help?

- Check logs for error messages
- Verify all environment variables are set
- Ensure services can communicate (check firewalls)
- See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for troubleshooting
