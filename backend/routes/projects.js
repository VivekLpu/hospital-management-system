import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../models/Project.js';

const router = express.Router();

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const projectId = uuidv4();

    const defaultFiles = [
      {
        id: uuidv4(),
        name: 'App.jsx',
        type: 'file',
        content: `export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to CipherStudio!</h1>
    </div>
  );
}`,
        parentId: null,
      },
      {
        id: uuidv4(),
        name: 'index.css',
        type: 'file',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
        parentId: null,
      },
    ];

    const project = new Project({
      projectId,
      name,
      description,
      files: defaultFiles,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific project
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:projectId', async (req, res) => {
  try {
    const { name, description, files } = req.body;
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { name, description, files, updatedAt: new Date() },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

