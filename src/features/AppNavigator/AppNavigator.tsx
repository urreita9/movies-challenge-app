import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../auth/screens/LoginScreen/LoginScreen"
import HomeScreen from "../home/screens/HomeScreen/HomeScreen"
import { RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigator = () => {
  const { Navigator, Screen } = Stack

  return (
    <Navigator>
      <Screen name='Login' component={LoginScreen}></Screen>
      <Screen name='Home' component={HomeScreen}></Screen>
    </Navigator>
  )
}
