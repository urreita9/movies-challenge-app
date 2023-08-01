import { baseUrl } from "./src/features/auth/services/config"
import { server } from "./src/mocks/server"
import { queryClient } from "./src/test-utils/renderWithProviders"
// import "react-native-gesture-handler/jestSetup"

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("./src/features/auth/services/config", () => ({
  baseUrl: "http://mock-server.com",
}))

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

beforeEach(() => queryClient.clear())

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
