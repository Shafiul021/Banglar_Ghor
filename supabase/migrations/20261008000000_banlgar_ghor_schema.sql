-- ==============================================================================
-- BANLGAR GHOR REMODELING - COMPLETE PRODUCTION DATABASE SCHEMA & MIGRATIONS
-- PostgreSQL / Supabase Migration
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. COMPANY SETTINGS (Singleton)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS company_settings (
  id TEXT PRIMARY KEY DEFAULT 'company-singleton',
  name TEXT NOT NULL DEFAULT 'Banlgar Ghor Remodeling',
  tagline TEXT,
  positioning TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'New York',
  state TEXT NOT NULL DEFAULT 'NY',
  zip TEXT NOT NULL DEFAULT '10017',
  hours TEXT,
  license_info TEXT,
  insurance_info TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  service_areas_summary TEXT,
  footer_description TEXT,
  copyright_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. HOMEPAGE CONFIGURATION
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS homepage_config (
  id TEXT PRIMARY KEY DEFAULT 'homepage-singleton',
  hero_eyebrow TEXT NOT NULL,
  hero_heading TEXT NOT NULL,
  hero_supporting_text TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  hero_primary_cta_text TEXT NOT NULL DEFAULT 'Request a Free Consultation',
  hero_secondary_cta_text TEXT NOT NULL DEFAULT 'Explore Our Projects',
  intro_heading TEXT,
  intro_text TEXT,
  why_heading TEXT,
  why_description TEXT,
  why_points JSONB DEFAULT '[]'::jsonb,
  final_cta_heading TEXT,
  final_cta_text TEXT,
  final_cta_button_text TEXT DEFAULT 'Request a Free Consultation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. FINANCING CONTENT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS financing_content (
  id TEXT PRIMARY KEY DEFAULT 'financing-singleton',
  headline TEXT NOT NULL,
  subheadline TEXT,
  intro_paragraph TEXT,
  disclaimer TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  steps JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. PROJECTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  neighborhood TEXT,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  design_approach TEXT,
  materials JSONB DEFAULT '[]'::jsonb,
  budget_min INTEGER,
  budget_max INTEGER,
  timeline TEXT,
  property_type TEXT,
  year_completed INTEGER,
  hero_image TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);

-- ------------------------------------------------------------------------------
-- 5. PROJECT IMAGES (Normalized relation)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_images (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('hero', 'gallery', 'before', 'after', 'detail')),
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- ------------------------------------------------------------------------------
-- 6. SERVICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  hero_image TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  typical_scope JSONB DEFAULT '[]'::jsonb,
  materials JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- ------------------------------------------------------------------------------
-- 7. TESTIMONIALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  project_type TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  full_review TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. FAQS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('General', 'Process', 'Pricing', 'Design', 'Construction', 'Timeline', 'Financing')),
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. SERVICE AREAS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_areas (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  popular_projects JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. PROCESS STEPS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS process_steps (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  duration TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- ------------------------------------------------------------------------------
-- 11. TEAM MEMBERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  credentials TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- ------------------------------------------------------------------------------
-- 12. CONSULTATION REQUESTS (LEADS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS consultation_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  address TEXT,
  project_type TEXT NOT NULL,
  property_type TEXT NOT NULL,
  estimated_budget TEXT NOT NULL,
  preferred_timeline TEXT NOT NULL,
  project_details TEXT NOT NULL,
  preferred_contact_method TEXT DEFAULT 'email' CHECK (preferred_contact_method IN ('phone', 'email', 'text')),
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Consultation Scheduled', 'Proposal Sent', 'Won', 'Lost', 'Archived')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. CONTACT MESSAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Read', 'Responded', 'Archived')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 14. ADMIN USERS & AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Super Admin', 'Content Manager', 'Project Manager', 'Sales', 'Editor', 'Viewer')),
  avatar TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (published = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (published = true);
CREATE POLICY "Public read service_areas" ON service_areas FOR SELECT USING (published = true);
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (published = true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (published = true);
CREATE POLICY "Public read company_settings" ON company_settings FOR SELECT USING (true);
CREATE POLICY "Public read homepage_config" ON homepage_config FOR SELECT USING (true);
CREATE POLICY "Public read financing_content" ON financing_content FOR SELECT USING (true);

-- Public can SUBMIT consultation leads and contact messages
CREATE POLICY "Public insert consultation_requests" ON consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Public CANNOT read leads or messages
-- Authenticated admins can perform all CRUD operations
CREATE POLICY "Admin full access projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access service_areas" ON service_areas FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access process_steps" ON process_steps FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access team_members" ON team_members FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access company_settings" ON company_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access homepage_config" ON homepage_config FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access financing_content" ON financing_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access consultation_requests" ON consultation_requests FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access admin_users" ON admin_users FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access audit_logs" ON audit_logs FOR ALL TO authenticated USING (true);
