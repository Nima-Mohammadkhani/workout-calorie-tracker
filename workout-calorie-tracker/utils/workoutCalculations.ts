import { Workout } from "@/types/ui";

export const calculateWorkoutDuration = (
  workout: Workout,
  level: "easy" | "medium" | "hard" = "medium"
): number => {
  const levelData = workout.levels[level];

  if (typeof levelData.reps === "string") {
    const match = levelData.reps.match(/\d+/);
    const baseTime = match ? parseInt(match[0]) : 30;

    if (levelData.reps.includes("هر طرف")) {
      return baseTime * 2 * levelData.sets;
    }

    return baseTime * levelData.sets;
  }

  return (levelData.reps as number) * 2 * levelData.sets;
};

export const calculateWorkoutCalories = (
  workout: Workout,
  level: "easy" | "medium" | "hard" = "medium"
): number => {
  const levelData = workout.levels[level];
  if (levelData.calories) {
    return levelData.calories;
  }
  const duration = calculateWorkoutDuration(workout, level);
  return Math.round(duration / 3);
};

export const calculateTotalTime = (
  workouts: Workout[],
  level: "easy" | "medium" | "hard" = "medium"
): number => {
  return workouts.reduce((total, workout) => {
    return total + calculateWorkoutDuration(workout, level);
  }, 0);
};

export const calculateTotalCalories = (
  workouts: Workout[],
  level: "easy" | "medium" | "hard" = "medium"
): number => {
  return workouts.reduce((total, workout) => {
    return total + calculateWorkoutCalories(workout, level);
  }, 0);
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};
