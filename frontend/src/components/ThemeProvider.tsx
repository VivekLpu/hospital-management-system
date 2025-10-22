'use client';

import { useEffect, useState } from 'react';
import { useEditorStore } from '@/lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useEditorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, [setTheme]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return <>{children}</>;
}

