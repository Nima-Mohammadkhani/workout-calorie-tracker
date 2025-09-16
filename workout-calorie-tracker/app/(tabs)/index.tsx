import { AnimatedScore } from "@/components/AnimatedScore";
import { IndexPageSkeleton, ScoreSkeleton } from "@/components/Skeleton";
import { getUserScore, getWorkoutsList } from "@/redux/slice/exerciseSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Workout, WorkoutDisplayItem } from "@/types/ui";
import { formatTime } from "@/utils/workoutCalculations";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const exerciseList = useSelector(
    (state: RootState) => state.exercise.exerciseList
  );
  const loading = useSelector((state: RootState) => state.exercise.loading);
  const userScore = useSelector((state: RootState) => state.exercise.userScore);
  const scoreLoading = useSelector(
    (state: RootState) => state.exercise.scoreLoading
  );

  const workoutProgress = useSelector(
    (state: RootState) => state.exercise.workoutProgress
  );
  const totalTime = useSelector((state: RootState) => state.exercise.totalTime);
  const totalCalories = useSelector(
    (state: RootState) => state.exercise.totalCalories
  );
  const completedTime = useSelector(
    (state: RootState) => state.exercise.completedTime
  );
  const completedCalories = useSelector(
    (state: RootState) => state.exercise.completedCalories
  );

  const statisticsData = [
    {
      id: 1,
      title: `${completedCalories} از ${totalCalories} کالری`,
      image: require("@/assets/icon/Fire.png"),
    },
    {
      id: 2,
      title: `${formatTime(completedTime)} از ${formatTime(totalTime)}`,
      image: require("@/assets/icon/timer.png"),
    },
    {
      id: 3,
      title: "سطح متوسط",
      image: require("@/assets/icon/Medium.png"),
    },
  ];

  useEffect(() => {
    dispatch(getWorkoutsList());
    dispatch(getUserScore());
  }, [dispatch]);

  const convertWorkoutToDisplay = (
    workout: Workout,
    level: "easy" | "medium" | "hard" = "medium"
  ): WorkoutDisplayItem => {
    const currentLevel = workout.levels[level];
    const subtitle =
      typeof currentLevel.reps === "string"
        ? currentLevel.reps
        : `${currentLevel.sets} ست ${currentLevel.reps} تایی`;

    const imageIndex = (workout.id % 2) + 1;
    const image =
      imageIndex === 1
        ? require("@/assets/images/image/1.png")
        : require("@/assets/images/image/2.png");
    const progress = workoutProgress.find((p) => p.workoutId === workout.id);
    const completed = progress?.completed || false;

    return {
      id: workout.id,
      title: workout.nameFa,
      subtitle,
      image,
      completed,
    };
  };

  const workoutData: WorkoutDisplayItem[] = exerciseList.map((workout) =>
    convertWorkoutToDisplay(workout)
  );

  const handleExercisePress = (id: number) => {
    router.push(`/exercise/${id}`);
  };

  const handleStartWorkout = () => {
    if (workoutData.length > 0) {
      router.push(`/exercise/${workoutData[0].id}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFEEF0]">
      <View className="flex-row justify-end px-6 py-4 bg-white">
        {scoreLoading ? (
          <ScoreSkeleton />
        ) : (
          <AnimatedScore score={userScore} loading={scoreLoading} />
        )}
      </View>

      {loading || exerciseList.length === 0 ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <IndexPageSkeleton />
        </ScrollView>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-6 p-6">
            <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <View className="p-6">
                <View className="flex flex-row justify-around">
                  {statisticsData.map((item) => (
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
              </View>
              <View className="h-px bg-gray-200" />
              {workoutData.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleExercisePress(item.id)}
                  className={`flex flex-row items-center justify-between p-4 ${
                    index !== workoutData.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <View className="flex flex-row items-center gap-4">
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#CBD5E0"
                      style={{ transform: [{ rotate: "180deg" }] }}
                    />
                    <View className="w-8 h-8 rounded-full border-2 border-gray-300 items-center justify-center">
                      {item.completed ? (
                        <View className="w-6 h-6 rounded-full bg-pink-400 items-center justify-center">
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                      ) : (
                        <View className="w-4 h-4 rounded-full bg-gray-300" />
                      )}
                    </View>
                  </View>
                  <View className="flex flex-row items-center gap-4">
                    <View className="flex items-end">
                      <Text className="font-semibold">{item.title}</Text>
                      <Text className="text-sm text-gray-500">
                        {item.subtitle}
                      </Text>
                    </View>
                    <Image
                      source={item.image}
                      className="w-16 h-16 rounded-lg"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Pressable
              onPress={handleStartWorkout}
              className="bg-[#F77CA3] py-4 rounded-2xl shadow-lg"
            >
              <Text className="text-center text-white text-lg font-semibold">
                شروع کنید
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Index;
