import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import SymptomChecker from '@/components/SymptomChecker';
import { Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen gradient-subtle">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Mental Wellness Check-In</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Hello, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground">
            Take a moment to check in with yourself. Select what you've been experiencing and we'll help you understand what's going on.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          <SymptomChecker />
        </div>
      </main>
    </div>
  );
}
