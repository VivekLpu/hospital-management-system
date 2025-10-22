# CipherStudio Testing Guide

## Local Testing

### Prerequisites
- Node.js 18+
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn

### Setup

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

2. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Manual Testing Checklist

### Project Management
- [ ] Create a new project
- [ ] View list of projects
- [ ] Open an existing project
- [ ] Delete a project
- [ ] Export a project as JSON
- [ ] Import a project from JSON

### File Management
- [ ] Create a new file
- [ ] Create a new folder
- [ ] Rename a file
- [ ] Rename a folder
- [ ] Delete a file
- [ ] Delete a folder
- [ ] Expand/collapse folders

### Code Editing
- [ ] Edit code in Monaco Editor
- [ ] Syntax highlighting works correctly
- [ ] Code changes are reflected in the preview
- [ ] Multiple files can be edited
- [ ] File content is preserved when switching files

### Live Preview
- [ ] React components render correctly
- [ ] CSS styles are applied
- [ ] Component updates reflect in real-time
- [ ] Errors are displayed in the preview
- [ ] Console output is visible

### Save & Persistence
- [ ] Manual save works
- [ ] Autosave is enabled by default
- [ ] Autosave saves every 30 seconds
- [ ] Autosave can be toggled on/off
- [ ] Projects persist after page refresh
- [ ] Projects persist after browser restart

### UI/UX
- [ ] Dark theme works correctly
- [ ] Light theme works correctly
- [ ] Theme preference is saved
- [ ] Responsive layout on desktop
- [ ] All buttons are clickable
- [ ] Error messages are displayed

### API Testing

#### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"A test project"}'
```

#### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

#### Get Specific Project
```bash
curl http://localhost:5000/api/projects/{projectId}
```

#### Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/{projectId} \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","files":[]}'
```

#### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/{projectId}
```

## Performance Testing

- [ ] Application loads within 3 seconds
- [ ] File switching is instant
- [ ] Code editing is responsive
- [ ] Preview updates within 1 second
- [ ] Autosave doesn't block user interaction

## Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Known Limitations

1. **Node Version**: Requires Node.js 18+, ideally 20+
2. **MongoDB**: Requires MongoDB connection (local or Atlas)
3. **File Size**: Large files may impact performance
4. **Concurrent Editing**: No real-time collaboration yet
5. **Authentication**: No user authentication yet

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify MongoDB is running
- Check port 5000 is available

### Frontend won't start
- Clear node_modules and reinstall
- Check Node.js version
- Check port 3000 is available

### Preview not updating
- Check browser console for errors
- Verify Sandpack is loaded
- Try refreshing the page

### Autosave not working
- Check browser console for errors
- Verify backend is running
- Check network tab for failed requests

## Continuous Integration

For CI/CD pipelines, consider:
- Running linting: `npm run lint`
- Running tests: `npm test`
- Building: `npm run build`
- Type checking: `npm run type-check`

## Load Testing

For production readiness:
- Test with 100+ concurrent users
- Test with large projects (1000+ files)
- Monitor memory usage
- Monitor database performance

