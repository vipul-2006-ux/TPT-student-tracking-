import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const theme = localStorage.getItem('tpt_theme') || 'light';
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else if (theme === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
