import { NextResponse } from 'next/server';
import { generateWorkout, WorkoutParams } from '../../../lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params: WorkoutParams = body;
    
    // Validate input parameters
    if (!params.fitnessLevel || !params.fitnessGoals || !params.workoutType || !params.duration || !params.equipment) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    
    const workout = await generateWorkout(params);
    
    return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.error('Error generating workout:', error);
    return NextResponse.json({ error: 'Failed to generate workout' }, { status: 500 });
  }
}