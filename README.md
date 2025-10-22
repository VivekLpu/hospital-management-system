# 🔐 CipherStudio - Browser-Based React IDE

A full-stack browser-based React IDE that allows users to create, edit, and preview React projects in real-time. Build React applications directly in your browser without any local setup!

**[Live Demo](#)** | **[Documentation](#documentation)** | **[Quick Start](./QUICKSTART.md)** | **[Features](./FEATURES.md)**

## Features

### Core Features
- **File Management**: Create, delete, and organize project files and folders
- **Code Editor**: Rich code editor with syntax highlighting (Monaco Editor)
- **Live Preview**: Real-time React project preview (Sandpack)
- **Save & Load Projects**: Persist projects to MongoDB with localStorage fallback
- **Dark/Light Theme**: Toggle between dark and light themes
- **Project Export**: Export projects as JSON files

### Tech Stack

#### Frontend
- **Framework**: Next.js 16 with React
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Live Preview**: Sandpack (CodeSandbox)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Utilities**: UUID, CORS, dotenv

## Project Structure

```
CipherStudio/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   └── components/      # React components
│   ├── lib/
│   │   ├── store.ts         # Zustand store
│   │   └── api.ts           # API client
│   ├── components/          # Shared components
│   │   ├── Header.tsx
│   │   ├── FileExplorer.tsx
│   │   ├── Editor.tsx
│   │   └── Preview.tsx
│   └── package.json
│
├── backend/                  # Express.js backend
│   ├── server.js            # Main server file
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   └── Project.js       # Project schema
│   ├── routes/
│   │   └── projects.js      # Project API routes
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd CipherStudio
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:5000`

## API Endpoints

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:projectId` - Get a specific project
- `PUT /api/projects/:projectId` - Update a project
- `DELETE /api/projects/:projectId` - Delete a project

## Usage

1. **Create a Project**: Click "Create" on the home page and enter a project name
2. **Edit Files**: Select a file from the file explorer and edit it in the Monaco Editor
3. **Preview**: See your React component rendered in real-time on the right panel
4. **Save**: Click "Save" to persist your project to the database
5. **Export**: Click "Export" to download your project as a JSON file
6. **Theme**: Toggle between dark and light themes using the theme button

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables (MONGODB_URI, PORT)
4. Deploy

## Future Enhancements

- User authentication and authorization
- Collaborative editing
- Version control integration
- Component library
- Deployment to hosting services
- Advanced debugging tools
- Performance monitoring
- File upload/download
- Responsive design improvements

## 📖 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get up and running in 5 minutes
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification
- **[Testing Guide](./TESTING.md)** - Manual and automated testing
- **[Architecture](./ARCHITECTURE.md)** - System design and components
- **[Features & Roadmap](./FEATURES.md)** - Current and planned features
- **[Project Summary](./PROJECT_SUMMARY.md)** - Complete project overview

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd CipherStudio

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI

cd ../frontend
# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running Locally

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev

# Open http://localhost:3000
```

## 🎯 Usage

1. **Create Project**: Click "Create" and enter a project name
2. **Add Files**: Click "+ File" to create new files
3. **Edit Code**: Click a file and edit in the Monaco Editor
4. **See Preview**: Changes appear instantly on the right
5. **Save**: Click "Save" to persist to database
6. **Export**: Click "Export" to download as JSON
7. **Import**: Click "Import" to restore a project

## 🔧 API Endpoints

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 📊 Project Statistics

- **Frontend**: 2000+ lines of React/TypeScript
- **Backend**: 500+ lines of Node.js/Express
- **Components**: 5 main components
- **API Routes**: 5 endpoints
- **Documentation**: 7 comprehensive guides
- **Git Commits**: 7 commits

## 🐛 Known Issues

- Node.js 18 shows warnings (requires 20+)
- No real-time collaboration yet
- No user authentication yet
- Limited to React projects only

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] Core IDE features
- [x] File management
- [x] Live preview
- [x] Save/load projects
- [x] Autosave
- [x] Export/import

### Phase 2 (Planned)
- [ ] User authentication
- [ ] Project sharing
- [ ] Real-time collaboration
- [ ] Component library
- [ ] Deployment integration

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Advanced features
- [ ] Enterprise support
- [ ] Community features

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 💬 Support

For issues or questions:
1. Check the [documentation](./QUICKSTART.md)
2. Review [existing issues](https://github.com/yourusername/CipherStudio/issues)
3. Create a new issue with details

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Sandpack](https://sandpack.codesandbox.io/) - React preview
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

**Built with ❤️ by the CipherStudio team**

