-- Create developers table
CREATE TABLE public.developers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  website TEXT,
  established_year INTEGER NOT NULL,
  total_projects INTEGER DEFAULT 0,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  location_address TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  location_lat NUMERIC(10,8),
  location_lng NUMERIC(11,8),
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  floors INTEGER,
  area NUMERIC, -- in square meters
  images JSONB DEFAULT '[]'::jsonb,
  floor_plan_images JSONB DEFAULT '[]'::jsonb,
  facility_images JSONB DEFAULT '[]'::jsonb,
  brochure_url TEXT,
  developer_id UUID NOT NULL REFERENCES public.developers(id) ON DELETE CASCADE,
  features JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  total_units INTEGER NOT NULL DEFAULT 1,
  available_units INTEGER NOT NULL DEFAULT 1,
  sold_units INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property sales table
CREATE TABLE public.property_sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  developer_id UUID NOT NULL REFERENCES public.developers(id) ON DELETE CASCADE,
  sale_price NUMERIC NOT NULL,
  commission_rate NUMERIC(5,2) NOT NULL,
  commission_amount NUMERIC NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'lost')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  source TEXT NOT NULL,
  notes TEXT,
  communication_history JSONB DEFAULT '[]'::jsonb,
  flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  preferred_contact_method TEXT NOT NULL DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'chat')),
  interests JSONB DEFAULT '[]'::jsonb,
  budget_min NUMERIC DEFAULT 0,
  budget_max NUMERIC DEFAULT 0,
  location TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create monthly reports table
CREATE TABLE public.monthly_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  total_sales INTEGER DEFAULT 0,
  total_commission NUMERIC DEFAULT 0,
  total_properties INTEGER DEFAULT 0,
  sales_by_developer JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month, year)
);

-- Create inquiries table
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_admin_reply BOOLEAN DEFAULT false,
  admin_reply TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since this is a property listing site)
-- Developers policies
CREATE POLICY "Anyone can view active developers" ON public.developers
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage developers" ON public.developers
  FOR ALL USING (is_admin());

-- Properties policies
CREATE POLICY "Anyone can view available properties" ON public.properties
  FOR SELECT USING (status IN ('available', 'pending'));

CREATE POLICY "Admins can manage properties" ON public.properties
  FOR ALL USING (is_admin());

-- Property sales policies
CREATE POLICY "Admins can view all sales" ON public.property_sales
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage sales" ON public.property_sales
  FOR ALL USING (is_admin());

-- Leads policies
CREATE POLICY "Admins can view all leads" ON public.leads
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage leads" ON public.leads
  FOR ALL USING (is_admin());

-- Customers policies
CREATE POLICY "Admins can view all customers" ON public.customers
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage customers" ON public.customers
  FOR ALL USING (is_admin());

-- Monthly reports policies
CREATE POLICY "Admins can view reports" ON public.monthly_reports
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage reports" ON public.monthly_reports
  FOR ALL USING (is_admin());

-- Inquiries policies
CREATE POLICY "Anyone can create inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries" ON public.inquiries
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage inquiries" ON public.inquiries
  FOR ALL USING (is_admin());

-- Chat messages policies
CREATE POLICY "Anyone can create chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view chat messages" ON public.chat_messages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage chat messages" ON public.chat_messages
  FOR ALL USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_developers_updated_at
  BEFORE UPDATE ON public.developers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
  BEFORE UPDATE ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();