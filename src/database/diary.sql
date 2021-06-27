DROP TABLE IF EXISTS backup;
DROP TABLE IF EXISTS profile;

CREATE TABLE backup (
	id UUID PRIMARY KEY,
	data JSON,
	created_at TIMESTAMP,
  user_id UUID references auth.users NOT NULL DEFAULT auth.uid()
);

CREATE TABLE profile (
	id UUID PRIMARY KEY,
  name TEXT DEFAULT 'username',
	active_subscription BOOLEAN DEFAULT false,
  customer_id TEXT,		
  user_id UUID references auth.users NOT NULL UNIQUE DEFAULT auth.uid()
);

DROP TRIGGER IF EXISTS create_profile on auth.users;
DROP FUNCTION IF EXISTS signup_create_profile;

CREATE OR REPLACE FUNCTION signup_create_profile()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profile (user_id)
    VALUES(new.id);
  
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS create_profile on auth.users;

CREATE TRIGGER create_profile
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE signup_create_profile();


ALTER TABLE public.backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only user can get their backups" ON public.backup;
DROP POLICY IF EXISTS "Only authenticated user can insert backups" ON public.backup;
DROP POLICY IF EXISTS "Only Admin can delete backups" ON public.backup;
DROP POLICY IF EXISTS "Only Admin can update backups" ON public.backup;

CREATE POLICY "Only user can get their backups" ON public.backup FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Only authenticated user can insert backups" ON public.backup FOR INSERT WITH CHECK ((auth.role() = 'authenticated'));
CREATE POLICY "Only Admin can delete backups" ON public.backup FOR DELETE USING ((auth.role() = 'admin'));
CREATE POLICY "Only Admin can update backups" ON public.backup FOR UPDATE USING ((auth.role() = 'admin'));

DROP POLICY IF EXISTS "Only user can get their profile" ON public.profile;
DROP POLICY IF EXISTS "Only Admin can insert profile" ON public.profile;
DROP POLICY IF EXISTS "Only Admin can delete profile" ON public.profile;
DROP POLICY IF EXISTS "Only Admin can update profile" ON public.profile;

CREATE POLICY "Only user can get their profile" ON public.profile FOR SELECT USING ((auth.role() = 'authenticated'));
CREATE POLICY "Only Admin can insert profile" ON public.profile FOR INSERT WITH CHECK ((auth.role() = 'admin'));
CREATE POLICY "Only Admin can delete profile" ON public.profile FOR DELETE USING ((auth.role() = 'admin'));
CREATE POLICY "Only Admin can update profile" ON public.profile FOR UPDATE USING ((auth.role() = 'admin'));

