-- Create a temporary fix: Allow all authenticated users to manage data for now
-- We'll create a more sophisticated admin system later

-- Drop all current policies
DROP POLICY IF EXISTS "Anyone can view active developers" ON public.developers;
DROP POLICY IF EXISTS "Admins can manage developers" ON public.developers;
DROP POLICY IF EXISTS "Anyone can view available properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can manage properties" ON public.properties;

-- Create simpler policies for testing
-- Anyone can view active developers
CREATE POLICY "Public can view active developers" ON public.developers
  FOR SELECT USING (status = 'active');

-- Authenticated users can manage developers (for admin functionality)
CREATE POLICY "Authenticated users can manage developers" ON public.developers
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Anyone can view available properties
CREATE POLICY "Public can view available properties" ON public.properties
  FOR SELECT USING (status IN ('available', 'pending'));

-- Authenticated users can manage properties (for admin functionality)
CREATE POLICY "Authenticated users can manage properties" ON public.properties
  FOR ALL USING (auth.uid() IS NOT NULL);