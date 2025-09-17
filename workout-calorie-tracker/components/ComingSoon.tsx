import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  icon,
  primaryColor,
  secondaryColor,
  accentColor,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1" style={{ backgroundColor: primaryColor }}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-white text-center">
            {title}
          </Text>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <View className="flex-col items-center gap-6 w-full max-w-sm">
            <View
              className="w-32 h-32 rounded-full items-center justify-center shadow-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <View
                className="w-24 h-24 rounded-full items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <Ionicons name={icon} size={48} color="white" />
              </View>
            </View>

            <Text className="text-4xl font-bold text-white text-center">
              به زودی...
            </Text>

            <Text className="text-lg text-white/90 text-center leading-7">
              {description}
            </Text>

            <View className="w-full max-w-xs flex-col gap-2">
              <View className="flex-row justify-between">
                <Text className="text-white/80 text-sm">پیشرفت توسعه</Text>
                <Text className="text-white/80 text-sm">65%</Text>
              </View>
              <View className="w-full h-2 bg-white/20 rounded-full">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: "65%",
                    backgroundColor: accentColor,
                  }}
                />
              </View>
            </View>

            <View className="w-full max-w-sm flex-col gap-4">
              <Text className="text-white text-lg font-semibold text-center">
                ویژگی‌های در راه:
              </Text>
              <View className="flex-col gap-2">
                {getFeatures(title).map((feature, index) => (
                  <View
                    key={index}
                    className="flex-row items-center bg-white/10 rounded-xl p-4"
                  >
                    <Text className="text-white text-base text-right flex-1">
                      {feature}
                    </Text>
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center ml-3"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="items-center py-6">
          <View className="flex-row gap-2">
            {[...Array(3)].map((_, i) => (
              <View
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    i === 1 ? accentColor : "rgba(255, 255, 255, 0.3)",
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getFeatures = (title: string): string[] => {
  switch (title) {
    case "فروشگاه":
      return [
        "خرید تجهیزات ورزشی",
        "مکمل‌های غذایی",
        "لباس‌های ورزشی",
        "پرداخت آنلاین امن",
      ];
    case "چت و پشتیبانی":
      return [
        "گفتگو با مربی شخصی",
        "پشتیبانی ۲۴ ساعته",
        "گروه‌های ورزشی",
        "مشاوره تغذیه",
      ];
    case "تقویم تمرین":
      return [
        "برنامه‌ریزی هوشمند",
        "یادآوری تمرین‌ها",
        "پیگیری پیشرفت",
        "آمار دقیق",
      ];
    case "پروفایل":
      return [
        "تنظیمات شخصی",
        "آمار پیشرفت",
        "دستاوردها و جوایز",
        "اشتراک‌گذاری نتایج",
      ];
    default:
      return [
        "رابط کاربری زیبا",
        "عملکرد بهینه",
        "ویژگی‌های جدید",
        "تجربه کاربری عالی",
      ];
  }
};

export default ComingSoon;
