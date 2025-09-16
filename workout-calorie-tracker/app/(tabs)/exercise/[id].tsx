import { ExerciseDetailSkeleton } from "@/components/Skeleton";
import { completeWorkout, getWorkoutById } from "@/redux/slice/exerciseSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Workout } from "@/types/ui";
import {
  calculateWorkoutCalories,
  formatTime,
} from "@/utils/workoutCalculations";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const exerciseList = useSelector(
    (state: RootState) => state.exercise.exerciseList
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.exercise.currentWorkout
  );
  const loading = useSelector((state: RootState) => state.exercise.loading);

  const [workoutState, setWorkoutState] = useState<
    "info" | "countdown" | "exercise" | "completed"
  >("info");

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "medium" | "hard"
  >("medium");

  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [circularProgress, setCircularProgress] = useState(100);
  const [countdownProgress, setCountdownProgress] = useState(100);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [restTimer, setRestTimer] = useState(0);
  const [restStartTime, setRestStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getWorkoutById(parseInt(id as string)));
    }
  }, [id, dispatch]);

  const workout = useMemo(
    () =>
      currentWorkout ||
      exerciseList.find(
        (workout: Workout) => workout.id === parseInt(id as string)
      ),
    [currentWorkout, exerciseList, id]
  );

  useEffect(() => {
    if (workout) {
      const newDuration = getDurationFromLevel(workout, selectedLevel);
      setTimer(newDuration);
    }
  }, [selectedLevel, workout]);

  const getDurationFromLevel = (
    workout: Workout,
    level: "easy" | "medium" | "hard"
  ): number => {
    const levelData = workout.levels[level];
    if (typeof levelData.reps === "string") {
      const match = levelData.reps.match(/\d+/);
      return match ? parseInt(match[0]) : 30;
    }
    return (levelData.reps as number) * 2;
  };

  const getRestTimeFromLevel = (
    workout: Workout,
    level: "easy" | "medium" | "hard"
  ): number => {
    const levelData = workout.levels[level];
    if (typeof levelData.rest === "string") {
      const match = levelData.rest.match(/\d+/);
      return match ? parseInt(match[0]) : 30;
    }
    return levelData.rest as number;
  };

  const staticData = useMemo(
    () =>
      workout
        ? [
            {
              id: 1,
              title: `${calculateWorkoutCalories(
                workout,
                selectedLevel
              )} کالری`,
              image: require("@/assets/icon/Fire.png"),
            },
            {
              id: 2,
              title: `${Math.ceil(
                getDurationFromLevel(workout, selectedLevel) / 60
              )} دقیقه`,
              image: require("@/assets/icon/timer.png"),
            },
            {
              id: 3,
              title:
                selectedLevel === "easy"
                  ? "آسان"
                  : selectedLevel === "medium"
                  ? "متوسط"
                  : "سخت",
              image: require("@/assets/icon/Medium.png"),
            },
          ]
        : [],
    [workout, selectedLevel]
  );

  const workoutDisplayData = useMemo(
    () =>
      workout
        ? [
            {
              id: workout.id,
              title: workout.nameFa,
              subtitle:
                typeof workout.levels[selectedLevel].reps === "string"
                  ? workout.levels[selectedLevel].reps
                  : `${workout.levels[selectedLevel].sets} ست ${workout.levels[selectedLevel].reps} تایی`,
              duration: getDurationFromLevel(workout, selectedLevel),
              image:
                workout.id % 2 === 1
                  ? require("@/assets/images/image/1.png")
                  : require("@/assets/images/image/2.png"),
              completed: false,
            },
          ]
        : [],
    [workout, selectedLevel]
  );

  const currentExercise = workoutDisplayData[0];
  const exercisesList = workoutDisplayData;
  const activeExercise = exercisesList[currentExerciseIndex] || currentExercise;
  const exercisesListLength = exercisesList.length;

  useEffect(() => {
    let interval: any;

    if (workoutState === "countdown" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          const progress = (newCountdown / 3) * 100;
          setCountdownProgress(progress);

          if (newCountdown <= 0) {
            setWorkoutState("exercise");
            const exerciseDuration = getDurationFromLevel(
              workout!,
              selectedLevel
            );
            setTimer(exerciseDuration);
            setCircularProgress(100);
            setIsPlaying(true);
            return 0;
          }
          return newCountdown;
        });
      }, 1000);
    } else if (
      workoutState === "exercise" &&
      isPlaying &&
      timer > 0 &&
      workout
    ) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          const exerciseDuration = getDurationFromLevel(workout, selectedLevel);
          const progress = (newTime / exerciseDuration) * 100;
          setCircularProgress(progress);

          const totalSegments = 10;
          const completedSegments = Math.floor(
            ((exerciseDuration - newTime) / exerciseDuration) * totalSegments
          );
          setExerciseProgress(completedSegments);

          if (newTime <= 0) {
            if (currentExerciseIndex < exercisesListLength - 1) {
              setCurrentExerciseIndex((prev) => prev + 1);
              setWorkoutState("countdown");
              setCountdown(3);
              setExerciseProgress(0);
              setCircularProgress(100);
            } else {
              handleCompleteWorkout();
              setWorkoutState("completed");
            }
            setIsPlaying(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    workoutState,
    countdown,
    timer,
    isPlaying,
    currentExerciseIndex,
    workout,
    selectedLevel,
    exercisesListLength,
  ]);

  useEffect(() => {
    let restInterval: any;

    if (!isPlaying && restTimer > 0 && restStartTime) {
      restInterval = setInterval(() => {
        setRestTimer((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setRestStartTime(null);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(restInterval);
  }, [isPlaying, restTimer, restStartTime]);

  const startWorkout = () => {
    setWorkoutState("countdown");
    setCurrentExerciseIndex(0);
    setCountdown(3);
    setExerciseProgress(0);
    setWorkoutStartTime(Date.now());
  };

  const handleCompleteWorkout = () => {
    if (workout && workoutStartTime) {
      const timeSpent = Math.floor((Date.now() - workoutStartTime) / 1000);
      setTotalTimeSpent(timeSpent);
      dispatch(
        completeWorkout({
          workoutId: workout.id,
          timeSpent: timeSpent,
        })
      );
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setPausedAt(timer);
      if (workout && restTimer === 0) {
        const restTime = getRestTimeFromLevel(workout, selectedLevel);
        setRestTimer(restTime);
        setRestStartTime(Date.now());
      }
    } else {
      if (pausedAt !== null) {
        setTimer(pausedAt);
        setPausedAt(null);
      }
      setRestStartTime(null);
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (workout) {
      setTimer((prev) => {
        const newTime = Math.max(0, prev - 10);
        const exerciseDuration = getDurationFromLevel(workout, selectedLevel);
        const progress = (newTime / exerciseDuration) * 100;
        setCircularProgress(progress);

        const totalSegments = 10;
        const completedSegments = Math.floor(
          ((exerciseDuration - newTime) / exerciseDuration) * totalSegments
        );
        setExerciseProgress(completedSegments);

        return newTime;
      });
    }
  };

  const skipBackward = () => {
    if (workout) {
      setTimer((prev) => {
        const exerciseDuration = getDurationFromLevel(workout, selectedLevel);
        const newTime = Math.min(exerciseDuration, prev + 10);
        const progress = (newTime / exerciseDuration) * 100;
        setCircularProgress(progress);

        const totalSegments = 10;
        const completedSegments = Math.floor(
          ((exerciseDuration - newTime) / exerciseDuration) * totalSegments
        );
        setExerciseProgress(completedSegments);

        return newTime;
      });
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setWorkoutState("countdown");
      setCountdown(3);
      setExerciseProgress(0);
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercisesListLength - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setWorkoutState("countdown");
      setCountdown(3);
      setExerciseProgress(0);
    } else {
      handleCompleteWorkout();
      setWorkoutState("completed");
    }
  };

  const finishWorkout = () => {
    handleCompleteWorkout();
    router.push("/(tabs)");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFEEF0]">
        <ExerciseDetailSkeleton />
      </SafeAreaView>
    );
  }

  if (!workout && !loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#FFEEF0]">
        <Text className="text-lg font-bold text-gray-800">تمرین پیدا نشد</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-6 py-2 bg-pink-400 rounded-lg"
        >
          <Text className="text-white font-semibold">بازگشت</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!currentExercise) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFEEF0]">
        <ExerciseDetailSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFEEF0]">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <View className="w-6" />
        <Text className="text-lg font-semibold text-gray-800 flex-1 text-center">
          {workoutState === "info"
            ? currentExercise.title
            : activeExercise.title}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-forward" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {workoutState === "info" && (
        <>
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View className="bg-white overflow-hidden">
              <Image
                source={require("@/assets/images/image/3.png")}
                className="w-full h-96"
                resizeMode="cover"
              />
            </View>

            <View className="flex gap-4 p-4">
              <View className="flex-row justify-around rounded-2xl p-4 bg-white">
                {staticData.map((item) => (
                  <View
                    key={item.id}
                    className="flex flex-col items-center gap-3"
                  >
                    <Image source={item.image} className="size-8" />
                    <Text className="text-sm text-gray-600 text-center font-medium">
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex bg-white rounded-2xl overflow-hidden">
                <View className="border-b border-gray-200 px-4 py-3">
                  <View className="flex justify-end items-end">
                    <Text className="font-bold">نام حرکت:</Text>
                    <Text>{currentWorkout?.nameFa || "تمرین"}</Text>
                  </View>
                </View>

                <View className="border-b border-gray-200 px-4 py-3">
                  <View className="flex justify-end items-end">
                    <Text className="font-bold">نواحی درگیر بدن:</Text>
                    <Text>
                      {currentWorkout?.bodyParts?.join("، ") || "عضلات مختلف"}
                    </Text>
                  </View>
                </View>

                <View className="px-4 py-3">
                  <View className="flex flex-col items-end">
                    <Text className="font-bold text-right">هدف تمرین:</Text>
                    <Text className="text-right">
                      {currentWorkout?.goal || "بهبود وضعیت بدنی و سلامت"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-100">
            <TouchableOpacity
              onPress={startWorkout}
              className="bg-pink-400 rounded-2xl py-4 items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-bold">شروع کنید</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {workoutState === "countdown" && (
        <View className="flex-1 items-center justify-center">
          <View
            className="w-48 h-48 rounded-full items-center justify-center bg-pink-50"
            style={{
              borderWidth: Math.max(0, (countdownProgress / 100) * 8),
              borderColor: "#F472B6",
            }}
          >
            <Text className="text-6xl font-bold text-pink-400">
              {countdown}
            </Text>
          </View>
        </View>
      )}

      {workoutState === "exercise" && (
        <View className="flex-1 bg-pink-50">
          <View className="bg-white">
            <Image
              source={require("@/assets/images/image/3.png")}
              className="w-full h-96"
              resizeMode="cover"
            />
          </View>

          <View className="flex-col gap-4 px-4 pt-6">
            <View className="flex-row justify-around gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <View key={index}>
                  <View
                    className={`h-3 w-8 rounded-full ${
                      index < exerciseProgress ? "bg-blue-400" : "bg-gray-300"
                    }`}
                  />
                </View>
              ))}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="font-bold text-gray-800">
                {currentExerciseIndex + 1} از {exercisesList.length} حرکت
              </Text>
              <Text className="text-lg text-gray-800">
                {activeExercise.title}
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col justify-center items-center px-4">
            <View className="flex flex-row items-center justify-around w-full">
              <TouchableOpacity
                onPress={previousExercise}
                disabled={currentExerciseIndex === 0}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={currentExerciseIndex === 0 ? "#D1D5DB" : "#374151"}
                />
              </TouchableOpacity>

              <TouchableOpacity className="relative" onPress={skipBackward}>
                <Image
                  source={require("@/assets/icon/rotate-left.png")}
                  className="w-10 h-10"
                />
                <Text className="text-xs absolute top-[12px] left-1/2 transform -translate-x-1/2">
                  -10
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={togglePlayPause}
                className="flex-col items-center justify-center gap-1 bg-[#F9DCE5] rounded-full size-40 relative"
                style={{
                  borderWidth: Math.max(0, (circularProgress / 100) * 8),
                  borderColor: "#F77CA3",
                }}
              >
                <Text className="text-2xl font-bold text-[#F77CA3]">
                  {formatTime(timer)}
                </Text>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  color="#F77CA3"
                  size={40}
                />
              </TouchableOpacity>

              <TouchableOpacity className="relative" onPress={skipForward}>
                <Image
                  source={require("@/assets/icon/rotate-right.png")}
                  className="w-10 h-10"
                />
                <Text className="text-xs absolute top-[12px] left-1/2 transform -translate-x-1/2">
                  +10
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={nextExercise}>
                <Ionicons name="chevron-forward" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {!isPlaying && (
              <View className="items-center mt-8">
                <View className="bg-[#F77CA3] px-4 py-2 rounded">
                  <Text className="text-white text-lg font-medium">
                    {restTimer > 0
                      ? `${formatTime(restTimer)} استراحت`
                      : `${
                          workout
                            ? getRestTimeFromLevel(workout, selectedLevel)
                            : 30
                        } ثانیه استراحت`}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {workoutState === "completed" && (
        <View className="flex-1 bg-pink-50">
          <View className="bg-white">
            <Image
              source={require("@/assets/images/image/3.png")}
              className="w-full h-96"
              resizeMode="cover"
            />
          </View>

          <View className="flex-col gap-4 px-4 pt-6">
            <View className="flex-row justify-around gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <View key={index}>
                  <View className="h-3 w-8 rounded-full bg-green-400" />
                </View>
              ))}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="font-bold text-gray-800">تمرین تکمیل شد!</Text>
              <Text className="text-lg text-gray-800">
                {activeExercise.title}
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col justify-center items-center px-4">
            <View className="flex flex-row items-center justify-around w-full">
              <TouchableOpacity disabled>
                <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
              </TouchableOpacity>

              <TouchableOpacity disabled className="relative">
                <Image
                  source={require("@/assets/icon/rotate-left.png")}
                  className="w-10 h-10 opacity-50"
                />
              </TouchableOpacity>

              <View className="flex-col items-center justify-center gap-1 bg-green-100 rounded-full size-40">
                <Text className="text-2xl font-bold text-green-600">00:00</Text>
                <Ionicons name="checkmark" color="#16A34A" size={40} />
              </View>

              <TouchableOpacity disabled className="relative">
                <Image
                  source={require("@/assets/icon/rotate-right.png")}
                  className="w-10 h-10 opacity-50"
                />
              </TouchableOpacity>

              <TouchableOpacity disabled>
                <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
              </TouchableOpacity>
            </View>

            <View className="items-center mt-8">
              <View className="bg-gray-400 px-4 py-2 rounded">
                <Text className="text-white text-lg font-medium">
                  تمرین تکمیل شد
                </Text>
              </View>
            </View>
          </View>

          <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-100">
            <View className="bg-gray-50 rounded-xl p-4 w-full mb-4">
              <Text className="text-base font-semibold text-gray-800 mb-3 text-center">
                آمار تمرین
              </Text>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-800">
                  {formatTime(totalTimeSpent)}
                </Text>
                <Text className="text-gray-600">زمان تمرین:</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-800">
                  {workout
                    ? calculateWorkoutCalories(workout, selectedLevel)
                    : 0}{" "}
                  کالری
                </Text>
                <Text className="text-gray-600">کالری سوزانده شده:</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-gray-800">
                  {selectedLevel === "easy"
                    ? "آسان"
                    : selectedLevel === "medium"
                    ? "متوسط"
                    : "سخت"}
                </Text>
                <Text className="text-gray-600">سطح تمرین:</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={finishWorkout}
              className="bg-pink-400 rounded-2xl py-4 items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-bold">پایان</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ExerciseDetail;
