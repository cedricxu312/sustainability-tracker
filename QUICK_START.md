# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Quick Setup

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the Application

**Option A: Safe Start (Recommended)**
```bash
# Backend (with port conflict checking)
cd backend
npm run start:safe

# Frontend (in new terminal)
cd frontend
npm start
```

**Option B: Standard Start**
```bash
# Backend
cd backend
npm start

# Frontend (in new terminal)
cd frontend
npm start
```

## 🔧 Troubleshooting

### Port Already in Use Error
If you see `EADDRINUSE: address already in use :::3001`:

```bash
# Check what's using port 3001
lsof -i :3001

# Kill the process
kill $(lsof -t -i:3001)

# Or use the safe start script
npm run start:safe
```

### CORS Errors
- Make sure both frontend (port 3000) and backend (port 3001) are running
- Check that the backend shows "CORS enabled" in the startup logs

### Data Not Saving
- Check file permissions: `ls -la backend/data/`
- Ensure the `backend/data/` directory exists

## 📱 Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🎯 Quick Test
1. Open http://localhost:3000
2. Click "Add New Action"
3. Fill out the form and submit
4. Verify the action appears in the table

## 🆘 Need Help?
- Check the main README.md for detailed documentation
- Look at the troubleshooting section in README.md
- Ensure all dependencies are installed correctly
