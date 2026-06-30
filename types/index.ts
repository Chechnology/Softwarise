// ============================================================
// SOFTWARISE — Complete Type System
// ============================================================

export type UserRole =
  | 'buyer'
  | 'seller'
  | 'founder'
  | 'investor'
  | 'client'
  | 'agency'
  | 'freelancer'
  | 'admin';

export type ListingCategory =
  | 'saas'
  | 'mobile_app'
  | 'website'
  | 'domain'
  | 'software_business'
  | 'source_code'
  | 'api'
  | 'plugin'
  | 'ecommerce'
  | 'newsletter';

export type ListingStatus =
  | 'draft'
  | 'pending_review'
  | 'active'
  | 'under_offer'
  | 'sold'
  | 'archived'
  | 'rejected';

export type InvestmentStage =
  | 'pre_seed'
  | 'seed'
  | 'series_a'
  | 'series_b'
  | 'series_c'
  | 'growth'
  | 'pre_ipo';

export type ProjectCategory =
  | 'website'
  | 'saas'
  | 'mobile_app'
  | 'ai_product'
  | 'enterprise_software'
  | 'custom_solution'
  | 'ecommerce'
  | 'api_integration'
  | 'data_analytics';

export type ProjectStatus =
  | 'open'
  | 'in_review'
  | 'hired'
  | 'in_progress'
  | 'completed'
  | 'disputed'
  | 'cancelled';

export type ProposalStatus =
  | 'submitted'
  | 'shortlisted'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type TransactionType =
  | 'listing_sale'
  | 'investment'
  | 'project_payment'
  | 'milestone_release'
  | 'platform_fee'
  | 'subscription'
  | 'advertisement';

export type TransactionStatus =
  | 'pending'
  | 'in_escrow'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'disputed';

export type AdPlacement =
  | 'homepage_hero'
  | 'homepage_featured'
  | 'marketplace_sidebar'
  | 'marketplace_banner'
  | 'newsletter_top'
  | 'newsletter_bottom';

// ============================================================
// USERS & PROFILES
// ============================================================

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_verified: boolean;
  is_kyc_verified: boolean;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  bio: string | null;
  website_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  country: string | null;
  city: string | null;
  timezone: string | null;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  total_deals: number;
  total_volume: number;
  reputation_score: number;
  created_at: string;
}

// ============================================================
// LISTINGS (SOFTWARE SALE)
// ============================================================

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  category: ListingCategory;
  status: ListingStatus;
  short_description: string;
  description: string;
  asking_price: number;
  currency: string;
  monthly_revenue: number | null;
  monthly_profit: number | null;
  annual_revenue: number | null;
  monthly_traffic: number | null;
  total_users: number | null;
  active_users: number | null;
  growth_rate: number | null;
  established_year: number | null;
  tech_stack: string[];
  country: string | null;
  demo_url: string | null;
  is_featured: boolean;
  is_sponsored: boolean;
  views_count: number;
  saves_count: number;
  offers_count: number;
  verified_financials: boolean;
  due_diligence_available: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  expires_at: string | null;
  // Relations
  seller?: User;
  assets?: ListingAsset[];
  metrics?: ListingMetric[];
}

export interface ListingAsset {
  id: string;
  listing_id: string;
  type: 'screenshot' | 'demo_video' | 'document' | 'logo';
  url: string;
  name: string;
  size: number | null;
  order: number;
  created_at: string;
}

export interface ListingMetric {
  id: string;
  listing_id: string;
  metric_type: 'revenue' | 'traffic' | 'users' | 'profit';
  period: string;
  value: number;
  created_at: string;
}

export interface Offer {
  id: string;
  listing_id: string;
  buyer_id: string;
  amount: number;
  currency: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'withdrawn';
  counter_amount: number | null;
  expires_at: string;
  created_at: string;
}

export interface AcquisitionRoom {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  status: 'active' | 'due_diligence' | 'legal' | 'completed' | 'failed';
  progress: number;
  agreed_price: number | null;
  created_at: string;
}

// ============================================================
// INVESTMENTS
// ============================================================

export interface StartupProfile {
  id: string;
  user_id: string;
  company_name: string;
  slug: string;
  tagline: string;
  description: string;
  website_url: string | null;
  logo_url: string | null;
  cover_url: string | null;
  industry: string;
  stage: InvestmentStage;
  country: string;
  founded_year: number;
  team_size: number;
  monthly_revenue: number | null;
  annual_revenue: number | null;
  mrr_growth: number | null;
  total_users: number | null;
  funding_goal: number;
  equity_offered: number;
  pre_money_valuation: number;
  total_raised: number;
  is_active: boolean;
  is_featured: boolean;
  is_verified: boolean;
  tech_stack: string[];
  problem_statement: string;
  solution: string;
  market_size: string;
  traction: string;
  use_of_funds: string;
  created_at: string;
  updated_at: string;
}

