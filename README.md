#  Trendzz — Social Media + AI-Powered Trend Prediction Platform

**Trendzz** is a full-stack MERN (MongoDB, Express, React, Node.js) based social media web application.  
It allows users to connect, post, and engage — while an integrated **Machine Learning module** analyzes user activity & content trends to predict emerging topics.


## 🌟 Features

###  AI & Machine Learning
- Integrated **Python ML module** for real-time **trend prediction**.
- Predicts popular hashtags, keywords & content types.
- Analyzes user engagement metrics.

###  Social Platform Features
- **User Authentication** (Signup/Login with JWT)
- **Home Feed** displaying all posts
- **Like / Comment system**
- **Profile Page** (upcoming)
- **Groups & Communities** (upcoming)

### ⚙️ Tech Stack
- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose ODM)  
- **ML Integration:** Python (Flask API)  
- **Version Control:** GitHub  
- **Deployment:** Vercel (Frontend), Render / Railway (Backend)


## 🧩 Installation & Setup Guide

Follow these steps to run **Trendzz** locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/trendzz.git
cd trendzz
```

### 2️⃣ Install Dependencies

**For Backend:**
```bash
cd backend
npm install
```

**For Frontend:**
```bash
cd frontend
npm install
```

### 3️⃣ Environment Configuration

**Backend Setup:**
1. Copy the example file: `cp backend/.env.example backend/.env`
2. Edit `backend/.env` with your credentials:
   - MongoDB connection string
   - JWT secret key
   - Cloudinary credentials (required for uploads)

**Frontend Setup:**
1. Copy the example file: `cp frontend/.env.example frontend/.env`
2. Edit `frontend/.env` if needed (defaults work for local development)

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for detailed configuration instructions.

### 4️⃣ Run the Application

**Backend:**
```bash
cd backend
npm run dev  # Development mode
# or
npm start    # Production mode
```

**Frontend:**
```bash
cd frontend
npm start
```

Then open http://localhost:3000

### 5️⃣ (Optional) Run the ML Flask API

If you're using ML predictions locally:

```bash
cd ml-model
pip install -r requirements.txt
python app.py
```

This will start the Flask server at http://localhost:5001.

---

## 🚀 Deployment

For production deployment instructions, see:
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Quick deployment guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Comprehensive deployment documentation

**Key Points:**
- All sensitive data uses environment variables (no hardcoded credentials)
- Frontend builds successfully with `npm run build`
- Backend is production-ready with proper error handling
- Cloudinary handles all media uploads and CDN distribution

---

🖤 Support

If you like this project, don’t forget to ⭐ the repo and share your feedback!

🧾 License

This project is licensed under the MIT License — feel free to use and modify for your own learning or development.



