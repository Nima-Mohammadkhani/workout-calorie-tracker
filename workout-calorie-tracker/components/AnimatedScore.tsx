import React, { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";

interface AnimatedScoreProps {
  score: number;
  loading: boolean;
}

export const AnimatedScore: React.FC<AnimatedScoreProps> = ({
  score,
  loading,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const displayScore = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading && score > 0) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(displayScore, {
          toValue: score,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [loading, score, fadeAnim, scaleAnim, displayScore]);

  if (loading) {
    return null;
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
      className="flex flex-row items-center gap-2"
    >
      <Image source={require("@/assets/icon/flower.png")} />
      <Animated.Text
        className="text-lg font-semibold text-gray-800"
        style={{ opacity: fadeAnim }}
      >
        {score}
      </Animated.Text>
    </Animated.View>
  );
};
