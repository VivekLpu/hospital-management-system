'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/lib/store';
import { Moon, Sun, Save, Download, Zap } from 'lucide-react';
import { projectAPI } from '@/lib/api';

interface HeaderProps {
  projectName?: string;
}

export default function Header({ projectName = 'CipherStudio' }: HeaderProps) {
  const { theme, toggleTheme, currentProject, files, autosaveEnabled, setAutosaveEnabled, isSaving } = useEditorStore();
  const [isManualSaving, setIsManualSaving] = useState(false);

  const handleSaveProject = async () => {
    if (!currentProject) return;

    setIsManualSaving(true);
    try {
      await projectAPI.updateProject(currentProject.projectId, {
        ...currentProject,
        files,
      });
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setIsManualSaving(false);
    }
  };

  const handleExportProject = () => {
    if (!currentProject) return;

    const projectData = {
      ...currentProject,
      files,
    };

    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProject.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-600">🔐 {projectName}</h1>
        {currentProject && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentProject.name}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setAutosaveEnabled(!autosaveEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            autosaveEnabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400'
          }`}
          title={autosaveEnabled ? 'Autosave enabled' : 'Autosave disabled'}
        >
          <Zap size={18} />
          {autosaveEnabled ? 'Auto' : 'Manual'}
        </button>

        <button
          onClick={handleSaveProject}
          disabled={isManualSaving || isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          <Save size={18} />
          {isManualSaving || isSaving ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={handleExportProject}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          <Download size={18} />
          Export
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}

