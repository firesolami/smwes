import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<'login' | 'signup'>(params.get('tab') === 'signup' ? 'signup' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (tab === 'login') {
      result = await login(email, password);
    } else {
      if (!name) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      result = await register(email, password, name);
    }

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Authentication failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex gradient-subtle">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 gradient-primary p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-lg text-primary-foreground">
            Serenity<span className="text-dry-sage">ES</span>
          </span>
        </Link>

        <div>
          <blockquote className="font-display text-3xl font-medium text-primary-foreground leading-snug mb-6 italic">
            "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated — you are human."
          </blockquote>
          <p className="text-primary-foreground/70 text-sm">— Lori Deschene</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['Rule-Based Analysis', 'Confidential & Safe', 'Tracked Over Time'].map((item, i) => (
            <div key={i} className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20">
              <p className="text-primary-foreground/90 text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-lg">Serenity<span className="text-fern">AI</span></span>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {tab === 'login'
              ? 'Sign in to access your wellness dashboard.'
              : 'Start your mental wellness journey today.'}
          </p>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'login' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'signup' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-11 border-border focus:border-fern focus:ring-fern/20"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@student.babcock.edu.ng"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="h-11 border-border focus:border-fern"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="h-11 border-border focus:border-fern pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-lg">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 gradient-primary text-primary-foreground border-0 font-medium text-sm mt-2"
            >
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8">
            This is a prototype system. For demonstration purposes only.
            <br />Always seek professional help for serious mental health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
