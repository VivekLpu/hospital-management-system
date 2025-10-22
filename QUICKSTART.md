# CipherStudio Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB running (local or MongoDB Atlas)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd CipherStudio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI
```

**Frontend (.env.local)**
```bash
cd frontend
# Create .env.local with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Start the Application

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Backend running on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3000
```

### Step 4: Open in Browser

Visit http://localhost:3000 and start creating!

## First Project

1. **Create Project**: Click "Create" and enter a project name
2. **Add Files**: Click "+ File" to create new files
3. **Edit Code**: Click a file and edit in the Monaco Editor
4. **See Preview**: Changes appear instantly on the right
5. **Save**: Click "Save" to persist to database

## Common Tasks

### Create a React Component
```jsx
// App.jsx
export default function App() {
  return (
    <div>
      <h1>Hello CipherStudio!</h1>
    </div>
  );
}
```

### Add Styling
```css
/* index.css */
body {
  font-family: Arial, sans-serif;
  background: #f0f0f0;
}

h1 {
  color: #333;
}
```

### Create a Folder
1. Click "+ Folder" in the file explorer
2. Name your folder
3. Create files inside by right-clicking

### Export Project
1. Click "Export" button
2. Project downloads as JSON
3. Share or backup your project

### Import Project
1. Click "Import" button
2. Select a previously exported JSON file
3. Project is restored with all files

## Keyboard Shortcuts

- **Ctrl+S / Cmd+S**: Save project
- **Ctrl+/** : Toggle comment in editor
- **Ctrl+Z / Cmd+Z**: Undo
- **Ctrl+Y / Cmd+Y**: Redo

## Tips & Tricks

1. **Autosave**: Enabled by default, saves every 30 seconds
2. **Dark Mode**: Click the moon icon to toggle theme
3. **File Rename**: Click the pencil icon next to a file
4. **Quick Delete**: Click the trash icon to delete files
5. **Responsive**: Works on desktop and tablet

## Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 5000
- Check MongoDB connection string
- Verify CORS is enabled

### "Preview not updating"
- Check browser console for errors
- Try refreshing the page
- Verify Sandpack is loaded

### "Autosave not working"
- Check network tab for failed requests
- Verify backend is running
- Check browser console for errors

## Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
- Read [TESTING.md](./TESTING.md) for testing guidelines
- Check [README.md](./README.md) for full documentation

## Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Check browser console for errors
4. Check backend logs for API errors

## Features

✅ Create and manage multiple projects
✅ Edit React code with Monaco Editor
✅ Live preview with Sandpack
✅ Save and load projects
✅ Dark/Light theme
✅ Autosave functionality
✅ File rename and delete
✅ Project export/import
✅ Responsive UI

## What's Next?

- Deploy to Vercel and Render
- Add user authentication
- Implement collaborative editing
- Add more templates
- Improve performance
- Add more languages support

