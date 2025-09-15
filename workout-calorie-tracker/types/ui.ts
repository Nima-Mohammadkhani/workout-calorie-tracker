import { Ionicons } from "@expo/vector-icons";
import { TextInputProps } from "react-native";

export type IconName = keyof typeof Ionicons.glyphMap;

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: string;
  size?: string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconSize?: number;
  rippleColor?: string;
}

export interface ExerciseLevel {
  sets: number;
  reps: string | number;
  rest: string;
  calories?: number;
}

export interface WorkoutLevels {
  easy: ExerciseLevel;
  medium: ExerciseLevel;
  hard: ExerciseLevel;
}

export interface Workout {
  id: number;
  nameFa: string;
  nameEn: string;
  bodyParts: string[];
  goal: string;
  levels: WorkoutLevels;
}

export interface WorkoutDisplayItem {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  completed: boolean;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  secureToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}
