'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';

export default function CodeEditor() {
  const { selectedFileId, files, updateFileContent, theme } = useEditorStore();
  const [editorValue, setEditorValue] = useState('');

  const selectedFile = files.find((f) => f.id === selectedFileId);

  useEffect(() => {
    if (selectedFile && selectedFile.type === 'file') {
      setEditorValue(selectedFile.content || '');
    }
  }, [selectedFileId, selectedFile]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && selectedFileId) {
      setEditorValue(value);
      updateFileContent(selectedFileId, value);
    }
  };

  const getLanguage = (fileName: string) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.json')) return 'json';
    if (fileName.endsWith('.html')) return 'html';
    return 'plaintext';
  };

  if (!selectedFile || selectedFile.type !== 'file') {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500">Select a file to edit</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-sm font-medium">{selectedFile.name}</p>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage={getLanguage(selectedFile.name)}
          language={getLanguage(selectedFile.name)}
          value={editorValue}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'vs'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}

