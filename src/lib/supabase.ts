import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wleghthpjghhajzgivgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZWdodGhwamdoaGFqemdpdmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTYzODcsImV4cCI6MjA3MTAzMjM4N30.ZhAnoKg2RMweWuiSY8s6U8bfbU-YAJ0tUT8pK1KYxGw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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