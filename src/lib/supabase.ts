import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para las tablas de Supabase
export interface YoutubeVideo {
  id: number
  video_id: string
  title: string
  description: string
  published_at: string
  thumbnail_url: string
  duration_seconds: number
  view_count: number
  like_count: number
  channel_id: string
  created_at: string
  updated_at: string
}

export interface YoutubeStatistics {
  id: number
  total_videos: number
  total_duration_seconds: number
  total_views: number
  total_likes: number
  last_sync_at: string
  created_at: string
  updated_at: string
}
