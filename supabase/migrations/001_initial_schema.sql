-- ============================================================
-- SOFTWARISE — Complete Database Schema
-- Migration: 001_initial_schema
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM (
  'buyer', 'seller', 'founder', 'investor', 'client',
  'agency', 'freelancer', 'admin'
);

CREATE TYPE listing_category AS ENUM (
  'saas', 'mobile_app', 'website', 'domain', 'software_business',
  'source_code', 'api', 'plugin', 'ecommerce', 'newsletter'
);

CREATE TYPE listing_status AS ENUM (
  'draft', 'pending_review', 'active', 'under_offer', 'sold', 'archived', 'rejected'
);

CREATE TYPE investment_stage AS ENUM (
  'pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth', 'pre_ipo'
);

CREATE TYPE project_category AS ENUM (
  'website', 'saas', 'mobile_app', 'ai_product', 'enterprise_software',
  'custom_solution', 'ecommerce', 'api_integration', 'data_analytics'
);

CREATE TYPE project_status AS ENUM (
  'open', 'in_review', 'hired', 'in_progress', 'completed', 'disputed', 'cancelled'
);

CREATE TYPE transaction_status AS ENUM (
  'pending', 'in_escrow', 'completed', 'failed', 'refunded', 'disputed'
);

CREATE TYPE ad_placement AS ENUM (
  'homepage_hero', 'homepage_featured', 'marketplace_sidebar',
  'marketplace_banner', 'newsletter_top', 'newsletter_bottom'
);

CREATE TYPE investor_type AS ENUM (
  'angel', 'vc', 'family_office', 'corporate', 'accelerator'
);

CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'enterprise');

-- ============================================================
-- USERS & PROFILES
-- ============================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'buyer',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT UNIQUE,
  banned_at TIMESTAMPTZ,
  ban_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  bio TEXT,
  website_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  country TEXT,
  city TEXT,
  timezone TEXT DEFAULT 'UTC',
  subscription_tier subscription_plan NOT NULL DEFAULT 'free',
  total_deals INTEGER NOT NULL DEFAULT 0,
  total_volume NUMERIC(15, 2) NOT NULL DEFAULT 0,
  reputation_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LISTINGS
-- ============================================================

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category listing_category NOT NULL,
  status listing_status NOT NULL DEFAULT 'draft',
  short_description TEXT NOT NULL CHECK (char_length(short_description) <= 280),
  description TEXT NOT NULL,
  asking_price NUMERIC(15, 2) NOT NULL CHECK (asking_price > 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  monthly_revenue NUMERIC(12, 2),
  monthly_profit NUMERIC(12, 2),
  annual_revenue NUMERIC(12, 2),
  monthly_traffic INTEGER,
  total_users INTEGER,
  active_users INTEGER,
  growth_rate NUMERIC(5, 2),
  established_year INTEGER,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  country TEXT,
  demo_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_sponsored BOOLEAN NOT NULL DEFAULT FALSE,
  views_count INTEGER NOT NULL DEFAULT 0,
  saves_count INTEGER NOT NULL DEFAULT 0,
  offers_count INTEGER NOT NULL DEFAULT 0,
  verified_financials BOOLEAN NOT NULL DEFAULT FALSE,
  due_diligence_available BOOLEAN NOT NULL DEFAULT FALSE,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

CREATE TABLE listing_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('screenshot', 'demo_video', 'document', 'logo')),
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  size BIGINT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE listing_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('revenue', 'traffic', 'users', 'profit')),
  period TEXT NOT NULL,
  value NUMERIC(15, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(15, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'rejected', 'countered', 'withdrawn')),
  counter_amount NUMERIC(15, 2),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE acquisition_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'due_diligence', 'legal', 'completed', 'failed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  agreed_price NUMERIC(15, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- ============================================================
-- INVESTMENTS
-- ============================================================

