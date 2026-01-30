# Trendzz Deployment Guide

## Overview
This guide will help you deploy the Trendzz application to production environments. Trendzz consists of three main services:
1. **Frontend** (React)
2. **Backend** (Node.js/Express)
3. **ML Services** (Python - Optional)

## Prerequisites
- Node.js 16+ installed
- MongoDB instance (local or cloud)
- Cloudinary account for media uploads
- (Optional) Python 3.9+ for ML features

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=your-mongodb-connection-string

# JWT Secret (Use a strong random string in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=production

# Cloudinary Configuration (REQUIRED for uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Frontend URL (for CORS configuration)
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration (Optional)
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL (Must point to your deployed backend)
REACT_APP_API_URL=https://your-backend-domain.com/api

# Optional ML Services (only if you're deploying ML features)
REACT_APP_ML_RECOMMENDER_URL=https://your-ml-service-domain.com
REACT_APP_MODERATION_URL=https://your-moderation-service-domain.com
```

---

## Deployment Options

### Option 1: Vercel (Frontend) + Render/Railway (Backend)

#### Deploy Frontend to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to frontend directory and build:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Set environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `REACT_APP_API_URL` with your backend URL

#### Deploy Backend to Render

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `/`

4. Add environment variables in Render dashboard (use the backend .env variables listed above)

5. Deploy the service

#### Deploy Backend to Railway

1. Install Railway CLI or use the web interface
2. Navigate to backend directory:
   ```bash
   cd backend
   railway init
   railway up
   ```

3. Add environment variables via Railway dashboard
4. Your backend will be deployed at a Railway-provided URL

---

### Option 2: Heroku Deployment

#### Backend Deployment to Heroku

1. Create a `Procfile` in the backend directory:
   ```
   web: node server.js
   ```

2. Initialize git and create Heroku app:
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
   heroku config:set CLOUDINARY_API_KEY=your-api-key
   heroku config:set CLOUDINARY_API_SECRET=your-api-secret
   heroku config:set NODE_ENV=production
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

#### Frontend Deployment to Netlify

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=build
   ```

4. Set environment variables in Netlify dashboard

---

### Option 3: Docker Deployment

#### Backend Dockerfile

Create `Dockerfile` in the `backend/` directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
```

#### Frontend Dockerfile

Create `Dockerfile` in the `frontend/` directory:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - NODE_ENV=production
      - FRONTEND_URL=http://localhost:3000
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Deploy with Docker Compose:
```bash
docker-compose up -d
```

---

## Post-Deployment Checklist

- [ ] Backend is accessible and returns correct responses
- [ ] Frontend can connect to backend API
- [ ] MongoDB connection is working
- [ ] Cloudinary uploads are functional
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] JWT authentication works
- [ ] Socket.io connections are established
- [ ] All hardcoded URLs have been replaced with environment variables

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend `.env`
- Check that backend CORS configuration includes your frontend domain

### Cloudinary Upload Failures
- Verify all three Cloudinary environment variables are set
- Check that credentials are correct
- Ensure Cloudinary account is active

### Database Connection Issues
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (if using Atlas)
- Ensure MongoDB service is running

### Socket.io Connection Failures
- Make sure frontend Socket.io URL matches backend URL
- Check that WebSocket connections are not blocked by firewall
- Verify JWT token is being sent in socket handshake

### ML Services Not Working
- ML services are optional - the app works without them
- If deploying ML services, ensure URLs are set in frontend `.env`
- Check that Python services are running and accessible

---

## Security Best Practices

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Use strong JWT secrets** - Generate using `openssl rand -base64 32`
3. **Rotate Cloudinary credentials** periodically
4. **Enable HTTPS** in production
5. **Set NODE_ENV=production** for backend
6. **Review and limit MongoDB permissions**
7. **Use environment variables** for all sensitive data
8. **Enable rate limiting** for API endpoints
9. **Keep dependencies updated** - Run `npm audit fix` regularly

---

## Monitoring & Logs

### Backend Logs
- Use `console.log` statements are helpful for debugging
- Consider using services like LogRocket, Sentry, or DataDog
- Monitor server health endpoints (`/api/health`)

### Frontend Monitoring
- Use React Error Boundaries
- Implement analytics (Google Analytics, Mixpanel)
- Monitor client-side errors with Sentry

---

## Scaling Considerations

1. **Database**: Use MongoDB Atlas for managed scaling
2. **File Storage**: Cloudinary handles CDN and scaling automatically
3. **Backend**: Use load balancers and horizontal scaling
4. **Frontend**: CDN distribution through Vercel/Netlify
5. **Socket.io**: Consider Redis adapter for multi-instance deployments

---

## Support

For deployment issues:
1. Check the logs for error messages
2. Review environment variables
3. Verify network connectivity between services
4. Consult platform-specific documentation (Vercel, Render, etc.)

---

## License

MIT License - See LICENSE file for details
