// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wwzxgeemuiopimnjbooo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3enhnZWVtdWlvcGltbmpib29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NTE5OTgsImV4cCI6MjA1MzMyNzk5OH0.DXzdYJiBshqwkbBjc6QUbOG112stGNxKXBpsW8xkIAM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});