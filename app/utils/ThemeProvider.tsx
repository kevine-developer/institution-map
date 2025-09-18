
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
Moon,
Sun
} from "lucide-react";
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Fonction pour détecter la préférence système
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Fonction pour résoudre le thème final
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    return currentTheme === 'system' ? getSystemTheme() : currentTheme;
  };

  // Fonction pour appliquer le thème au DOM
  const applyTheme = (resolvedTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  };

  // Fonction pour changer de thème
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    }
  };

  // Fonction pour basculer entre light et dark
  const toggleTheme = () => {
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  // Effet pour charger le thème depuis le localStorage au montage
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
    setMounted(true);
  }, [storageKey]);

  // Effet pour écouter les changements de préférence système
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newResolvedTheme = getSystemTheme();
        setResolvedTheme(newResolvedTheme);
        applyTheme(newResolvedTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Effet pour appliquer le thème quand il change
  useEffect(() => {
    if (!mounted) return;

    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [theme, mounted]);

  // Script pour éviter le flash au chargement
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
        var resolvedTheme = theme === 'system' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;
        
        document.documentElement.classList.add(resolvedTheme);
        document.documentElement.style.colorScheme = resolvedTheme;
      } catch (e) {}
    })();
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeContext.Provider value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme
      }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

// Hook pour utiliser le contexte
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Composant pour basculer le thème
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (

      <button
        onClick={toggleTheme}
        className=" cursor-pointer "
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Moon className="w-5 h-5 " /> : <Sun className="w-5 h-5" />  }
      </button>
      

  );
}