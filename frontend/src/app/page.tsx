'use client';

import { useEffect, useState } from 'react';
import { useEditorStore } from '@/lib/store';
import Header from '@/components/Header';
import FileExplorer from '@/components/FileExplorer';
import CodeEditor from '@/components/Editor';
import Preview from '@/components/Preview';
import { projectAPI } from '@/lib/api';
import { useAutosave } from '@/hooks/useAutosave';
import ProjectImport from '@/components/ProjectImport';
import { Plus } from 'lucide-react';

export default function Home() {
  const { currentProject, files, createNewProject, setCurrentProject } = useEditorStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [showProjectList, setShowProjectList] = useState(!currentProject);
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Enable autosave with 30 second interval
  useAutosave(30000);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await projectAPI.getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    setIsCreating(true);
    try {
      const newProject = await projectAPI.createProject(newProjectName);
      setCurrentProject(newProject);
      setNewProjectName('');
      setShowProjectList(false);
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenProject = async (projectId: string) => {
    try {
      const project = await projectAPI.getProject(projectId);
      setCurrentProject(project);
      setShowProjectList(false);
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Error loading project');
    }
  };

  if (showProjectList && !currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Header projectName="CipherStudio" />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8">Welcome to CipherStudio</h2>

            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Create New Project</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                  placeholder="Enter project name..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={handleCreateProject}
                  disabled={isCreating}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Plus size={18} />
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
                <ProjectImport onImportSuccess={loadProjects} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <button
                      key={project.projectId}
                      onClick={() => handleOpenProject(project.projectId)}
                      className="p-4 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition"
                    >
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.description || 'No description'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No projects yet. Create one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header projectName={currentProject.name} />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <FileExplorer files={files} />
        </div>
        <div className="flex-1 flex gap-0">
          <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
            <CodeEditor />
          </div>
          <div className="w-1/2 overflow-hidden">
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
}
