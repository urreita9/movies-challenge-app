import { render, screen } from "@testing-library/react-native"
import LoginScreen from "./LoginScreen"
import locales from "./locales.json"

describe("When Login Screen mounts", () => {
  it("should display app logo", () => {
    render(<LoginScreen />)

    screen.getByTestId("logo")
  })
})
