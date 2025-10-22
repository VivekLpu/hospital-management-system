'use client';

import React, { useMemo } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { useEditorStore } from '@/lib/store';

export default function Preview() {
  const { files, theme } = useEditorStore();

  const files_obj = useMemo(() => {
    const obj: Record<string, { code: string }> = {};

    files.forEach((file) => {
      if (file.type === 'file') {
        obj[`/${file.name}`] = {
          code: file.content || '',
        };
      }
    });

    // Ensure App.jsx exists
    if (!obj['/App.jsx']) {
      obj['/App.jsx'] = {
        code: `export default function App() {
  return <h1>Welcome to CipherStudio</h1>;
}`,
      };
    }

    // Ensure index.js exists
    if (!obj['/index.js']) {
      obj['/index.js'] = {
        code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      };
    }

    return obj;
  }, [files]);

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      <Sandpack
        files={files_obj}
        template="react"
        theme={theme === 'dark' ? 'dark' : 'light'}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          editorHeight: '100%',
          editorWidthPercentage: 0,
        }}
      />
    </div>
  );
}

