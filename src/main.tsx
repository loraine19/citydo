import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={{}}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
// --- AJOUTEZ CE BLOC DE CODE ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker enregistré avec succès:', registration);
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
      });
  });
}