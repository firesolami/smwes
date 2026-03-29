import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { getHistory, getSymptomLabel, AnalysisResult } from '@/lib/expertSystem';
import { useState, useEffect } from 'react';
import { ConditionCard } from '@/components/AnalysisResult';
import { History as HistoryIcon, ChevronDown, ChevronUp, Brain, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const severityConfig = {
  low: { label: 'Mild', color: 'text-dry-sage', bg: 'bg-dry-sage/15 border-dry-sage/30' },
  moderate: { label: 'Moderate', color: 'text-fern', bg: 'bg-fern/10 border-fern/30' },
  high: { label: 'Significant', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  critical: { label: 'Urgent', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

function HistoryEntry({ entry, index }: { entry: AnalysisResult; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const cfg = severityConfig[entry.overallSeverity];
  const date = new Date(entry.createdAt);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-display font-semibold text-foreground">
                {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span>{entry.symptoms.length} symptom{entry.symptoms.length !== 1 ? 's' : ''} selected</span>
              <span>{entry.results.length} condition{entry.results.length !== 1 ? 's' : ''} identified</span>
            </div>
          </div>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
        }
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Symptoms reported</p>
            <div className="flex flex-wrap gap-1.5">
              {entry.symptoms.map(sid => (
                <span key={sid} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/50">
                  {getSymptomLabel(sid)}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-fern pl-3 italic">
            {entry.summary}
          </p>

          {entry.results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Conditions identified</p>
              {entry.results.map((c, i) => (
                <ConditionCard key={c.id + i} condition={c} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function History() {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      getHistory()
        .then(setHistory)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const clearHistory = () => {
    // In a real app, this would be an API call to delete all records
    // For now we'll just clear the state, though it will return on refresh
    setHistory([]);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <div className="flex items-start justify-between mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HistoryIcon className="w-5 h-5 text-fern" />
              <span className="text-sm text-muted-foreground">Wellness History</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Check-In History</h1>
            <p className="text-muted-foreground">A record of your past symptom check-ins and analyses.</p>
          </div>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="gap-2 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>

        {loading ? (
          <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center animate-pulse">
            <p className="text-muted-foreground">Loading your wellness journey...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <HistoryIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No check-ins yet</h3>
            <p className="text-muted-foreground mb-6">Complete your first wellness check-in to see your history here.</p>
            <Button asChild className="gradient-primary text-primary-foreground border-0">
              <Link to="/dashboard">Start a Check-In</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry, i) => (
              <HistoryEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
