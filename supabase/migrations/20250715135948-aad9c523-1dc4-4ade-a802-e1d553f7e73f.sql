-- Update admin password to new credential
UPDATE public.admin_credentials 
SET password_hash = 'ACMvvitu-Spardha@2025' 
WHERE email = 'admin@spardha.com';

-- Remove payment and verification columns from user_registrations
ALTER TABLE public.user_registrations 
DROP COLUMN payment_status,
DROP COLUMN registration_fee,
DROP COLUMN is_verified;

-- Remove registration_fee from events table since events are free
ALTER TABLE public.events 
DROP COLUMN registration_fee;

-- Clear existing sample data and insert new data without payment/verification fields
DELETE FROM public.user_registrations;
DELETE FROM public.events;

-- Insert updated sample events (free events)
INSERT INTO public.events (title, description, event_type, venue, event_date, max_participants, is_team_event, max_team_size, is_active) VALUES
('Code Combat', 'Competitive programming contest with algorithmic challenges', 'technical', 'CS Lab A', '2025-03-15 10:00:00+00:00', 100, false, null, true),
('Web Weaver', 'Frontend development competition', 'technical', 'CS Lab B', '2025-03-16 09:00:00+00:00', 50, true, 3, true),
('Cultural Night', 'Showcase your cultural talents', 'cultural', 'Main Auditorium', '2025-03-17 18:00:00+00:00', 200, false, null, true),
('Cricket Tournament', 'Inter-college cricket championship', 'sports', 'Sports Ground', '2025-03-18 08:00:00+00:00', 11, true, 11, true),
('AI/ML Workshop', 'Hands-on workshop on Machine Learning', 'workshop', 'Seminar Hall', '2025-03-19 14:00:00+00:00', 80, false, null, true),
('Dance Battle', 'Show off your dance moves', 'cultural', 'Central Plaza', '2025-03-20 16:00:00+00:00', 150, true, 8, true),
('Hackathon', '24-hour coding marathon', 'technical', 'Innovation Lab', '2025-03-21 09:00:00+00:00', 60, true, 4, true),
('Photography Contest', 'Capture the best moments', 'cultural', 'Campus Wide', '2025-03-22 12:00:00+00:00', 100, false, null, true);

-- Insert updated sample registrations (no payment/verification)
INSERT INTO public.user_registrations (full_name, email, phone, college, department, year_of_study, registration_type, events_registered, team_name, team_members) VALUES
('Rahul Sharma', 'rahul.sharma@example.com', '+91-9876543210', 'VIT Vellore', 'Computer Science', 3, 'individual', '["Code Combat"]', null, null),
('Priya Patel', 'priya.patel@example.com', '+91-8765432109', 'SRM University', 'Information Technology', 2, 'individual', '["Web Weaver"]', null, null),
('Arjun Kumar', 'arjun.kumar@example.com', '+91-7654321098', 'Anna University', 'Electronics', 4, 'individual', '["Cultural Night"]', null, null),
('Sneha Reddy', 'sneha.reddy@example.com', '+91-6543210987', 'BITS Pilani', 'Computer Science', 3, 'individual', '["AI/ML Workshop"]', null, null),
('Team Alpha', 'alpha.team@example.com', '+91-5432109876', 'VIT Vellore', 'Computer Science', 3, 'team', '["Hackathon"]', 'Team Alpha', '[{"name": "Alice Kumar", "email": "alice@example.com"}, {"name": "Bob Singh", "email": "bob@example.com"}]'),
('Vikram Singh', 'vikram.singh@example.com', '+91-4321098765', 'IIT Madras', 'Mechanical', 2, 'individual', '["Photography Contest"]', null, null);