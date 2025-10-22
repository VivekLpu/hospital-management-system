# CipherStudio - Browser-Based React IDE

A full-stack browser-based React IDE that allows users to create, edit, and preview React projects in real-time.

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

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

