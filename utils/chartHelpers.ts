import { Workout } from '../lib/supabase';
import { StravaActivity } from '../lib/strava';

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
};

export function generateWorkoutDurationChart(workouts: Workout[]): ChartData {
  // Group workouts by day
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  // Initialize data with zeros
  const durationByDay: Record<string, number> = {};
  last7Days.forEach(day => {
    durationByDay[day] = 0;
  });

  // Sum durations by day
  workouts.forEach(workout => {
    const day = workout.workout_date.split('T')[0];
    if (durationByDay[day] !== undefined) {
      durationByDay[day] += workout.duration;
    }
  });

  // Format labels as "Mon", "Tue", etc.
  const formattedLabels = last7Days.map(day => {
    const date = new Date(day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  return {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Duration (minutes)',
        data: last7Days.map(day => durationByDay[day]),
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };
}

export function generateWorkoutTypeDistribution(workouts: Workout[]): ChartData {
  // Count workouts by type
  const workoutCounts: Record<string, number> = {};
  
  workouts.forEach(workout => {
    const type = workout.workout_type;
    workoutCounts[type] = (workoutCounts[type] || 0) + 1;
  });
  
  // Sort by count (descending)
  const sortedTypes = Object.keys(workoutCounts).sort(
    (a, b) => workoutCounts[b] - workoutCounts[a]
  );
  
  // Colors for different workout types
  const backgroundColors = [
    'rgba(14, 165, 233, 0.7)',
    'rgba(168, 85, 247, 0.7)',
    'rgba(236, 72, 153, 0.7)',
    'rgba(249, 115, 22, 0.7)',
    'rgba(34, 197, 94, 0.7)',
  ];
  
  return {
    labels: sortedTypes,
    datasets: [
      {
        label: 'Workout Types',
        data: sortedTypes.map(type => workoutCounts[type]),
        backgroundColor: backgroundColors.slice(0, sortedTypes.length),
      },
    ],
  };
}

export function generateStravaActivitiesChart(activities: StravaActivity[]): ChartData {
  // Group activities by week
  const last4Weeks = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    return weekStart.toISOString().split('T')[0];
  }).reverse();
  
  // Initialize data
  const distanceByWeek: Record<string, number> = {};
  last4Weeks.forEach(week => {
    distanceByWeek[week] = 0;
  });
  
  // Calculate distance by week (in km)
  activities.forEach(activity => {
    const activityDate = new Date(activity.start_date);
    const activityWeekStart = new Date(activityDate);
    activityWeekStart.setDate(activityDate.getDate() - activityDate.getDay());
    const weekKey = activityWeekStart.toISOString().split('T')[0];
    
    if (distanceByWeek[weekKey] !== undefined) {
      // Convert meters to kilometers
      distanceByWeek[weekKey] += activity.distance / 1000;
    }
  });
  
  // Format labels as "Week of {Month} {Day}"
  const formattedLabels = last4Weeks.map(week => {
    const date = new Date(week);
    return `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  });
  
  return {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Distance (km)',
        data: last4Weeks.map(week => Math.round(distanceByWeek[week] * 10) / 10),
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };
}