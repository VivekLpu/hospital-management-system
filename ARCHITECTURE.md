# CipherStudio Architecture

## System Overview

CipherStudio is a full-stack browser-based React IDE with the following architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (React)                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Pages & Components                            │  │  │
│  │  │  - Home (Project List)                         │  │  │
│  │  │  - IDE (Main Editor)                           │  │  │
│  │  │  - Header (Controls)                           │  │  │
│  │  │  - FileExplorer (File Tree)                    │  │  │
│  │  │  - Editor (Monaco)                             │  │  │
│  │  │  - Preview (Sandpack)                          │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  State Management (Zustand)                    │  │  │
│  │  │  - Project State                               │  │  │
│  │  │  - File State                                  │  │  │
│  │  │  - Theme State                                 │  │  │
│  │  │  - Autosave State                              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  API Client (Axios)                            │  │  │
│  │  │  - Project API                                 │  │  │
│  │  │  - File API                                    │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    Backend Server                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Express.js API Server                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Routes                                        │  │  │
│  │  │  - POST /api/projects                          │  │  │
│  │  │  - GET /api/projects                           │  │  │
│  │  │  - GET /api/projects/:id                       │  │  │
│  │  │  - PUT /api/projects/:id                       │  │  │
│  │  │  - DELETE /api/projects/:id                    │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Middleware                                    │  │  │
│  │  │  - CORS                                        │  │  │
│  │  │  - JSON Parser                                 │  │  │
│  │  │  - Error Handler                               │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↕ Mongoose
│  ┌──────────────────────────────────────────────────────┐  │
│  │           MongoDB Database                           │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Collections                                   │  │  │
│  │  │  - projects                                    │  │  │
│  │  │    - projectId (unique)                        │  │  │
│  │  │    - name                                      │  │  │
│  │  │    - description                               │  │  │
│  │  │    - files (array)                             │  │  │
│  │  │    - createdAt                                 │  │  │
│  │  │    - updatedAt                                 │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### State Management (Zustand)
- **Centralized Store**: Single source of truth for application state
- **Actions**: Pure functions that modify state
- **Persistence**: Theme and autosave settings saved to localStorage

### Components
1. **Header**: Navigation and controls
2. **FileExplorer**: File tree with CRUD operations
3. **Editor**: Monaco Editor for code editing
4. **Preview**: Sandpack for React preview
5. **ProjectImport**: JSON file import functionality

### Data Flow
```
User Action → Component → Store Action → State Update → Re-render
```

## Backend Architecture

### API Design
- **RESTful**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON**: Request/response format
- **CORS**: Enabled for cross-origin requests

### Database Schema

#### Project
```javascript
{
  projectId: String (unique),
  name: String,
  description: String,
  files: [
    {
      id: String,
      name: String,
      type: 'file' | 'folder',
      content: String,
      children: [FileItem],
      parentId: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Key Technologies

### Frontend
- **Next.js**: React framework with SSR/SSG
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Monaco Editor**: Code editor
- **Sandpack**: React code execution
- **Zustand**: State management
- **Axios**: HTTP client

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables

## Data Flow

### Create Project
1. User enters project name
2. Frontend sends POST request to backend
3. Backend creates project in MongoDB
4. Backend returns project with default files
5. Frontend updates store with project
6. UI renders project in editor

### Edit File
1. User types in Monaco Editor
2. Frontend updates store immediately
3. Autosave timer triggers every 30 seconds
4. Frontend sends PUT request to backend
5. Backend updates project in MongoDB
6. Preview updates in real-time via Sandpack

### Save Project
1. User clicks Save button
2. Frontend sends PUT request to backend
3. Backend updates project in MongoDB
4. Frontend shows success message
5. Project persists for future sessions

## Performance Considerations

1. **Lazy Loading**: Components loaded on demand
2. **Code Splitting**: Next.js automatic code splitting
3. **Caching**: Browser caching for static assets
4. **Debouncing**: Autosave debounced to prevent excessive requests
5. **Indexing**: MongoDB indexes on frequently queried fields

## Security Considerations

1. **CORS**: Restricted to trusted origins
2. **Input Validation**: Server-side validation of all inputs
3. **Error Handling**: Generic error messages to prevent information leakage
4. **Environment Variables**: Sensitive data in .env files
5. **HTTPS**: Enforced in production

## Scalability

### Current Limitations
- Single server instance
- No load balancing
- No caching layer

### Future Improvements
- Redis caching
- Database replication
- Horizontal scaling
- CDN for static assets
- WebSocket for real-time collaboration

## Deployment Architecture

### Frontend (Vercel)
- Automatic deployments from GitHub
- Global CDN
- Serverless functions
- Environment variables management

### Backend (Render)
- Docker containerization
- Automatic deployments from GitHub
- Environment variables management
- Database connection pooling

### Database (MongoDB Atlas)
- Cloud-hosted MongoDB
- Automatic backups
- Replication
- Monitoring and alerts

