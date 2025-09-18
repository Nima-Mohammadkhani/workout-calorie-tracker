import { apiclient } from "../instance";

export const exerciseService = {
  getWorkouts: () => apiclient.get('/workouts'),
  getWorkoutById: (id: number) => apiclient.get(`/workouts/${id}`),
};