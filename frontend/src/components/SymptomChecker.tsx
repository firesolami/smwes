import { useState } from 'react';
import { SYMPTOMS, analyzeSymptoms, AnalysisResult } from '@/lib/expertSystem';
import { Button } from '@/components/ui/button';
import { ConditionCard } from './AnalysisResult';
import { CheckCircle2, Circle, ChevronRight, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

const CATEGORIES = ['Mood', 'Anxiety', 'Physical', 'Sleep', 'Cognitive', 'Academic', 'Social', 'Crisis'];

const categoryColors: Record<string, string> = {
  Mood: 'bg-violet-100 text-violet-700 border-violet-200',
  Anxiety: 'bg-amber-100 text-amber-700 border-amber-200',
  Physical: 'bg-blue-100 text-blue-700 border-blue-200',
  Sleep: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Cognitive: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Academic: 'bg-fern/15 text-hunter-green border-fern/30',
  Social: 'bg-pink-100 text-pink-700 border-pink-200',
  Crisis: 'bg-red-100 text-red-700 border-red-200',
};

export default function SymptomChecker() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [step, setStep] = useState<'select' | 'result'>('select');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSymptom = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAnalyze = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeSymptoms(Array.from(selected));
      setResult(analysis);
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelected(new Set());
    setResult(null);
    setStep('select');
  };

  const severityBannerConfig = {
    low: { bg: 'bg-dry-sage/20 border-dry-sage/40', icon: '🌿', text: 'text-hunter-green' },
    moderate: { bg: 'bg-fern/10 border-fern/30', icon: '🍃', text: 'text-hunter-green' },
    high: { bg: 'bg-amber-50 border-amber-200', icon: '⚠️', text: 'text-amber-800' },
    critical: { bg: 'bg-red-50 border-red-300', icon: '🆘', text: 'text-red-800' },
  };

  if (step === 'result' && result) {
    const bannerCfg = severityBannerConfig[result.overallSeverity];
    return (
      <div className="animate-fade-in space-y-6">
        {/* Summary banner */}
        <div className={`rounded-xl border p-5 ${bannerCfg.bg}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{bannerCfg.icon}</span>
            <div>
              <h3 className={`font-display font-semibold text-lg mb-1 ${bannerCfg.text}`}>
                Analysis Complete
              </h3>
              <p className={`text-sm leading-relaxed ${bannerCfg.text}`}>{result.summary}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {result.results.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <CheckCircle2 className="w-12 h-12 text-fern mx-auto mb-3" />
            <p className="font-display text-lg font-medium text-foreground">No significant patterns detected</p>
            <p className="text-sm mt-1">That said, how you feel is always valid. Reach out if you need support.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{result.results.length}</span> potential area{result.results.length > 1 ? 's' : ''} identified based on your symptoms:
            </p>
            {result.results.map((condition, i) => (
              <ConditionCard key={condition.id} condition={condition} index={i} />
            ))}
          </div>
        )}

        {/* Global Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Local Help Resources</h4>
            {result.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="block p-3 rounded-xl border border-border bg-card hover:bg-muted text-sm transition-colors"
              >
                <p className="font-medium text-hunter-green">{link.title}</p>
                <p className="text-xs text-muted-foreground truncate">{link.url}</p>
              </a>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Nigerian Professionals</h4>
            {result.professionals.map((pro, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-card text-sm">
                <p className="font-medium text-hunter-green">{pro.role}</p>
                <p className="text-xs text-muted-foreground mb-1">{pro.contact}</p>
                <p className="text-xs leading-relaxed">{pro.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Start New Check-In
          </Button>
          <p className="text-xs text-muted-foreground">This session has been saved to your history.</p>
        </div>

        <div className="rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This expert system uses structured clinical rules, not generative AI. It provides informational guidance only and does not constitute a medical diagnosis. Always consult a qualified mental health professional for a comprehensive assessment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">How are you feeling?</h2>
          <p className="text-sm text-muted-foreground mt-1">Select all symptoms you've been experiencing recently</p>
        </div>
        {selected.size > 0 && (
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <button onClick={() => setSelected(new Set())} className="text-xs text-fern hover:underline">Clear all</button>
          </div>
        )}
      </div>

      {CATEGORIES.map(category => {
        const symptoms = SYMPTOMS.filter(s => s.category === category);
        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryColors[category]}`}>
                {category}
              </span>
              {category === 'Crisis' && (
                <span className="text-xs text-muted-foreground">⚠️ Sensitive — please answer honestly</span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {symptoms.map(symptom => {
                const isSelected = selected.has(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border text-sm ${isSelected
                      ? category === 'Crisis'
                        ? 'bg-red-50 border-red-300 text-red-800'
                        : 'bg-fern/10 border-fern/50 text-foreground shadow-sm'
                      : 'bg-card border-border text-foreground hover:border-fern/40 hover:bg-fern/5'
                      }`}
                  >
                    {isSelected
                      ? <CheckCircle2 className={`w-4 h-4 shrink-0 ${category === 'Crisis' ? 'text-red-500' : 'text-fern'}`} />
                      : <Circle className="w-4 h-4 shrink-0 text-muted-foreground" />
                    }
                    <span>{symptom.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-background via-background">
        <Button
          onClick={handleAnalyze}
          disabled={selected.size === 0 || loading}
          className="w-full gap-2 gradient-primary text-primary-foreground border-0 py-6 text-base font-medium shadow-elegant"
          size="lg"
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyse My Symptoms
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
        {selected.size === 0 && (
          <p className="text-center text-xs text-muted-foreground mt-2">Select at least one symptom to continue</p>
        )}
      </div>
    </div>
  );
}
