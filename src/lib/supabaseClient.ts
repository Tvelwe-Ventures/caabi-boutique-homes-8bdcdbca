import { createClient } from '@supabase/supabase-js';

// These values must be your actual Supabase project URL and anon key
const supabaseUrl = 'https://qgqxzxmxvqtlzocnfwce.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncXh6eG14dnF0bHpvY25md2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg5ODAsImV4cCI6MjAyMzA2NDk4MH0.qDj6zwQGDwWxkHJGhqvbxp7UwLBXW8pHBGDpgGBOjIE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required.');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});