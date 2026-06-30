'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { PROJECT_CATEGORY_LABELS, TECH_STACKS } from '@/lib/utils';

export function ProjectCreationForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('saas');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [timelineWeeks, setTimelineWeeks] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiEstimate, setAiEstimate] = useState<{
    estimated_weeks: number;
    complexity: string;
    suggested_budget_min: number;
    suggested_budget_max: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const toggleSkill = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handleEstimate = async () => {
    if (!requirements) {
      toast.error('Add project requirements first');
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch('/api/projects/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements }),
      });
      const result = await res.json();
      if (result.data) {
        setAiEstimate(result.data);
        setTimelineWeeks(String(result.data.estimated_weeks));
        setBudgetMin(String(result.data.suggested_budget_min));
        setBudgetMax(String(result.data.suggested_budget_max));
        toast.success('Scope estimated!');
      }
    } catch {
      toast.error('Estimation failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, category, description, requirements,
          budget_min: Number(budgetMin), budget_max: Number(budgetMax),
          timeline_weeks: Number(timelineWeeks), skills_required: skills,
        }),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      toast.success('Project posted successfully!');
      router.push(`/projects/${result.data?.id || ''}`);
    } catch {
      toast.error('Failed to post project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface rounded-2xl p-8 space-y-6">
      <div>
        <label className="text-sm text-white font-medium mb-2 block">Project Title</label>
        <input
          type="text"
          placeholder="e.g. Build a B2B Invoicing SaaS Platform"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label className="text-sm text-white font-medium mb-2 block">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
          {Object.entries(PROJECT_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value} className="bg-[#18191C]">{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-white font-medium mb-2 block">Short Description</label>
        <textarea
          placeholder="A brief overview of what you're looking to build"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="input resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-white font-medium">Detailed Requirements</label>
          <button
            type="button"
            onClick={handleEstimate}
            disabled={aiLoading}
            className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors disabled:opacity-50"
          >
            {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            AI Estimate Scope
          </button>
        </div>
        <textarea
          placeholder="List specific features, integrations, target platforms, and any technical constraints..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
          rows={6}
          className="input resize-none"
        />
      </div>

      {aiEstimate && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-white font-medium mb-1">AI Scope Estimate</p>
            <p className="text-xs text-[#A1A1AA]">
              Complexity: <span className="text-primary capitalize">{aiEstimate.complexity}</span> ·
              Estimated timeline: <span className="text-primary">{aiEstimate.estimated_weeks} weeks</span> ·
              Suggested budget: <span className="text-primary">${aiEstimate.suggested_budget_min.toLocaleString()}–${aiEstimate.suggested_budget_max.toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white font-medium mb-2 block">Min Budget (USD)</label>
          <input type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} required className="input" />
        </div>
        <div>
          <label className="text-sm text-white font-medium mb-2 block">Max Budget (USD)</label>
          <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} required className="input" />
        </div>
        <div>
          <label className="text-sm text-white font-medium mb-2 block">Timeline (weeks)</label>
          <input type="number" value={timelineWeeks} onChange={(e) => setTimelineWeeks(e.target.value)} required className="input" />
        </div>
      </div>

      <div>
        <label className="text-sm text-white font-medium mb-2 block">Required Skills</label>
        <div className="flex flex-wrap gap-2">
          {TECH_STACKS.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => toggleSkill(tech)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                skills.includes(tech)
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'bg-white/[0.03] border-white/[0.08] text-[#A1A1AA] hover:border-white/20'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow disabled:opacity-60"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Project'}
      </button>
    </form>
  );
}
