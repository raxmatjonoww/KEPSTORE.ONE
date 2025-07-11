// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://varxekqkpcmwxqzciaxe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcnhla3FrcGNtd3hxemNpYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjcxNzgsImV4cCI6MjA2NzgwMzE3OH0.vVCNEOplaSyJZCK8jCGp0r8tEtbLpVyXOcBEp2EniRY';

export const supabase = createClient(supabaseUrl, supabaseKey);
