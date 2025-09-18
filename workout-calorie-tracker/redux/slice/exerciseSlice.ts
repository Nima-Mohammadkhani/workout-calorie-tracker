import { Workout } from "@/types/ui";
import { addSkeletonDelay } from "@/utils/delay";
import {
  calculateTotalCalories,
  calculateTotalTime,
  calculateWorkoutCalories,
} from "@/utils/workoutCalculations";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { exerciseService } from "../service/exercise";

export const getWorkoutsList = createAsyncThunk(
  "workouts/getList",
  async () => {
    await addSkeletonDelay();
    const response = await exerciseService.getWorkouts();
    return response.data;
  }
);

export const getWorkoutById = createAsyncThunk(
  "workouts/getById",
  async (id: number) => {
    await addSkeletonDelay();
    const response = await exerciseService.getWorkoutById(id);
    return response.data;
  }
);

export const getUserScore = createAsyncThunk("user/getScore", async () => {
  await addSkeletonDelay();
  return 1500;
});

interface WorkoutProgress {
  workoutId: number;
  completed: boolean;
  timeSpent: number;
  caloriesBurned: number;
}

interface ExerciseState {
  exerciseList: Workout[];
  currentWorkout: Workout | null;
  userScore: number;
  scoreLoading: boolean;
  loading: boolean;
  error: string | null;
  workoutProgress: WorkoutProgress[];
  totalTime: number;
  totalCalories: number;
  completedTime: number;
  completedCalories: number;
}

const initialState: ExerciseState = {
  exerciseList: [],
  currentWorkout: null,
  userScore: 0,
  scoreLoading: false,
  loading: false,
  error: null,
  workoutProgress: [],
  totalTime: 0,
  totalCalories: 0,
  completedTime: 0,
  completedCalories: 0,
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.exerciseList = action.payload;
    },
    setCurrentWorkout: (state, action: PayloadAction<Workout>) => {
      state.currentWorkout = action.payload;
    },
    setUserScore: (state, action: PayloadAction<number>) => {
      state.userScore = action.payload;
    },
    initializeWorkoutProgress: (state) => {
      state.workoutProgress = state.exerciseList.map((workout) => ({
        workoutId: workout.id,
        completed: false,
        timeSpent: 0,
        caloriesBurned: 0,
      }));
      state.totalTime = calculateTotalTime(state.exerciseList, "medium");
      state.totalCalories = calculateTotalCalories(
        state.exerciseList,
        "medium"
      );
    },
    completeWorkout: (
      state,
      action: PayloadAction<{ workoutId: number; timeSpent: number }>
    ) => {
      const { workoutId, timeSpent } = action.payload;
      const workout = state.exerciseList.find((w) => w.id === workoutId);
      const progressIndex = state.workoutProgress.findIndex(
        (p) => p.workoutId === workoutId
      );

      if (workout && progressIndex !== -1) {
        const caloriesBurned = calculateWorkoutCalories(workout, "medium");

        state.workoutProgress[progressIndex] = {
          workoutId: workoutId,
          completed: true,
          timeSpent,
          caloriesBurned,
        };

        state.completedTime += timeSpent;
        state.completedCalories += caloriesBurned;
      }
    },
    resetProgress: (state) => {
      state.workoutProgress = state.workoutProgress.map((progress) => ({
        ...progress,
        completed: false,
        timeSpent: 0,
        caloriesBurned: 0,
      }));
      state.completedTime = 0;
      state.completedCalories = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkoutsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWorkoutsList.fulfilled, (state, action) => {
      state.loading = false;
      state.exerciseList = action.payload;

      const totalTime = calculateTotalTime(action.payload, "medium");
      const totalCalories = calculateTotalCalories(action.payload, "medium");
      state.totalTime = totalTime;
      state.totalCalories = totalCalories;

      state.workoutProgress = action.payload.map((workout: Workout) => {
        const existing = state.workoutProgress.find(
          (p) => p.workoutId === workout.id
        );
        return (
          existing || {
            workoutId: workout.id,
            completed: false,
            timeSpent: 0,
            caloriesBurned: 0,
          }
        );
      });
    });
    builder.addCase(getWorkoutsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred";
      if (state.error) {
        Toast.show({ type: "error", text1: state.error });
      }
    });
    builder.addCase(getWorkoutById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWorkoutById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentWorkout = action.payload;
    });
    builder.addCase(getWorkoutById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred";
      if (state.error) {
        Toast.show({ type: "error", text1: state.error });
      }
    });
    builder.addCase(getUserScore.pending, (state) => {
      state.scoreLoading = true;
    });
    builder.addCase(getUserScore.fulfilled, (state, action) => {
      state.scoreLoading = false;
      state.userScore = action.payload;
    });
    builder.addCase(getUserScore.rejected, (state, action) => {
      state.scoreLoading = false;
      state.error = action.error.message ?? "An error occurred";
      if (state.error) {
        Toast.show({ type: "error", text1: state.error });
      }
    });
  },
});

export const {
  setWorkouts,
  setCurrentWorkout,
  setUserScore,
  initializeWorkoutProgress,
  completeWorkout,
  resetProgress,
} = exerciseSlice.actions;
export default exerciseSlice.reducer;
