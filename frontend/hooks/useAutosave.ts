import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/lib/store';
import { projectAPI } from '@/lib/api';

export const useAutosave = (interval: number = 30000) => {
  const { currentProject, files, autosaveEnabled, setIsSaving } = useEditorStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autosaveEnabled || !currentProject) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const saveProject = async () => {
      try {
        setIsSaving(true);
        await projectAPI.updateProject(currentProject.projectId, {
          ...currentProject,
          files,
        });
        console.log('Project autosaved');
      } catch (error) {
        console.error('Autosave failed:', error);
      } finally {
        setIsSaving(false);
      }
    };

    timeoutRef.current = setInterval(saveProject, interval);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [autosaveEnabled, currentProject, files, interval, setIsSaving]);
};

