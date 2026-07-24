import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const PRESETS = {
  default: {
    name: 'Indigo Glass (Default)',
    primary: '#6366f1',
    bgMain: '#0b0f19',
    bgCard: '#171d2d',
    textTitle: '#ffffff'
  },
  cyberpunk: {
    name: 'Cyberpunk Neon ⚡',
    primary: '#06b6d4',
    bgMain: '#050515',
    bgCard: '#0f0c29',
    textTitle: '#00f6ff'
  },
  emerald: {
    name: 'Emerald Mint 🍃',
    primary: '#10b981',
    bgMain: '#062016',
    bgCard: '#0d3324',
    textTitle: '#6ee7b7'
  },
  royal: {
    name: 'Royal Gold 👑',
    primary: '#f59e0b',
    bgMain: '#0c0a1d',
    bgCard: '#181438',
    textTitle: '#fbbf24'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lms_theme') || 'light';
  });

  const [preset, setPreset] = useState(() => {
    return localStorage.getItem('lms_theme_preset') || 'default';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-preset', preset);
    localStorage.setItem('lms_theme', theme);
    localStorage.setItem('lms_theme_preset', preset);

    const activePreset = PRESETS[preset] || PRESETS.default;
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--primary', activePreset.primary);
    }
  }, [theme, preset]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const changePreset = (newPreset) => {
    if (PRESETS[newPreset]) {
      setPreset(newPreset);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', preset, changePreset, PRESETS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
