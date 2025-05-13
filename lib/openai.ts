import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type WorkoutParams = {
  fitnessLevel: string;
  fitnessGoals: string[];
  workoutType: string;
  duration: number;
  equipment: string[];
};

export async function generateWorkout(params: WorkoutParams): Promise<string> {
  const { fitnessLevel, fitnessGoals, workoutType, duration, equipment } = params;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional fitness coach specializing in creating personalized workout plans."
        },
        {
          role: "user",
          content: `Create a detailed ${workoutType} workout plan for a ${fitnessLevel} level person with the following goals: ${fitnessGoals.join(
            ", "
          )}. The workout should take approximately ${duration} minutes and only use the following equipment: ${equipment.join(
            ", "
          )}. Format the response as a structured workout with warm-up, main exercises (sets, reps, rest periods), and cool-down.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "Could not generate workout plan";
  } catch (error) {
    console.error("Error generating workout:", error);
    return "Error generating workout plan. Please try again.";
  }
}