import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgqxzxmxvqtlzocnfwce.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncXh6eG14dnF0bHpvY25md2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg5ODAsImV4cCI6MjAyMzA2NDk4MH0.qDj6zwQGDwWxkHJGhqvbxp7UwLBXW8pHBGDpgGBOjIE';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);