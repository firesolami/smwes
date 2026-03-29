const API_URL = import.meta.env.VITE_API_URL;

export interface Symptom {
  id: string;
  label: string;
  category: string;
  weight: number;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  score: number;
  matchedSymptoms: string[];
  recommendations?: string[];
  selfHelpLinks?: { title: string; url: string }[];
  professionals?: { role: string; contact: string; description: string }[];
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  symptoms: string[];
  results: Condition[]; // Renamed from conditions to results to match backend
  overallSeverity: 'low' | 'moderate' | 'high' | 'critical';
  summary: string;
  professionals: { role: string; contact: string; description: string }[];
  links: { title: string; url: string }[];
}

export const SYMPTOMS: Symptom[] = [
  // Mood / Depression
  { id: 'sadness', label: 'Feeling down, depressed, or hopeless', category: 'Mood', weight: 3 },
  { id: 'anhedonia', label: 'Little interest or pleasure in doing things', category: 'Mood', weight: 3 },
  { id: 'worthlessness', label: 'Feeling bad about yourself or that you are a failure', category: 'Mood', weight: 4 },
  { id: 'hopelessness', label: 'Feeling hopeless about the future', category: 'Mood', weight: 4 },
  { id: 'guilt', label: 'Excessive or inappropriate guilt', category: 'Mood', weight: 3 },
  { id: 'irritability', label: 'Irritability or angry outbursts', category: 'Mood', weight: 2 },
  { id: 'mood_swings', label: 'Sudden or extreme mood swings', category: 'Mood', weight: 3 },

  // Anxiety
  { id: 'anxious', label: 'Feeling nervous, anxious, or on edge', category: 'Anxiety', weight: 3 },
  { id: 'uncontrolled_worry', label: 'Not being able to stop or control worrying', category: 'Anxiety', weight: 4 },
  { id: 'excessive_worry', label: 'Worrying too much about different things', category: 'Anxiety', weight: 3 },
  { id: 'restlessness', label: 'Being so restless that it is hard to sit still', category: 'Anxiety', weight: 3 },
  { id: 'fear_of_doom', label: 'Feeling afraid as if something awful might happen', category: 'Anxiety', weight: 4 },
  { id: 'trouble_relaxing', label: 'Trouble relaxing', category: 'Anxiety', weight: 2 },
  { id: 'racing_thoughts', label: 'Racing or intrusive thoughts', category: 'Anxiety', weight: 3 },

  // Physical / Somatic
  { id: 'fatigue', label: 'Feeling tired or having little energy', category: 'Physical', weight: 2 },
  { id: 'appetite_change', label: 'Significant changes in appetite or weight', category: 'Physical', weight: 2 },
  { id: 'chest_tightness', label: 'Chest tightness or rapid heartbeat', category: 'Physical', weight: 3 },
  { id: 'muscle_tension', label: 'Muscle tension or body aches', category: 'Physical', weight: 2 },
  { id: 'headaches', label: 'Frequent headaches or tension headaches', category: 'Physical', weight: 1 },
  { id: 'sweating', label: 'Excessive sweating or trembling', category: 'Physical', weight: 2 },
  { id: 'shortness_of_breath', label: 'Shortness of breath without physical exertion', category: 'Physical', weight: 3 },

  // Sleep
  { id: 'insomnia', label: 'Difficulty falling or staying asleep', category: 'Sleep', weight: 3 },
  { id: 'hypersomnia', label: 'Sleeping too much', category: 'Sleep', weight: 2 },
  { id: 'nightmares', label: 'Distressing dreams or nightmares', category: 'Sleep', weight: 2 },
  { id: 'early_waking', label: 'Waking up too early and unable to get back to sleep', category: 'Sleep', weight: 2 },

  // Cognitive
  { id: 'concentration', label: 'Trouble concentrating on tasks', category: 'Cognitive', weight: 2 },
  { id: 'memory_issues', label: 'Difficulty remembering things', category: 'Cognitive', weight: 2 },
  { id: 'indecisiveness', label: 'Trouble making everyday decisions', category: 'Cognitive', weight: 1 },
  { id: 'brain_fog', label: 'Feeling mentally "cloudy" or slow', category: 'Cognitive', weight: 2 },

  // Social / Relationships
  { id: 'social_avoidance', label: 'Avoiding people or social situations', category: 'Social', weight: 3 },
  { id: 'social_fear', label: 'Fear of being judged or scrutinized by others', category: 'Social', weight: 3 },
  { id: 'loneliness', label: 'Feeling alone even when around others', category: 'Social', weight: 2 },
  { id: 'withdrawal', label: 'Withdrawing from friends and family', category: 'Social', weight: 3 },

  // Trauma / PTSD
  { id: 'flashbacks', label: 'Reliving a traumatic event (flashbacks)', category: 'Trauma', weight: 5 },
  { id: 'trauma_avoidance', label: 'Avoiding reminders of a traumatic event', category: 'Trauma', weight: 4 },
  { id: 'hypervigilance', label: 'Feeling constantly "on guard"', category: 'Trauma', weight: 4 },
  { id: 'startle_response', label: 'Being easily startled or jumpy', category: 'Trauma', weight: 3 },

  // Compulsion / OCD
  { id: 'obsessions', label: 'Intrusive, unwanted repetitive thoughts', category: 'Compulsion', weight: 4 },
  { id: 'compulsions', label: 'Repetitive behaviors you feel driven to perform', category: 'Compulsion', weight: 4 },
  { id: 'need_for_order', label: 'Excessive need for things to be "just right"', category: 'Compulsion', weight: 2 },

  // Crisis
  { id: 'self_harm_thoughts', label: 'Thoughts of hurting yourself', category: 'Crisis', weight: 10 },
  { id: 'suicidal_thoughts', label: 'Thoughts that you would be better off dead', category: 'Crisis', weight: 10 },
  { id: 'suicidal_intent', label: 'Having a plan or intent to end your life', category: 'Crisis', weight: 20 },
];

export async function analyzeSymptoms(selectedSymptomIds: string[]): Promise<AnalysisResult> {
  const token = localStorage.getItem('wellness_token');
  const response = await fetch(`${API_URL}/assessment/assess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ symptoms: selectedSymptomIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze symptoms');
  }

  return response.json();
}

export async function getHistory(): Promise<AnalysisResult[]> {
  const token = localStorage.getItem('wellness_token');
  const response = await fetch(`${API_URL}/assessment/history`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
}

export function getSymptomLabel(id: string): string {
  return SYMPTOMS.find(s => s.id === id)?.label || id;
}
