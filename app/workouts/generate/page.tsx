"use client";

import { useState } from 'react';
import { WorkoutParams } from '../../../lib/openai';

export default function GenerateWorkoutPage() {
  const [formData, setFormData] = useState<WorkoutParams>({
    fitnessLevel: 'intermediate',
    fitnessGoals: ['strength'],
    workoutType: 'strength',
    duration: 45,
    equipment: ['dumbbells', 'barbell', 'bench']
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
  const fitnessGoalOptions = ['strength', 'muscle gain', 'weight loss', 'endurance', 'flexibility'];
  const workoutTypes = ['strength', 'cardio', 'hiit', 'yoga', 'bodyweight'];
  const equipmentOptions = [
    'none', 'dumbbells', 'barbell', 'kettlebells', 'resistance bands', 
    'bench', 'pull-up bar', 'treadmill', 'exercise bike', 'yoga mat'
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleGoalChange = (goal: string) => {
    const updatedGoals = formData.fitnessGoals.includes(goal)
      ? formData.fitnessGoals.filter(g => g !== goal)
      : [...formData.fitnessGoals, goal];
    
    setFormData({ ...formData, fitnessGoals: updatedGoals });
  };
  
  const handleEquipmentChange = (equipment: string) => {
    const updatedEquipment = formData.equipment.includes(equipment)
      ? formData.equipment.filter(e => e !== equipment)
      : [...formData.equipment, equipment];
    
    setFormData({ ...formData, equipment: updatedEquipment });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, we would call the API
      // const response = await fetch('/api/generate-workout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Failed to generate workout');
      // const data = await response.json();
      // setGeneratedWorkout(data.workout);
      
      // Mock response for demonstration
      setTimeout(() => {
        const mockWorkout = `# ${formData.workoutType.charAt(0).toUpperCase() + formData.workoutType.slice(1)} Workout (${formData.duration} minutes)

## Warm-up (5 minutes)
- Jumping jacks: 30 seconds
- Arm circles: 30 seconds
- Body-weight squats: 12 reps
- Push-ups: 8 reps
- High knees: 30 seconds

## Main Workout

### Circuit 1 (3 rounds, rest 60s between rounds)
1. Barbell squats: 3 sets x 8 reps, 120s rest
2. Dumbbell bench press: 3 sets x 10 reps, 90s rest
3. Bent-over barbell rows: 3 sets x 10 reps, 90s rest

### Circuit 2 (3 rounds, rest 60s between rounds)
1. Dumbbell lunges: 3 sets x 12 reps each leg, 60s rest
2. Dumbbell shoulder press: 3 sets x 12 reps, 60s rest
3. Dumbbell Romanian deadlifts: 3 sets x 10 reps, 60s rest

## Cool-down (5 minutes)
- Quad stretch: 30 seconds each leg
- Hamstring stretch: 30 seconds each leg
- Chest stretch: 30 seconds
- Child's pose: 60 seconds

## Notes
- Focus on proper form over weight
- If you're feeling strong, add 5% weight to your last workout
- Stay hydrated throughout the session`;
        
        setGeneratedWorkout(mockWorkout);
        setIsGenerating(false);
      }, 2000);
    } catch (err) {
      setError('Failed to generate workout. Please try again.');
      setIsGenerating(false);
    }
  };
  
  const handleSaveWorkout = () => {
    // This would save the workout to the database in a real implementation
    alert('Workout saved!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Workout Generator</h1>
      
      {!generatedWorkout ? (
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Customize Your Workout</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Fitness Level */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Fitness Level
              </label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {fitnessLevels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Fitness Goals */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Fitness Goals (select at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {fitnessGoalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.fitnessGoals.includes(goal)
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
            
            {/* Workout Type */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Workout Type
              </label>
              <select
                name="workoutType"
                value={formData.workoutType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {workoutTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Duration */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min={10}
                max={120}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            {/* Equipment */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Available Equipment
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {equipmentOptions.map(equipment => (
                  <label key={equipment} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.equipment.includes(equipment)}
                      onChange={() => handleEquipmentChange(equipment)}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span>{equipment.charAt(0).toUpperCase() + equipment.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="mb-4 text-red-600">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Workout...
                </>
              ) : (
                'Generate Workout'
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Generated Workout</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveWorkout}
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
              >
                Save Workout
              </button>
              <button
                onClick={() => setGeneratedWorkout(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
              >
                Edit Parameters
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ 
              __html: generatedWorkout
                .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$2</h2>')
                .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-3 mb-1">$1</h3>')
                .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
                .replace(/^(\d+)\. (.*$)/gm, '<div class="ml-4">$1. $2</div>')
                .split('\n').join('<br />')
            }} />
          </div>
        </div>
      )}
    </div>
  );
}