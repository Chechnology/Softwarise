import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(
  amount: number,
  currency = 'USD',
  compact = false
): string {
  if (compact && amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (compact && amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number
export function formatNumber(num: number, compact = false): string {
  if (compact && num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (compact && num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return new Intl.NumberFormat('en-US').format(num);
}

// Format percentage
export function formatPercent(value: number, digits = 1): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(digits)}%`;
}

// Format date
export function formatDate(date: string | Date, style: 'short' | 'medium' | 'long' = 'medium'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'long', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  }[style] as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('en-US', options).format(d);
}

// Time ago
export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(d, 'short');
}

// Generate slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Multiple revenue
export function calculateMultiple(askingPrice: number, annualRevenue: number): number {
  if (!annualRevenue || annualRevenue === 0) return 0;
  return Math.round((askingPrice / annualRevenue) * 10) / 10;
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

// Category labels
export const CATEGORY_LABELS: Record<string, string> = {
  saas: 'SaaS',
  mobile_app: 'Mobile App',
  website: 'Website',
  domain: 'Domain',
  software_business: 'Software Business',
  source_code: 'Source Code',
  api: 'API',
  plugin: 'Plugin',
  ecommerce: 'E-Commerce',
  newsletter: 'Newsletter',
};

export const STAGE_LABELS: Record<string, string> = {
  pre_seed: 'Pre-Seed',
  seed: 'Seed',
  series_a: 'Series A',
  series_b: 'Series B',
  series_c: 'Series C',
  growth: 'Growth',
  pre_ipo: 'Pre-IPO',
};

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  website: 'Website',
  saas: 'SaaS Product',
  mobile_app: 'Mobile App',
  ai_product: 'AI Product',
  enterprise_software: 'Enterprise Software',
  custom_solution: 'Custom Solution',
  ecommerce: 'E-Commerce',
  api_integration: 'API Integration',
  data_analytics: 'Data Analytics',
};

// Status colors
export const STATUS_COLORS: Record<string, string> = {
  active: 'text-success',
  sold: 'text-primary',
  draft: 'text-muted-foreground',
  pending_review: 'text-accent',
  under_offer: 'text-yellow-500',
  rejected: 'text-error',
  archived: 'text-muted-foreground',
};

// Debounce
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}

// Countries list (abbreviated)
export const COUNTRIES = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Ethiopia',
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
  'India', 'Singapore', 'UAE', 'Australia', 'Brazil', 'Mexico',
  'Indonesia', 'Philippines', 'Pakistan', 'Other'
];

// Tech stack options
export const TECH_STACKS = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte',
  'Node.js', 'Python', 'Django', 'FastAPI', 'Laravel', 'Ruby on Rails',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase',
  'AWS', 'GCP', 'Azure', 'Vercel', 'Netlify',
  'Stripe', 'OpenAI', 'TypeScript', 'Go', 'Rust', 'Flutter', 'React Native',
];
