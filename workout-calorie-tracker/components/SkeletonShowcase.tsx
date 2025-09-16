import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  ExerciseDetailSkeleton,
  IndexPageSkeleton,
  ScoreSkeleton,
  Skeleton,
  StatsSkeleton,
  WorkoutItemSkeleton,
} from "./Skeleton";

export const SkeletonShowcase: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold mb-4 text-center">
          Skeleton Components Showcase
        </Text>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Basic Skeleton:</Text>
          <Skeleton width="100%" height={20} />
          <View className="h-2" />
          <Skeleton width="80%" height={16} />
          <View className="h-2" />
          <Skeleton width="60%" height={14} />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Score Skeleton:</Text>
          <ScoreSkeleton />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Stats Skeleton:</Text>
          <View className="bg-white p-4 rounded-xl">
            <StatsSkeleton />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">
            Workout Item Skeleton:
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <WorkoutItemSkeleton />
            <WorkoutItemSkeleton />
            <WorkoutItemSkeleton />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">
            Index Page Skeleton (Preview):
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            Full skeleton for index page
          </Text>
          <View style={{ height: 300, overflow: "hidden" }}>
            <IndexPageSkeleton />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">
            Exercise Detail Skeleton (Preview):
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            Full skeleton for exercise detail
          </Text>
          <View style={{ height: 400, overflow: "hidden" }}>
            <ExerciseDetailSkeleton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
