'use client';

import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { projectAPI } from '@/lib/api';
import { useEditorStore } from '@/lib/store';

interface ProjectImportProps {
  onImportSuccess: () => void;
}

export default function ProjectImport({ onImportSuccess }: ProjectImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCurrentProject } = useEditorStore();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const projectData = JSON.parse(text);

      // Validate project data
      if (!projectData.name || !projectData.files) {
        alert('Invalid project file format');
        return;
      }

      // Create project on backend
      const newProject = await projectAPI.createProject(
        projectData.name,
        projectData.description
      );

      // Update with imported files
      const updatedProject = await projectAPI.updateProject(newProject.projectId, {
        ...newProject,
        files: projectData.files,
      });

      setCurrentProject(updatedProject);
      onImportSuccess();
      alert('Project imported successfully!');
    } catch (error) {
      console.error('Error importing project:', error);
      alert('Error importing project. Please check the file format.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        <Upload size={18} />
        Import
      </button>
    </>
  );
}

