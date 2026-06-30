import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Listing Optimization ───────────────────────────────────
export async function optimizeListing(listing: {
  title: string;
  description: string;
  category: string;
  asking_price: number;
  monthly_revenue?: number;
  tech_stack?: string[];
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a premium software marketplace advisor for Softwarise — the leading software economy platform. 
        Help sellers create compelling, accurate listings that attract qualified buyers. 
        Return a JSON object with: { title, short_description, description, seo_keywords }.
        Keep the tone professional, factual, and investor-grade. No hyperbole.`,
      },
      {
        role: 'user',
        content: `Optimize this listing:
Title: ${listing.title}
Category: ${listing.category}
Description: ${listing.description}
Asking Price: $${listing.asking_price.toLocaleString()}
${listing.monthly_revenue ? `Monthly Revenue: $${listing.monthly_revenue.toLocaleString()}` : ''}
${listing.tech_stack?.length ? `Tech Stack: ${listing.tech_stack.join(', ')}` : ''}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  return JSON.parse(content) as {
    title: string;
    short_description: string;
    description: string;
    seo_keywords: string[];
  };
}

// ── Valuation Suggestion ───────────────────────────────────
export async function suggestValuation(data: {
  category: string;
  monthly_revenue: number;
  monthly_profit: number;
  growth_rate: number;
  age_months: number;
  tech_stack: string[];
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a software business valuation expert. 
        Analyze the provided metrics and suggest a fair market valuation range.
        Return JSON: { min_valuation, max_valuation, recommended_multiple, reasoning, comparable_deals }.
        Use standard SaaS multiples (ARR multiples, seller's discretionary earnings multiples).`,
      },
      {
        role: 'user',
        content: `Suggest a valuation for this software business:
Category: ${data.category}
Monthly Revenue: $${data.monthly_revenue.toLocaleString()}
Monthly Profit: $${data.monthly_profit.toLocaleString()}
Growth Rate: ${data.growth_rate}% MoM
Age: ${data.age_months} months
Tech Stack: ${data.tech_stack.join(', ')}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  return JSON.parse(content) as {
    min_valuation: number;
    max_valuation: number;
    recommended_multiple: number;
    reasoning: string;
    comparable_deals: string[];
  };
}

// ── Investor-Startup Matching ──────────────────────────────
export async function matchInvestorToStartups(investor: {
  preferred_industries: string[];
  preferred_stages: string[];
  preferred_countries: string[];
  min_check_size: number;
  max_check_size: number;
}, startups: Array<{
  id: string;
  company_name: string;
  industry: string;
  stage: string;
  country: string;
  funding_goal: number;
  traction: string;
}>) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a venture capital matching algorithm. 
        Score and rank startups for an investor based on fit criteria.
        Return JSON array: [{ startup_id, match_score (0-100), match_reasons }] sorted by score descending.`,
      },
      {
        role: 'user',
        content: `Investor criteria: ${JSON.stringify(investor)}
        
Available startups: ${JSON.stringify(startups)}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.2,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  return JSON.parse(content) as {
    matches: Array<{ startup_id: string; match_score: number; match_reasons: string[] }>;
  };
}

// ── Due Diligence AI Summary ───────────────────────────────
export async function generateDueDiligenceSummary(documents: string[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a professional M&A advisor conducting due diligence on a software business. 
        Analyze provided documents and create a structured due diligence report.
        Return JSON: { executive_summary, key_strengths, risk_factors, financial_health, technical_assessment, recommendation }.`,
      },
      {
        role: 'user',
        content: `Analyze these documents for due diligence:\n\n${documents.join('\n\n---\n\n')}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  return JSON.parse(content);
}

// ── Project Scope Estimator ────────────────────────────────
export async function estimateProjectScope(requirements: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a senior software architect and project manager.
        Analyze project requirements and provide accurate scope estimates.
        Return JSON: { estimated_weeks, complexity (low/medium/high/enterprise), suggested_budget_min, suggested_budget_max, key_deliverables, tech_recommendations, risks }.`,
      },
      {
        role: 'user',
        content: `Estimate scope for this project:\n\n${requirements}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.4,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  return JSON.parse(content);
}
