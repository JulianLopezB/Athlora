"use client";

import { useState, useEffect } from 'react';
import { Workout } from '../../lib/supabase';
import { StravaActivity } from '../../lib/strava';
import {
  generateWorkoutDurationChart,
  generateWorkoutTypeDistribution,
  generateStravaActivitiesChart
} from '../../utils/chartHelpers';

export default function AnalyticsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [stravaActivities, setStravaActivities] = useState<StravaActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // In a real implementation, we would fetch from the API
    // Dummy data for demonstration
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
      {
        id: '3',
        user_id: 'user123',
        title: 'HIIT Session',
        description: '30 minute high intensity interval training',
        workout_date: '2023-05-08T17:00:00Z',
        duration: 30,
        calories_burned: 350,
        workout_type: 'HIIT',
        exercises: [
          { id: 'e5', workout_id: '3', name: 'Burpees', sets: 3, reps: 15, weight: null, duration: null, distance: null, notes: null },
          { id: 'e6', workout_id: '3', name: 'Mountain Climbers', sets: 3, reps: 20, weight: null, duration: null, distance: null, notes: null },
          { id: 'e7', workout_id: '3', name: 'Jumping Lunges', sets: 3, reps: 12, weight: null, duration: null, distance: null, notes: null },
        ],
        created_at: '2023-05-08T17:00:00Z',
      },
      {
        id: '4',
        user_id: 'user123',
        title: 'Yoga Practice',
        description: 'Vinyasa flow focusing on flexibility',
        workout_date: '2023-05-07T09:00:00Z',
        duration: 45,
        calories_burned: 200,
        workout_type: 'Yoga',
        exercises: [
          { id: 'e8', workout_id: '4', name: 'Sun Salutations', sets: 1, reps: 10, weight: null, duration: 15, distance: null, notes: null },
          { id: 'e9', workout_id: '4', name: 'Standing Poses', sets: 1, reps: 1, weight: null, duration: 15, distance: null, notes: null },
          { id: 'e10', workout_id: '4', name: 'Seated Poses', sets: 1, reps: 1, weight: null, duration: 15, distance: null, notes: null },
        ],
        created_at: '2023-05-07T09:00:00Z',
      },
      {
        id: '5',
        user_id: 'user123',
        title: 'Morning Strength Training',
        description: 'Upper body focus',
        workout_date: '2023-05-06T08:00:00Z',
        duration: 50,
        calories_burned: 400,
        workout_type: 'Strength',
        exercises: [
          { id: 'e11', workout_id: '5', name: 'Pull-ups', sets: 3, reps: 8, weight: null, duration: null, distance: null, notes: null },
          { id: 'e12', workout_id: '5', name: 'Bench Press', sets: 4, reps: 8, weight: 65, duration: null, distance: null, notes: null },
          { id: 'e13', workout_id: '5', name: 'Shoulder Press', sets: 3, reps: 10, weight: 40, duration: null, distance: null, notes: null },
        ],
        created_at: '2023-05-06T08:00:00Z',
      },
    ];
    
    const dummyStravaActivities: StravaActivity[] = [
      {
        id: 1,
        name: 'Morning Run',
        distance: 5000,
        moving_time: 1500,
        elapsed_time: 1600,
        total_elevation_gain: 50,
        type: 'Run',
        start_date: '2023-05-10T08:00:00Z',
        average_speed: 3.33,
        max_speed: 4.2,
        average_heartrate: 165,
        max_heartrate: 180,
        calories: 350,
      },
      {
        id: 2,
        name: 'Evening Run',
        distance: 7500,
        moving_time: 2400,
        elapsed_time: 2500,
        total_elevation_gain: 80,
        type: 'Run',
        start_date: '2023-05-08T18:00:00Z',
        average_speed: 3.12,
        max_speed: 4.0,
        average_heartrate: 168,
        max_heartrate: 185,
        calories: 550,
      },
      {
        id: 3,
        name: 'Weekend Ride',
        distance: 25000,
        moving_time: 4500,
        elapsed_time: 5000,
        total_elevation_gain: 350,
        type: 'Ride',
        start_date: '2023-05-07T10:00:00Z',
        average_speed: 5.55,
        max_speed: 10.2,
        average_heartrate: 155,
        max_heartrate: 175,
        calories: 850,
      },
    ];
    
    setWorkouts(dummyWorkouts);
    setStravaActivities(dummyStravaActivities);
    setIsLoading(false);
  }, []);
  
  // Note: In a real implementation, this would be done with Chart.js in a useEffect
  // Once the client component is mounted. For demo purposes, we're just showing the UI structure.
  
  const renderOverview = () => {
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = workouts.reduce((sum, workout) => sum + (workout.calories_burned || 0), 0);
    const workoutTypes = [...new Set(workouts.map(w => w.workout_type))];
    
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Workouts</h3>
            <p className="text-3xl font-bold">{totalWorkouts}</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Duration</h3>
            <p className="text-3xl font-bold">{totalDuration} min</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Calories Burned</h3>
            <p className="text-3xl font-bold">{totalCalories}</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Workout Types</h3>
            <p className="text-3xl font-bold">{workoutTypes.length}</p>
            <p className="text-gray-500 text-sm mt-1">Unique activities</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-400">Chart: Weekly workout duration</p>
              {/* In a real implementation, this would render the chart */}
              {/* <Line data={generateWorkoutDurationChart(workouts)} options={...} /> */}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Workout Types</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-400">Chart: Workout type distribution</p>
              {/* In a real implementation, this would render the chart */}
              {/* <Doughnut data={generateWorkoutTypeDistribution(workouts)} options={...} /> */}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workouts.slice(0, 5).map((workout) => (
                  <tr key={workout.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(workout.workout_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {workout.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.workout_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {workout.calories_burned || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStravaTab = () => {
    if (stravaActivities.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 mx-auto text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-medium mb-2">Connect to Strava</h3>
          <p className="text-gray-600 mb-4">
            Connect your Strava account to import and analyze your activities.
          </p>
          <button className="bg-[#FC4C02] hover:bg-[#e34400] text-white py-2 px-4 rounded-lg">
            Connect Strava
          </button>
        </div>
      );
    }
    
    const totalDistance = stravaActivities.reduce((sum, activity) => sum + activity.distance, 0) / 1000; // convert to km
    const totalDuration = stravaActivities.reduce((sum, activity) => sum + activity.moving_time, 0) / 60; // convert to minutes
    const totalCalories = stravaActivities.reduce((sum, activity) => sum + (activity.calories || 0), 0);
    
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Distance</h3>
            <p className="text-3xl font-bold">{totalDistance.toFixed(1)} km</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Activity Time</h3>
            <p className="text-3xl font-bold">{totalDuration.toFixed(0)} min</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Calories Burned</h3>
            <p className="text-3xl font-bold">{totalCalories}</p>
            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Distance</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-400">Chart: Weekly activity distance</p>
            {/* In a real implementation, this would render the chart */}
            {/* <Bar data={generateStravaActivitiesChart(stravaActivities)} options={...} /> */}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg HR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stravaActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(activity.distance / 1000).toFixed(2)} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(activity.moving_time / 60)}:{(activity.moving_time % 60).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.average_heartrate ? `${Math.round(activity.average_heartrate)} bpm` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('strava')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'strava'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Strava
            </button>
            <button
              onClick={() => setActiveTab('weight')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'weight'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Weight Tracking
            </button>
          </nav>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      ) : (
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'strava' && renderStravaTab()}
          {activeTab === 'weight' && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-gray-600">
                Weight tracking analytics will be available in a future update.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}