CREATE TABLE startup_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT NOT NULL CHECK (char_length(tagline) <= 160),
  description TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  cover_url TEXT,
  industry TEXT NOT NULL,
  stage investment_stage NOT NULL DEFAULT 'pre_seed',
  country TEXT NOT NULL,
  founded_year INTEGER NOT NULL,
  team_size INTEGER NOT NULL DEFAULT 1,
  monthly_revenue NUMERIC(12, 2),
  annual_revenue NUMERIC(12, 2),
  mrr_growth NUMERIC(5, 2),
  total_users INTEGER,
  funding_goal NUMERIC(15, 2) NOT NULL,
  equity_offered NUMERIC(5, 2) NOT NULL CHECK (equity_offered > 0 AND equity_offered <= 100),
  pre_money_valuation NUMERIC(15, 2) NOT NULL,
  total_raised NUMERIC(15, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  market_size TEXT,
  traction TEXT,
  use_of_funds TEXT,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE investor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fund_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  investor_type investor_type NOT NULL DEFAULT 'angel',
  min_check_size NUMERIC(15, 2) NOT NULL DEFAULT 0,
  max_check_size NUMERIC(15, 2) NOT NULL,
  preferred_stages investment_stage[] NOT NULL DEFAULT '{}',
  preferred_industries TEXT[] NOT NULL DEFAULT '{}',
  preferred_countries TEXT[] NOT NULL DEFAULT '{}',
  portfolio_count INTEGER NOT NULL DEFAULT 0,
  total_deployed NUMERIC(15, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deal_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID NOT NULL REFERENCES startup_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES investor_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'intro'
    CHECK (status IN ('intro', 'screening', 'due_diligence', 'term_sheet', 'closing', 'invested', 'passed')),
  investment_amount NUMERIC(15, 2),
  equity_percentage NUMERIC(5, 2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MANUFACTURING (SOFTWARE BUILDING)
-- ============================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category project_category NOT NULL,
  status project_status NOT NULL DEFAULT 'open',
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  budget_min NUMERIC(12, 2) NOT NULL,
  budget_max NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  timeline_weeks INTEGER NOT NULL,
  is_fixed_price BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  skills_required TEXT[] NOT NULL DEFAULT '{}',
  proposals_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deadline TIMESTAMPTZ
);

CREATE TABLE agency_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  country TEXT NOT NULL,
  team_size INTEGER NOT NULL DEFAULT 1,
  founded_year INTEGER,
  hourly_rate NUMERIC(8, 2),
  skills TEXT[] NOT NULL DEFAULT '{}',
  industries TEXT[] NOT NULL DEFAULT '{}',
  total_projects INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  country TEXT NOT NULL,
  hourly_rate NUMERIC(8, 2) NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  years_experience INTEGER NOT NULL DEFAULT 0,
  total_projects INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  proposer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  proposer_type TEXT NOT NULL CHECK (proposer_type IN ('agency', 'freelancer')),
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'shortlisted', 'accepted', 'rejected', 'withdrawn')),
  cover_letter TEXT NOT NULL,
  proposed_amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  timeline_weeks INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'submitted', 'approved', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MONETIZATION
-- ============================================================

CREATE TABLE advertisements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  cta_text TEXT NOT NULL,
  cta_url TEXT NOT NULL,
  placement ad_placement NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (status IN ('active', 'paused', 'ended', 'pending_review')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  daily_budget NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_budget NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_spent NUMERIC(10, 2) NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  type TEXT NOT NULL
    CHECK (type IN ('featured_listing', 'homepage_slot', 'newsletter', 'community')),
  duration_days INTEGER NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('active', 'ended', 'pending')),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MESSAGING
-- ============================================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'direct'
    CHECK (type IN ('direct', 'acquisition_room', 'deal_room', 'project_room')),
  reference_id UUID,
  participants UUID[] NOT NULL DEFAULT '{}',
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text'
    CHECK (type IN ('text', 'file', 'offer', 'system')),
  attachments JSONB NOT NULL DEFAULT '[]',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS & TRANSACTIONS
