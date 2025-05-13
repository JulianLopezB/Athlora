"use client";

import { useState } from 'react';
import { UserProfile } from '../../lib/supabase';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    weight: 75,
    height: 180,
    fitness_level: 'intermediate',
    fitness_goals: ['strength', 'endurance'],
    strava_connected: false,
    garmin_connected: false,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  
  const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
  const fitnessGoalOptions = ['strength', 'muscle gain', 'weight loss', 'endurance', 'flexibility'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === '' ? null : Number(value) });
  };
  
  const handleGoalChange = (goal: string) => {
    const currentGoals = formData.fitness_goals || [];
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    
    setFormData({ ...formData, fitness_goals: updatedGoals });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, we would update the profile in the database
    // For demo purposes, we'll just update the local state
    setProfile(formData);
    setIsEditing(false);
  };
  
  const connectStrava = () => {
    // In a real implementation, this would redirect to Strava OAuth flow
    alert('Redirecting to Strava for authorization...');
  };
  
  const connectGarmin = () => {
    // In a real implementation, this would redirect to Garmin OAuth flow
    alert('Redirecting to Garmin for authorization...');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary-600 hover:text-primary-800"
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
        
        {!isEditing ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                <p className="text-gray-900">{profile.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{profile.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Weight</h3>
                <p className="text-gray-900">{profile.weight ? `${profile.weight} kg` : '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Height</h3>
                <p className="text-gray-900">{profile.height ? `${profile.height} cm` : '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fitness Level</h3>
                <p className="text-gray-900">
                  {profile.fitness_level ? profile.fitness_level.charAt(0).toUpperCase() + profile.fitness_level.slice(1) : '-'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fitness Goals</h3>
                {profile.fitness_goals && profile.fitness_goals.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.fitness_goals.map(goal => (
                      <span
                        key={goal}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {goal.charAt(0).toUpperCase() + goal.slice(1)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900">-</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleNumberChange}
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height || ''}
                  onChange={handleNumberChange}
                  min="100"
                  max="250"
                  step="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fitness Level
                </label>
                <select
                  name="fitness_level"
                  value={formData.fitness_level || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select a level</option>
                  {fitnessLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fitness Goals
                </label>
                <div className="flex flex-wrap gap-2">
                  {fitnessGoalOptions.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        formData.fitness_goals?.includes(goal)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleGoalChange(goal)}
                    >
                      {goal.charAt(0).toUpperCase() + goal.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Connected Accounts</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-[#FC4C02] h-10 w-10 rounded-full flex items-center justify-center text-white">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="h-6 w-6"
                  >
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Strava</h3>
                  <p className="text-sm text-gray-500">Connect to import your runs, rides, and swims</p>
                </div>
              </div>
              
              <button
                onClick={connectStrava}
                className={`py-2 px-4 rounded-lg ${
                  profile.strava_connected
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#FC4C02] text-white hover:bg-[#e34400]'
                }`}
              >
                {profile.strava_connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-[#007CC3] h-10 w-10 rounded-full flex items-center justify-center text-white">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="h-6 w-6"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    <path d="M13 7h-2v6h6v-2h-4z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Garmin Connect</h3>
                  <p className="text-sm text-gray-500">Connect to import your activities and health data</p>
                </div>
              </div>
              
              <button
                onClick={connectGarmin}
                className={`py-2 px-4 rounded-lg ${
                  profile.garmin_connected
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#007CC3] text-white hover:bg-[#006ba7]'
                }`}
              >
                {profile.garmin_connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}