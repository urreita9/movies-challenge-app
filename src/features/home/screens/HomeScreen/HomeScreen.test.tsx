import { render, screen } from "@testing-library/react-native"
import HomeScreen from "./HomeScreen"
import locales from "./locales.json"

describe("When Home Screen mounts", () => {
  it("should render correctly", () => {
    render(<HomeScreen />)
  })
  it("should render search bar component", () => {
    render(<HomeScreen />)

    expect(screen.getByPlaceholderText(locales.search)).toBeOnTheScreen()
  })
})
