import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock mode if keys are missing (for preview/dev without config)
export const isMock = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'PREVIEW_MODE';

export const supabase = !isMock 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : ({} as any);
