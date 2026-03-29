import { Condition, getSymptomLabel } from '@/lib/expertSystem';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Phone, AlertTriangle, Info, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const severityConfig = {
  low: { label: 'Mild', color: 'bg-dry-sage/20 text-hunter-green border-dry-sage/40', dot: 'bg-dry-sage' },
  moderate: { label: 'Moderate', color: 'bg-fern/15 text-hunter-green border-fern/40', dot: 'bg-fern' },
  high: { label: 'Significant', color: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
  critical: { label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-200', dot: 'bg-red-500' },
};

interface ConditionCardProps {
  condition: Condition;
  index: number;
}

export function ConditionCard({ condition, index }: ConditionCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const config = severityConfig[condition.severity];
  const showResources = condition.severity === 'high' || condition.severity === 'critical';

  return (
    <div
      className={`rounded-xl border shadow-card overflow-hidden transition-all duration-300 ${condition.severity === 'critical'
        ? 'border-red-200 bg-red-50/50'
        : 'border-border bg-card'
        }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3 flex-1">
          {condition.severity === 'critical' && (
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-display font-semibold text-foreground">{condition.name}</h3>
              <Badge className={`text-xs border ${config.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot} mr-1.5`} />
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{condition.description}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
          {/* Matched symptoms */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Symptoms identified</p>
            <div className="flex flex-wrap gap-1.5">
              {condition.matchedSymptoms.map(sid => (
                <span key={sid} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/50">
                  {getSymptomLabel(sid)}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {condition.recommendations && condition.recommendations.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Info className="w-3.5 h-3.5 text-fern" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommendations</p>
              </div>
              <ul className="space-y-1.5">
                {condition.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2">
                    <span className="text-fern font-bold mt-0.5">·</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Self-help links */}
          {condition.selfHelpLinks && condition.selfHelpLinks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-fern" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Self-Help Resources</p>
              </div>
              <div className="space-y-1.5">
                {condition.selfHelpLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-fern hover:text-hunter-green transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="group-hover:underline">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Professional contacts — shown for high/critical */}
          {condition.professionals && condition.professionals.length > 0 && (
            <div className={`rounded-lg p-4 ${condition.severity === 'critical' ? 'bg-red-100/80' : 'bg-muted/60'}`}>
              <div className="flex items-center gap-1.5 mb-3">
                <Phone className="w-3.5 h-3.5 text-hunter-green" />
                <p className="text-xs font-medium text-hunter-green uppercase tracking-wide">Professional Support</p>
              </div>
              <div className="space-y-3">
                {condition.professionals.map((prof, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-hunter-green/15 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-hunter-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{prof.role}</p>
                      <p className="text-sm text-fern font-medium">{prof.contact}</p>
                      <p className="text-xs text-muted-foreground">{prof.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
