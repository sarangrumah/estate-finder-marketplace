-- Update the current user to be an admin
UPDATE public.profiles 
SET status = 'Admin' 
WHERE user_id = 'ac842c00-3d99-462d-84f3-5e6c7697849a';