# CipherStudio - Startup Guide

## ✅ Status: RUNNING

Both the frontend and backend are now running successfully!

### Frontend
- **URL**: http://localhost:3000
- **Status**: ✅ Running on port 3000
- **Technology**: Next.js 16 + React 19 + TypeScript

### Backend
- **URL**: http://localhost:5000
- **Status**: ✅ Running on port 5000
- **Technology**: Node.js + Express.js
- **Health Check**: http://localhost:5000/api/health

---

## 🚀 How to Start the Application

### Prerequisites
- **Node.js 20.19.5** (already installed via NVM)
- **npm** (comes with Node.js)

### Starting the Backend

```powershell
# Set Node.js 20 in PATH
$env:PATH = "C:\Users\computer place\AppData\Roaming\nvm\v20.19.5;$env:PATH"

# Navigate to backend directory
cd backend

# Start the backend server
node server.js
```

The backend will start on **http://localhost:5000**

### Starting the Frontend

```powershell
# Set Node.js 20 in PATH
$env:PATH = "C:\Users\computer place\AppData\Roaming\nvm\v20.19.5;$env:PATH"

# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:3000**

---

## 📋 What Was Fixed

1. **Node.js Version**: Upgraded to Node.js 20.19.5 (required for Next.js 16)
2. **File Structure**: Moved components, hooks, and lib to `src/` directory
3. **Root Layout**: Fixed Next.js root layout to be a server component
4. **Theme Provider**: Created ThemeProvider component for client-side theme management
5. **Missing Dependencies**: Installed `lucide-react` and `uuid`
6. **MongoDB Connection**: Backend now runs without MongoDB (in-memory mode)

---

## 🎯 Features Available

- ✅ Create and manage React projects
- ✅ File and folder management
- ✅ Monaco Editor for code editing
- ✅ Live preview with Sandpack
- ✅ Dark/Light theme toggle
- ✅ Autosave functionality
- ✅ Project export/import

---

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use, Next.js will automatically use the next available port (3001, 5001, etc.)

### MongoDB Connection Warning
The backend will show a warning about MongoDB connection, but this is normal. The application runs in memory-only mode without MongoDB.

### Node.js Version Issues
Always ensure Node.js 20.19.5 is in your PATH before running npm commands:
```powershell
$env:PATH = "C:\Users\computer place\AppData\Roaming\nvm\v20.19.5;$env:PATH"
```

---

## 📚 Documentation

- **README.md** - Main project documentation
- **QUICKSTART.md** - Quick start guide
- **DEPLOYMENT.md** - Deployment instructions
- **ARCHITECTURE.md** - System architecture

---

## ✨ Next Steps

1. Open http://localhost:3000 in your browser
2. Create a new project
3. Start coding React components
4. Use the live preview to see your changes in real-time

**Enjoy CipherStudio!** 🎉

