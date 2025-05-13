"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Workout } from '../../lib/supabase';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, we would fetch workouts from the API
  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true);
  //     const userId = "user123"; // Get from auth context
  //     const data = await fetchWorkouts(userId);
  //     setWorkouts(data);
  //     setIsLoading(false);
  //   }
  //   
  //   fetchData();
  // }, []);

  // Dummy data for demonstration
  useState(() => {
    const dummyWorkouts: Workout[] = [
      {
        id: '1',
        user_id: 'user123',
        title: 'Morning Strength Training',
        description: 'Full body workout focusing on compound movements',
        workout_date: '2023-05-10T08:00:00Z',
        duration: 60,
        calories_burned: 450,
        workout_type: 'Strength',
        exercises: [
          { id: 'e1', workout_id: '1', name: 'Squats', sets: 4, reps: 8, weight: 70, duration: null, distance: null, notes: null },
          { id: 'e2', workout_id: '1', name: 'Bench Press', sets: 4, reps: 8, weight: 60, duration: null, distance: null, notes: null },
          { id: 'e3', workout_id: '1', name: 'Deadlifts', sets: 3, reps: 6, weight: 100, duration: null, distance: null, notes: null },
        ],
        created_at: '2023-05-10T08:00:00Z',
      },
      {
        id: '2',
        user_id: 'user123',
        title: 'Evening Run',
        description: 'Easy 5k run around the park',
        workout_date: '2023-05-09T18:00:00Z',
        duration: 30,
        calories_burned: 300,
        workout_type: 'Cardio',
        exercises: [
          { id: 'e4', workout_id: '2', name: 'Running', sets: 1, reps: 1, weight: null, duration: 30, distance: 5, notes: 'Felt good, steady pace' },
        ],
        created_at: '2023-05-09T18:00:00Z',
      },
    ];
    
    setWorkouts(dummyWorkouts);
    setIsLoading(false);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Workouts</h1>
        <Link 
          href="/workouts/new" 
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
        >
          New Workout
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading workouts...</p>
        </div>
      ) : workouts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No workouts yet</h3>
          <p className="text-gray-600 mb-4">
            Get started by creating your first workout or generate one with AI.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/workouts/new"
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
            >
              Create Workout
            </Link>
            <Link
              href="/workouts/generate"
              className="bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-lg"
            >
              AI Generator
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-2 ${
                workout.workout_type === 'Strength' 
                  ? 'bg-blue-500' 
                  : workout.workout_type === 'Cardio' 
                  ? 'bg-green-500' 
                  : 'bg-purple-500'
              }`} />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{workout.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                    {workout.workout_type}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{workout.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    {new Date(workout.workout_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div>{workout.duration} min</div>
                  {workout.calories_burned && (
                    <div>{workout.calories_burned} cal</div>
                  )}
                </div>
                <Link
                  href={`/workouts/${workout.id}`}
                  className="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  View details
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}