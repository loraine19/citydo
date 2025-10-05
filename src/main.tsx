import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './style/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import { PersistQueryClientOptions, persistQueryClient } from '@tanstack/react-query-persist-client';
import { get, set, del } from 'idb-keyval';
import { registerSW } from 'virtual:pwa-register';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 heures
      staleTime: 1000 * 60 * 5,
    },
  },
});


// Création d'un persister custom pour IndexedDB avec idb-keyval
const persister = {
  persistClient: async (client: any) => {
    set('reactQuery', client);
  },
  restoreClient: async () => {
    return await get('reactQuery');
  },
  removeClient: async () => {
    await del('reactQuery');
  },
} as PersistQueryClientOptions['persister'];


persistQueryClient({
  queryClient,
  persister: persister,
});

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={{}}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);