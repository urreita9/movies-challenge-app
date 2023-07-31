import { baseUrl } from "./src/features/auth/services/config"
import { server } from "./src/mocks/server"
import { queryClient } from "./src/test-utils/renderWithProviders"

jest.mock("./src/features/auth/services/config", () => ({
  baseUrl: "http://mock-server.com",
}))

beforeEach(() => queryClient.clear())

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