-- ============================================================

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  amount NUMERIC(15, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  platform_fee NUMERIC(15, 2) NOT NULL DEFAULT 0,
  net_amount NUMERIC(15, 2) NOT NULL,
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reference_id UUID,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_transfer_id TEXT UNIQUE,
  description TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  stripe_subscription_id TEXT UNIQUE,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '1 month',
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DOCUMENTS
-- ============================================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reference_type TEXT NOT NULL
    CHECK (reference_type IN ('listing', 'startup', 'project', 'acquisition', 'deal')),
  reference_id UUID NOT NULL,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  is_confidential BOOLEAN NOT NULL DEFAULT FALSE,
  access_user_ids UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reference_type TEXT NOT NULL
    CHECK (reference_type IN ('listing', 'project', 'startup')),
  reference_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(reviewer_id, reference_type, reference_id)
);

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Listings
CREATE INDEX idx_listings_seller_id ON listings(seller_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_asking_price ON listings(asking_price);
CREATE INDEX idx_listings_monthly_revenue ON listings(monthly_revenue);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_published_at ON listings(published_at DESC);
CREATE INDEX idx_listings_is_featured ON listings(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_listings_search ON listings USING GIN(search_vector);
CREATE INDEX idx_listings_tech_stack ON listings USING GIN(tech_stack);

-- Startups
CREATE INDEX idx_startup_profiles_user_id ON startup_profiles(user_id);
CREATE INDEX idx_startup_profiles_stage ON startup_profiles(stage);
CREATE INDEX idx_startup_profiles_industry ON startup_profiles(industry);
CREATE INDEX idx_startup_profiles_search ON startup_profiles USING GIN(search_vector);

-- Projects
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_search ON projects USING GIN(search_vector);

-- Messages
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read) WHERE is_read = FALSE;

-- Transactions
CREATE INDEX idx_transactions_from_user_id ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user_id ON transactions(to_user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- Activity logs
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- ============================================================
-- FULL TEXT SEARCH
-- ============================================================

-- Listings search vector
CREATE OR REPLACE FUNCTION update_listing_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.short_description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_search_vector_update
BEFORE INSERT OR UPDATE OF title, short_description, description
ON listings
FOR EACH ROW EXECUTE FUNCTION update_listing_search_vector();

-- Startup search vector
CREATE OR REPLACE FUNCTION update_startup_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.company_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.tagline, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER startup_search_vector_update
BEFORE INSERT OR UPDATE OF company_name, tagline, description
ON startup_profiles
FOR EACH ROW EXECUTE FUNCTION update_startup_search_vector();

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_updated_at BEFORE UPDATE ON listings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER startup_profiles_updated_at BEFORE UPDATE ON startup_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER proposals_updated_at BEFORE UPDATE ON proposals
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER deal_rooms_updated_at BEFORE UPDATE ON deal_rooms
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE acquisition_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Users can update their own data" ON users
FOR UPDATE USING (auth.uid() = id);

-- Profiles policies
CREATE POLICY "Profiles are publicly viewable" ON profiles
FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own profile" ON profiles
FOR ALL USING (auth.uid() = user_id);

-- Listings policies
CREATE POLICY "Active listings are publicly viewable" ON listings
FOR SELECT USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Sellers can manage their listings" ON listings
FOR ALL USING (seller_id = auth.uid());

CREATE POLICY "Admins can manage all listings" ON listings
FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Offers policies
CREATE POLICY "Users can view offers they made or received" ON offers
FOR SELECT USING (
  buyer_id = auth.uid() OR
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND seller_id = auth.uid())
);

CREATE POLICY "Buyers can create offers" ON offers
FOR INSERT WITH CHECK (buyer_id = auth.uid());

-- Watchlist policies
CREATE POLICY "Users can manage their watchlist" ON watchlist
FOR ALL USING (user_id = auth.uid());

-- Startup profiles policies
CREATE POLICY "Startup profiles are publicly viewable" ON startup_profiles
FOR SELECT USING (is_active = TRUE OR user_id = auth.uid());

CREATE POLICY "Founders can manage their startup profile" ON startup_profiles
FOR ALL USING (user_id = auth.uid());

-- Investor profiles policies
CREATE POLICY "Investor profiles are publicly viewable" ON investor_profiles
FOR SELECT USING (is_active = TRUE OR user_id = auth.uid());

CREATE POLICY "Investors can manage their profile" ON investor_profiles
FOR ALL USING (user_id = auth.uid());

-- Projects policies
CREATE POLICY "Open projects are publicly viewable" ON projects
FOR SELECT USING (status = 'open' OR client_id = auth.uid());

CREATE POLICY "Clients can manage their projects" ON projects
FOR ALL USING (client_id = auth.uid());

-- Proposals policies
CREATE POLICY "Proposals visible to relevant parties" ON proposals
FOR SELECT USING (
  proposer_id = auth.uid() OR
  EXISTS (SELECT 1 FROM projects WHERE id = project_id AND client_id = auth.uid())
);

CREATE POLICY "Service providers can create proposals" ON proposals
FOR INSERT WITH CHECK (proposer_id = auth.uid());

-- Conversations policies
CREATE POLICY "Users can view their conversations" ON conversations
FOR SELECT USING (auth.uid() = ANY(participants));

-- Messages policies
CREATE POLICY "Users can view messages in their conversations" ON messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE id = conversation_id AND auth.uid() = ANY(participants)
  )
);

CREATE POLICY "Users can send messages" ON messages
FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE id = conversation_id AND auth.uid() = ANY(participants)
  )
);

-- Transactions policies
CREATE POLICY "Users can view their transactions" ON transactions
FOR SELECT USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

-- Documents policies
CREATE POLICY "Users can view accessible documents" ON documents
FOR SELECT USING (
  uploader_id = auth.uid() OR auth.uid() = ANY(access_user_ids)
);

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON notifications
FOR UPDATE USING (user_id = auth.uid());

-- Reviews policies
CREATE POLICY "Reviews are publicly viewable" ON reviews
FOR SELECT USING (TRUE);

CREATE POLICY "Users can create reviews" ON reviews
FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- ============================================================
-- PLATFORM STATISTICS VIEW
-- ============================================================

CREATE OR REPLACE VIEW platform_stats AS
SELECT
  (SELECT COUNT(*) FROM listings WHERE status = 'active') AS active_listings,
  (SELECT COUNT(*) FROM listings WHERE status = 'sold') AS completed_acquisitions,
  (SELECT COUNT(*) FROM startup_profiles WHERE is_active = TRUE) AS active_startups,
  (SELECT COUNT(*) FROM investor_profiles WHERE is_active = TRUE) AS registered_investors,
  (SELECT COUNT(*) FROM projects WHERE status IN ('open', 'in_progress')) AS active_projects,
  (SELECT COUNT(*) FROM users) AS total_users,
  (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE status = 'completed') AS total_volume,
  (SELECT COALESCE(SUM(monthly_revenue), 0) FROM listings WHERE status = 'active') AS total_listed_mrr;
