import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { QueryClient, QueryClientProvider } from "react-query"
import { AppNavigator } from "./src/features/AppNavigator/AppNavigator"
import "react-native-url-polyfill/auto"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style='auto' />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
