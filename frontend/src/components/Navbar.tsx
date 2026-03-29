import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Leaf, LogOut, History, Brain } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md bg-card/80">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-sm">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            Serenity<span className="text-fern">ES</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hello, <span className="text-foreground font-medium">{user?.name}</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Link to="/history">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Link to="/dashboard">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Check In</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-border text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="gradient-primary text-primary-foreground border-0">
                <Link to="/auth?tab=signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
