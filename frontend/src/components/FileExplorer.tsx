'use client';

import React, { useState } from 'react';
import { useEditorStore, FileItem } from '@/lib/store';
import { ChevronRight, ChevronDown, File, Folder, Plus, Trash2 } from 'lucide-react';

interface FileExplorerProps {
  files: FileItem[];
}

export default function FileExplorer({ files }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [renamingFileName, setRenamingFileName] = useState('');

  const {
    selectedFileId,
    setSelectedFile,
    createFile,
    createFolder,
    deleteFile,
    renameFile,
  } = useEditorStore();

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      createFile(newFileName);
      setNewFileName('');
      setShowNewFileInput(false);
    }
  };

  const handleRenameFile = (fileId: string, currentName: string) => {
    setRenamingFileId(fileId);
    setRenamingFileName(currentName);
  };

  const handleConfirmRename = (fileId: string) => {
    if (renamingFileName.trim()) {
      renameFile(fileId, renamingFileName);
      setRenamingFileId(null);
      setRenamingFileName('');
    }
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items
      .filter((item) => !item.parentId)
      .map((item) => (
        <div key={item.id}>
          <div
            className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
              selectedFileId === item.id ? 'bg-blue-100 dark:bg-blue-900' : ''
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => item.type === 'file' && setSelectedFile(item.id)}
          >
            {item.type === 'folder' ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(item.id);
                  }}
                  className="p-0"
                >
                  {expandedFolders.has(item.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                <Folder size={16} />
              </>
            ) : (
              <>
                <div className="w-4" />
                <File size={16} />
              </>
            )}
            {renamingFileId === item.id ? (
              <input
                autoFocus
                type="text"
                value={renamingFileName}
                onChange={(e) => setRenamingFileName(e.target.value)}
                onBlur={() => handleConfirmRename(item.id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleConfirmRename(item.id);
                  } else if (e.key === 'Escape') {
                    setRenamingFileId(null);
                  }
                }}
                className="flex-1 text-sm px-1 bg-white dark:bg-gray-700 border border-blue-500 rounded"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 text-sm">{item.name}</span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRenameFile(item.id, item.name);
              }}
              className="p-0 hover:text-blue-500 text-xs"
              title="Rename"
            >
              ✎
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(item.id);
              }}
              className="p-0 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {item.type === 'folder' && expandedFolders.has(item.id) && item.children && (
            <div>
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-3">Files</h2>
        <div className="flex gap-2">
          <button
            onClick={() => createFile('new-file.jsx')}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            <Plus size={14} /> File
          </button>
          <button
            onClick={() => createFolder('new-folder')}
            className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            <Plus size={14} /> Folder
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {files.length > 0 ? (
          renderFileTree(files)
        ) : (
          <div className="p-4 text-gray-500 text-sm">No files yet</div>
        )}
      </div>
    </div>
  );
}

