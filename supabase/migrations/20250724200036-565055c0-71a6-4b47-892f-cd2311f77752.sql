-- Fix the is_admin function to work with the current authentication system
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check if user exists in profiles with Admin status
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND status = 'Admin'
  );
END;
$$;

-- Drop existing policies that use is_admin()
DROP POLICY IF EXISTS "Admins can manage developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can manage properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can view all sales" ON public.property_sales;
DROP POLICY IF EXISTS "Admins can manage sales" ON public.property_sales;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can manage customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can view reports" ON public.monthly_reports;
DROP POLICY IF EXISTS "Admins can manage reports" ON public.monthly_reports;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can manage chat messages" ON public.chat_messages;

-- Create new policies that use the correct admin function

-- Developers policies
CREATE POLICY "Admins can manage developers" ON public.developers
  FOR ALL USING (is_admin_user());

-- Properties policies  
CREATE POLICY "Admins can manage properties" ON public.properties
  FOR ALL USING (is_admin_user());

-- Property sales policies
CREATE POLICY "Admins can view all sales" ON public.property_sales
  FOR SELECT USING (is_admin_user());

CREATE POLICY "Admins can manage sales" ON public.property_sales
  FOR ALL USING (is_admin_user());

-- Leads policies
CREATE POLICY "Admins can view all leads" ON public.leads
  FOR SELECT USING (is_admin_user());

CREATE POLICY "Admins can manage leads" ON public.leads
  FOR ALL USING (is_admin_user());

-- Customers policies
CREATE POLICY "Admins can view all customers" ON public.customers
  FOR SELECT USING (is_admin_user());

CREATE POLICY "Admins can manage customers" ON public.customers
  FOR ALL USING (is_admin_user());

-- Monthly reports policies
CREATE POLICY "Admins can view reports" ON public.monthly_reports
  FOR SELECT USING (is_admin_user());

CREATE POLICY "Admins can manage reports" ON public.monthly_reports
  FOR ALL USING (is_admin_user());

-- Inquiries policies
CREATE POLICY "Admins can view all inquiries" ON public.inquiries
  FOR SELECT USING (is_admin_user());

CREATE POLICY "Admins can manage inquiries" ON public.inquiries
  FOR ALL USING (is_admin_user());

-- Chat messages policies
CREATE POLICY "Admins can manage chat messages" ON public.chat_messages
  FOR ALL USING (is_admin_user());