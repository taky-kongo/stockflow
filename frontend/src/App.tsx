// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Stock } from './pages/Stock';
import {Commandes} from "./pages/Commandes.tsx"; // Importe ta nouvelle page !

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="flex min-h-screen bg-slate-50">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto">
                        <Routes>
                            {/* Redirection automatique vers le dashboard au démarrage */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />

                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/stock" element={<Stock />} />
                            <Route path="/commandes" element={<Commandes />} />

                            {/* On pourra ajouter /commandes plus tard */}
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;