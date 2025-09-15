import ErrorCallBack from "@/components/ui/errorCallBack";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "react-error-boundary";
import { View } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorCallBack}>
        <View className="bg-white h-10" />
        <StatusBar style="dark" translucent backgroundColor="transparent" />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <Toast />
      </ErrorBoundary>
    </Provider>
  );
}
