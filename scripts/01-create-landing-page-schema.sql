-- E-Africa Services Landing Page Schema
-- This schema extends the existing v0-e-amplify-web-app database
-- All tables reference auth.users for unified authentication

-- ============================================================================
-- 0. HELPER FUNCTIONS (Create these FIRST before using in RLS policies)
-- ============================================================================
CREATE OR REPLACE FUNCTION current_user_email() RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    auth.jwt() ->> 'email',
    (SELECT email FROM auth.users WHERE id = auth.uid())
  );
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. DISCOVERY CALLS TABLE (For Company Service Requests)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.discovery_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  service VARCHAR(100) NOT NULL,
  requirements TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Indexes for discovery_calls
CREATE INDEX idx_discovery_calls_email ON public.discovery_calls(email);
CREATE INDEX idx_discovery_calls_created_at ON public.discovery_calls(created_at DESC);
CREATE INDEX idx_discovery_calls_status ON public.discovery_calls(status);
CREATE INDEX idx_discovery_calls_service ON public.discovery_calls(service);

-- ============================================================================
-- 2. TRAINING ENROLLMENTS TABLE (For Individual Training Sign-ups)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.training_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  field_of_experience VARCHAR(100) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  area_of_study VARCHAR(255),
  training_program VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  enrollment_status VARCHAR(50) DEFAULT 'active' CHECK (enrollment_status IN ('active', 'completed', 'cancelled', 'paused')),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for training_enrollments
CREATE INDEX idx_training_enrollments_email ON public.training_enrollments(email);
CREATE INDEX idx_training_enrollments_training ON public.training_enrollments(training_program);
CREATE INDEX idx_training_enrollments_created_at ON public.training_enrollments(created_at DESC);
CREATE INDEX idx_training_enrollments_payment_status ON public.training_enrollments(payment_status);
CREATE INDEX idx_training_enrollments_enrollment_status ON public.training_enrollments(enrollment_status);

-- ============================================================================
-- 3. TALENT POOL PROFILES TABLE (For Job Seeker Registration)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.talent_pool_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  field_of_experience VARCHAR(100) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  cv_url VARCHAR(500),
  video_url VARCHAR(500),
  profile_status VARCHAR(50) DEFAULT 'pending' CHECK (profile_status IN ('pending', 'approved', 'rejected', 'inactive')),
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Indexes for talent_pool_profiles
CREATE INDEX idx_talent_pool_email ON public.talent_pool_profiles(email);
CREATE INDEX idx_talent_pool_country ON public.talent_pool_profiles(country);
CREATE INDEX idx_talent_pool_field ON public.talent_pool_profiles(field_of_experience);
CREATE INDEX idx_talent_pool_status ON public.talent_pool_profiles(profile_status);
CREATE INDEX idx_talent_pool_created_at ON public.talent_pool_profiles(registration_date DESC);

-- ============================================================================
-- 4. PAYMENTS TABLE (For Training Payment Tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES public.training_enrollments(id) ON DELETE CASCADE,
  training_program VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  paystack_transaction_id VARCHAR(255),
  paystack_reference VARCHAR(255),
  payment_method VARCHAR(50) DEFAULT 'paystack',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for payments
CREATE INDEX idx_payments_enrollment_id ON public.payments(enrollment_id);
CREATE INDEX idx_payments_status ON public.payments(payment_status);
CREATE INDEX idx_payments_created_at ON public.payments(created_at DESC);
CREATE INDEX idx_payments_paystack_ref ON public.payments(paystack_reference);

-- ============================================================================
-- 5. LANDING PAGE ANALYTICS TABLE (Optional - For Tracking Page Events)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.landing_page_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  page_url VARCHAR(500),
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX idx_analytics_event_type ON public.landing_page_analytics(event_type);
CREATE INDEX idx_analytics_timestamp ON public.landing_page_analytics(timestamp DESC);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.discovery_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_pool_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_analytics ENABLE ROW LEVEL SECURITY;

-- Discovery Calls: Public can insert, only admins can read/update
CREATE POLICY "discovery_calls_insert_public" ON public.discovery_calls
  FOR INSERT WITH CHECK (true);

CREATE POLICY "discovery_calls_select_admin" ON public.discovery_calls
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "discovery_calls_update_admin" ON public.discovery_calls
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Training Enrollments: Public can insert, users can view their own
CREATE POLICY "training_enrollments_insert_public" ON public.training_enrollments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "training_enrollments_select_own" ON public.training_enrollments
  FOR SELECT USING (email = current_user_email() OR auth.jwt() ->> 'role' = 'admin');

-- Talent Pool: Public can insert, users can view their own, admins can view all
CREATE POLICY "talent_pool_insert_public" ON public.talent_pool_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "talent_pool_select_own" ON public.talent_pool_profiles
  FOR SELECT USING (email = current_user_email() OR auth.jwt() ->> 'role' = 'admin');

-- Payments: Users can view their own, admins can view all
CREATE POLICY "payments_select_own" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.training_enrollments te
      WHERE te.id = payments.enrollment_id
      AND te.email = current_user_email()
    ) OR auth.jwt() ->> 'role' = 'admin'
  );

-- Analytics: Public can insert, admins can read
CREATE POLICY "analytics_insert_public" ON public.landing_page_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "analytics_select_admin" ON public.landing_page_analytics
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 7. APPLY UPDATED_AT TRIGGERS
-- ============================================================================
CREATE TRIGGER discovery_calls_updated_at BEFORE UPDATE ON public.discovery_calls
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER training_enrollments_updated_at BEFORE UPDATE ON public.training_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER talent_pool_updated_at BEFORE UPDATE ON public.talent_pool_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
