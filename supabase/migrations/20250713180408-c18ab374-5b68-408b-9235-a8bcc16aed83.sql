-- Create admin_credentials table
CREATE TABLE public.admin_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_registrations table
CREATE TABLE public.user_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  college TEXT,
  department TEXT,
  year_of_study INTEGER,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('individual', 'team')),
  team_name TEXT,
  team_members JSONB,
  events_registered JSONB DEFAULT '[]'::jsonb,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  registration_fee DECIMAL(10,2) DEFAULT 0.00,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_credentials
CREATE POLICY "Admins can view their own credentials" 
ON public.admin_credentials 
FOR SELECT 
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Super admin can manage all admin credentials" 
ON public.admin_credentials 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_credentials 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'super_admin'
  )
);

-- Create policies for user_registrations
CREATE POLICY "Admins can view all user registrations" 
ON public.user_registrations 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_credentials 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    AND is_active = true
  )
);

CREATE POLICY "Admins can manage user registrations" 
ON public.user_registrations 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_credentials 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    AND is_active = true
  )
);

CREATE POLICY "Anyone can insert registrations" 
ON public.user_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_credentials_updated_at
  BEFORE UPDATE ON public.admin_credentials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_registrations_updated_at
  BEFORE UPDATE ON public.user_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (password: admin123)
INSERT INTO public.admin_credentials (email, password_hash, full_name, role) 
VALUES (
  'admin@spardha.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBzNOuwwfIkG/i',
  'Super Administrator',
  'super_admin'
);

-- Create events table for event management
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('technical', 'cultural', 'sports', 'workshop')),
  venue TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  registration_fee DECIMAL(10,2) DEFAULT 0.00,
  max_participants INTEGER,
  is_team_event BOOLEAN DEFAULT false,
  max_team_size INTEGER,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active events" 
ON public.events 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_credentials 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    AND is_active = true
  )
);

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();