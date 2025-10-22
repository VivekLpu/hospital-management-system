import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  parentId?: string;
}

export interface Project {
  projectId: string;
  name: string;
  description?: string;
  files: FileItem[];
  createdAt?: string;
  updatedAt?: string;
}

interface EditorStore {
  currentProject: Project | null;
  selectedFileId: string | null;
  files: FileItem[];
  theme: 'light' | 'dark';
  autosaveEnabled: boolean;
  isSaving: boolean;

  // Project actions
  setCurrentProject: (project: Project) => void;
  createNewProject: (name: string, description?: string) => void;

  // File actions
  setSelectedFile: (fileId: string) => void;
  createFile: (name: string, parentId?: string) => void;
  createFolder: (name: string, parentId?: string) => void;
  deleteFile: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  updateFileContent: (fileId: string, content: string) => void;

  // Theme actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Autosave actions
  setAutosaveEnabled: (enabled: boolean) => void;
  setIsSaving: (saving: boolean) => void;

  // Utility
  getFileById: (fileId: string) => FileItem | null;
  getSelectedFileContent: () => string;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  currentProject: null,
  selectedFileId: null,
  files: [],
  theme: 'light',
  autosaveEnabled: true,
  isSaving: false,

  setCurrentProject: (project) => {
    set({ currentProject: project, files: project.files, selectedFileId: project.files[0]?.id || null });
  },

  createNewProject: (name, description) => {
    const projectId = uuidv4();
    const defaultFiles: FileItem[] = [
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
      },
      {
        id: uuidv4(),
        name: 'index.css',
        type: 'file',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}`,
      },
    ];

    const newProject: Project = {
      projectId,
      name,
      description,
      files: defaultFiles,
    };

    set({ currentProject: newProject, files: defaultFiles, selectedFileId: defaultFiles[0].id });
  },

  setSelectedFile: (fileId) => set({ selectedFileId: fileId }),

  createFile: (name, parentId) => {
    const newFile: FileItem = {
      id: uuidv4(),
      name,
      type: 'file',
      content: '',
      parentId,
    };

    set((state) => ({
      files: [...state.files, newFile],
      currentProject: state.currentProject
        ? { ...state.currentProject, files: [...state.currentProject.files, newFile] }
        : null,
    }));
  },

  createFolder: (name, parentId) => {
    const newFolder: FileItem = {
      id: uuidv4(),
      name,
      type: 'folder',
      children: [],
      parentId,
    };

    set((state) => ({
      files: [...state.files, newFolder],
      currentProject: state.currentProject
        ? { ...state.currentProject, files: [...state.currentProject.files, newFolder] }
        : null,
    }));
  },

  deleteFile: (fileId) => {
    set((state) => {
      const updatedFiles = state.files.filter((f) => f.id !== fileId);
      return {
        files: updatedFiles,
        selectedFileId: state.selectedFileId === fileId ? updatedFiles[0]?.id || null : state.selectedFileId,
        currentProject: state.currentProject
          ? { ...state.currentProject, files: updatedFiles }
          : null,
      };
    });
  },

  renameFile: (fileId, newName) => {
    set((state) => {
      const updatedFiles = state.files.map((f) =>
        f.id === fileId ? { ...f, name: newName } : f
      );
      return {
        files: updatedFiles,
        currentProject: state.currentProject
          ? { ...state.currentProject, files: updatedFiles }
          : null,
      };
    });
  },

  updateFileContent: (fileId, content) => {
    set((state) => {
      const updatedFiles = state.files.map((f) =>
        f.id === fileId ? { ...f, content } : f
      );
      return {
        files: updatedFiles,
        currentProject: state.currentProject
          ? { ...state.currentProject, files: updatedFiles }
          : null,
      };
    });
  },

  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },

  getFileById: (fileId) => {
    const state = get();
    return state.files.find((f) => f.id === fileId) || null;
  },

  getSelectedFileContent: () => {
    const state = get();
    const file = state.files.find((f) => f.id === state.selectedFileId);
    return file?.content || '';
  },

  setAutosaveEnabled: (enabled) => {
    set({ autosaveEnabled: enabled });
    localStorage.setItem('autosaveEnabled', JSON.stringify(enabled));
  },

  setIsSaving: (saving) => set({ isSaving: saving }),
}));

