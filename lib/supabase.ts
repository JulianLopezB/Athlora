import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Workout = {
  id: string
  user_id: string
  title: string
  description: string
  workout_date: string
  duration: number
  calories_burned: number | null
  workout_type: string
  exercises: Exercise[]
  created_at: string
}

export type Exercise = {
  id: string
  workout_id: string
  name: string
  sets: number
  reps: number
  weight: number | null
  duration: number | null
  distance: number | null
  notes: string | null
}

export type UserProfile = {
  id: string
  name: string
  email: string
  weight: number | null
  height: number | null
  fitness_level: string | null
  fitness_goals: string[] | null
  strava_connected: boolean
  garmin_connected: boolean
}

export async function fetchWorkouts(userId: string): Promise<Workout[]> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('workout_date', { ascending: false })
  
  if (error) {
    console.error('Error fetching workouts:', error)
    return []
  }
  
  return data || []
}

export async function saveWorkout(workout: Omit<Workout, 'id' | 'created_at'>): Promise<Workout | null> {
  const { data, error } = await supabase
    .from('workouts')
    .insert([workout])
    .select()
  
  if (error) {
    console.error('Error saving workout:', error)
    return null
  }
  
  return data?.[0] || null
}