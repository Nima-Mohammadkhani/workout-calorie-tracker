import { ScrollView, Text, View } from "react-native"
const ErrorCallBack = ({error}: {error: Error}) => {
    return(
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-600 text-lg font-bold mb-2">Something went wrong!</Text>
                <Text className="text-gray-700 text-center">
                    An unexpected error occurred. Please try again later.
                </Text>
                <Text>{error.message}</Text>
            </View>
        </ScrollView>
    )
}
export default ErrorCallBack