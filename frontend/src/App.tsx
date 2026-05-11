import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';

// On initialise le client pour React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Évite de recharger à chaque changement d'onglet
      retry: 1, // Réessaie une fois en cas d'échec
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen bg-slate-50">
          {/* Barre latérale fixe */}
          <Sidebar />

          {/* Zone de contenu principal */}
          <main className="flex-1 overflow-y-auto">
            <Dashboard />
          </main>
        </div>
      </QueryClientProvider>
  );
}

export default App;