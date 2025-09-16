import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const backgroundColor = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#F9FAFB"],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

export const ScoreSkeleton: React.FC = () => {
  return (
    <View className="flex flex-row items-center gap-2">
      <Skeleton width={32} height={32} borderRadius={16} />
      <Skeleton width={50} height={20} borderRadius={4} />
    </View>
  );
};

export const WorkoutItemSkeleton: React.FC = () => {
  return (
    <View className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
      <View className="flex flex-row items-center gap-4">
        <Skeleton width={20} height={20} borderRadius={10} />
        <Skeleton width={32} height={32} borderRadius={16} />
      </View>
      <View className="flex flex-row items-center gap-4">
        <View className="flex items-end gap-1">
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={14} />
        </View>
        <Skeleton width={64} height={64} borderRadius={8} />
      </View>
    </View>
  );
};

export const StatsSkeleton: React.FC = () => {
  return (
    <View className="flex flex-row justify-around">
      {[1, 2, 3].map((item) => (
        <View key={item} className="flex flex-col items-center gap-3">
          <Skeleton width={32} height={32} borderRadius={4} />
          <Skeleton width={80} height={14} />
        </View>
      ))}
    </View>
  );
};

export const IndexPageSkeleton: React.FC = () => {
  return (
    <View className="flex flex-col gap-6 p-6">
      <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <View className="p-6">
          <StatsSkeleton />
        </View>
        <View className="h-px bg-gray-200" />
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <WorkoutItemSkeleton key={item} />
        ))}
      </View>
      <Skeleton height={56} borderRadius={16} />
    </View>
  );
};

export const PartialLoadingSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <WorkoutItemSkeleton key={`partial-${index}`} />
      ))}
    </>
  );
};

export const ExerciseDetailSkeleton: React.FC = () => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <View className="w-6" />
        <Skeleton width={150} height={20} />
        <Skeleton width={24} height={24} borderRadius={12} />
      </View>

      <View className="bg-white">
        <Skeleton width="100%" height={384} borderRadius={0} />
      </View>

      <View className="flex gap-4 p-4">
        <View className="flex-row justify-around rounded-2xl p-4 bg-white">
          <StatsSkeleton />
        </View>

        <View className="flex bg-white rounded-2xl overflow-hidden">
          <View className="border-b border-gray-200 px-4 py-3">
            <View className="flex justify-end items-end gap-2">
              <Skeleton width={80} height={16} />
              <Skeleton width={120} height={16} />
            </View>
          </View>

          <View className="border-b border-gray-200 px-4 py-3">
            <View className="flex justify-end items-end gap-2">
              <Skeleton width={120} height={16} />
              <Skeleton width={150} height={16} />
            </View>
          </View>

          <View className="px-4 py-3">
            <View className="flex flex-col items-end gap-2">
              <Skeleton width={80} height={16} />
              <Skeleton width="100%" height={60} />
            </View>
          </View>

          <View className="px-4 py-3 border-t border-gray-200">
            <Skeleton
              width={80}
              height={16}
              style={{ marginBottom: 12, alignSelf: "flex-end" }}
            />
            <View className="flex-row justify-around">
              {[1, 2, 3].map((item) => (
                <View key={item} className="items-center">
                  <Skeleton width={70} height={36} borderRadius={8} />
                  <Skeleton
                    width={50}
                    height={12}
                    borderRadius={4}
                    style={{ marginTop: 4 }}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-100">
        <Skeleton height={56} borderRadius={16} />
      </View>
    </View>
  );
};