export interface InvestorProfile {
  id: string;
  user_id: string;
  fund_name: string;
  slug: string;
  bio: string;
  website_url: string | null;
  logo_url: string | null;
  investor_type: 'angel' | 'vc' | 'family_office' | 'corporate' | 'accelerator';
  min_check_size: number;
  max_check_size: number;
  preferred_stages: InvestmentStage[];
  preferred_industries: string[];
  preferred_countries: string[];
  portfolio_count: number;
  total_deployed: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface DealRoom {
  id: string;
  startup_id: string;
  investor_id: string;
  status: 'intro' | 'screening' | 'due_diligence' | 'term_sheet' | 'closing' | 'invested' | 'passed';
  investment_amount: number | null;
  equity_percentage: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// MANUFACTURING (SOFTWARE BUILDING)
// ============================================================

export interface ProjectRequest {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  requirements: string;
  budget_min: number;
  budget_max: number;
  currency: string;
  timeline_weeks: number;
  is_fixed_price: boolean;
  is_featured: boolean;
  skills_required: string[];
  proposals_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  deadline: string | null;
}

export interface AgencyProfile {
  id: string;
  user_id: string;
  company_name: string;
  slug: string;
  tagline: string;
  description: string;
  website_url: string | null;
  logo_url: string | null;
  country: string;
  team_size: number;
  founded_year: number;
  hourly_rate: number | null;
  skills: string[];
  industries: string[];
  total_projects: number;
  rating: number;
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface FreelancerProfile {
  id: string;
  user_id: string;
  display_name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  country: string;
  hourly_rate: number;
  skills: string[];
  years_experience: number;
  total_projects: number;
  rating: number;
  is_available: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Proposal {
  id: string;
  project_id: string;
  proposer_id: string;
  proposer_type: 'agency' | 'freelancer';
  status: ProposalStatus;
  cover_letter: string;
  proposed_amount: number;
  currency: string;
  timeline_weeks: number;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  proposal_id: string | null;
  title: string;
  description: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid';
  created_at: string;
}

// ============================================================
// MONETIZATION
// ============================================================

export interface Advertisement {
  id: string;
  advertiser_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  cta_text: string;
  cta_url: string;
  placement: AdPlacement;
  status: 'active' | 'paused' | 'ended' | 'pending_review';
  start_date: string;
  end_date: string;
  daily_budget: number;
  total_budget: number;
  total_spent: number;
  impressions: number;
  clicks: number;
  created_at: string;
}

export interface Sponsorship {
  id: string;
  sponsor_id: string;
  listing_id: string | null;
  type: 'featured_listing' | 'homepage_slot' | 'newsletter' | 'community';
  duration_days: number;
  amount: number;
  status: 'active' | 'ended' | 'pending';
  starts_at: string;
  ends_at: string;
  created_at: string;
}

// ============================================================
// MESSAGING
// ============================================================

export interface Conversation {
  id: string;
  type: 'direct' | 'acquisition_room' | 'deal_room' | 'project_room';
  reference_id: string | null;
  participants: string[];
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'file' | 'offer' | 'system';
  attachments: MessageAttachment[];
  is_read: boolean;
  created_at: string;
  sender?: User;
}

export interface MessageAttachment {
  name: string;
  url: string;
  type: string;
  size: number;
}

// ============================================================
// PAYMENTS & TRANSACTIONS
// ============================================================

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  platform_fee: number;
  net_amount: number;
  from_user_id: string;
  to_user_id: string | null;
  reference_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_transfer_id: string | null;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
  completed_at: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  stripe_subscription_id: string | null;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

// ============================================================
// DOCUMENTS
// ============================================================

export interface Document {
  id: string;
  uploader_id: string;
  reference_type: 'listing' | 'startup' | 'project' | 'acquisition' | 'deal';
  reference_id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  is_confidential: boolean;
  access_user_ids: string[];
  created_at: string;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  action_url: string | null;
  is_read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ============================================================
// REVIEWS
// ============================================================

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  reference_type: 'listing' | 'project' | 'startup';
  reference_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified: boolean;
  created_at: string;
  reviewer?: User;
}

// ============================================================
// DASHBOARD
// ============================================================

export interface DashboardStats {
  total_listings: number;
  active_listings: number;
  total_revenue: number;
  pending_offers: number;
  active_investments: number;
  active_projects: number;
  unread_messages: number;
  total_views: number;
  monthly_growth: number;
}

// ============================================================
// API RESPONSES
// ============================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ============================================================
// FILTERS & SEARCH
// ============================================================

export interface ListingFilters {
  category?: ListingCategory[];
  min_price?: number;
  max_price?: number;
  min_revenue?: number;
  max_revenue?: number;
  country?: string[];
  tech_stack?: string[];
  growth_rate?: 'positive' | 'negative';
  is_featured?: boolean;
  verified_financials?: boolean;
  sort_by?: 'newest' | 'price_asc' | 'price_desc' | 'revenue_desc' | 'views';
  search?: string;
  page?: number;
  per_page?: number;
}

export interface InvestmentFilters {
  stage?: InvestmentStage[];
  industry?: string[];
  country?: string[];
  min_valuation?: number;
  max_valuation?: number;
  min_goal?: number;
  max_goal?: number;
  is_featured?: boolean;
  sort_by?: 'newest' | 'funding_goal' | 'traction';
  search?: string;
  page?: number;
  per_page?: number;
}

export interface ProjectFilters {
  category?: ProjectCategory[];
  min_budget?: number;
  max_budget?: number;
  skills?: string[];
  sort_by?: 'newest' | 'budget_desc' | 'deadline';
  search?: string;
  page?: number;
  per_page?: number;
}
