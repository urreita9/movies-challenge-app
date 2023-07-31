import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"
import LoginScreen from "./src/features/auth/screens/LoginScreen/LoginScreen"
import "react-native-url-polyfill/auto"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <LoginScreen />
        <StatusBar style='auto' />
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
