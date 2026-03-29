import heroImage from '@/assets/hero-forest.jpg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Brain, Shield, GitBranch, History, ExternalLink,
  CheckCircle, ArrowRight, Leaf, Users, BookOpen
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Rule-Based Expert Analysis',
    description: 'Built on structured clinical knowledge rules, not generative AI — giving you transparent, consistent, and explainable results every time.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your check-ins are stored securely. No data is sent to external AI servers. Your mental health journey stays yours.',
  },
  {
    icon: GitBranch,
    title: 'Guided Symptom Mapping',
    description: 'Carefully curated symptom categories based on validated clinical frameworks — not a chatbot guessing from your free text.',
  },
  {
    icon: History,
    title: 'Wellness History',
    description: 'Track your mental health over time. Review past check-ins and see how your wellbeing evolves.',
  },
  {
    icon: ExternalLink,
    title: 'Curated Resources',
    description: 'Receive tailored self-help links and professional contacts, matched to the severity of your results.',
  },
  {
    icon: Users,
    title: 'Professional Referrals',
    description: 'For serious concerns, get direct contact information for campus counsellors and crisis lines — real help, fast.',
  },
];

const advantages = [
  { llm: 'Unpredictable, sometimes inconsistent answers', expert: 'Deterministic, rule-based logic — same input, same reasoning' },
  { llm: 'Cannot explain how it reached its conclusion', expert: 'Transparent reasoning: each condition shows matched symptoms' },
  { llm: 'May hallucinate or over- or under-diagnose', expert: 'Clinically-grounded thresholds with severity calibration' },
  { llm: 'Sends your data to external AI services', expert: 'All analysis runs locally — your data never leaves your device' },
  { llm: 'Generic responses lacking structured clinical grounding', expert: 'Built on structured mental health knowledge bases' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in">
            <Leaf className="w-4 h-4" />
            Student Mental Wellness Expert System
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight text-balance animate-slide-up">
            Your Mental Wellbeing
            <br />
            <span className="italic font-normal text-dry-sage">Understood, Not Guessed</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            Serenity uses a structured expert system — not a chatbot — to help you understand your mental health, track your wellbeing, and connect with the right support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              asChild
              className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base font-semibold px-8 py-6 shadow-elegant"
            >
              <Link to="/auth?tab=signup">
                Begin Your Check-In
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 backdrop-blur-sm"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary-foreground/60" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built for Student Wellbeing
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to understand, track, and support your mental health journey on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-elegant transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert System vs LLM comparison */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fern/10 text-fern text-sm font-medium mb-4 border border-fern/20">
              <BookOpen className="w-4 h-4" />
              Why an Expert System?
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Not Just Another Chatbot
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlike AI chatbots, Serenity uses a structured knowledge base modelled on clinical reasoning. The difference matters — especially for mental health.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl bg-muted/60 border border-border px-5 py-3 text-center">
                <p className="text-sm font-semibold text-muted-foreground">❌ LLM Chatbot</p>
              </div>
              <div className="rounded-xl gradient-primary px-5 py-3 text-center">
                <p className="text-sm font-semibold text-primary-foreground">✓ Serenity Expert System</p>
              </div>
            </div>

            <div className="space-y-3">
              {advantages.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted border border-border">
                    <span className="text-muted-foreground text-xs mt-0.5 font-bold shrink-0">✗</span>
                    <p className="text-sm text-muted-foreground">{row.llm}</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/25">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium">{row.expert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Ready to Check In?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
            Take a few minutes for yourself. It's confidential, judgment-free, and a small step towards understanding your wellbeing.
          </p>
          <Button
            size="lg"
            asChild
            className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-10 py-6 text-base shadow-elegant"
          >
            <Link to="/auth?tab=signup">
              Get Started — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-fern" />
            <span className="font-display font-semibold text-foreground">Serenity<span className="text-fern">AI</span></span>
          </div>
          <p className="text-xs text-muted-foreground">
            For informational purposes only. Not a substitute for professional mental health care.
          </p>
        </div>
      </footer>
    </div>
  );
}
