import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"
import LoginScreen from "./LoginScreen"
import locales from "./locales.json"
import { renderWithProviders } from "../../../../test-utils/renderWithProviders"
import { login } from "../../services/auth"

jest.mock("../../services/auth", () => ({
  __esModule: true,
  login: jest.fn(),
}))

const getEmailInput = () => screen.getByPlaceholderText(locales.input_email)
const getPasswordInput = () =>
  screen.getByPlaceholderText(locales.input_password)
const getSubmitBtn = () => screen.getByText(locales.submit)

describe("When Login Screen mounts", () => {
  it("should display app logo", () => {
    renderWithProviders(<LoginScreen />)

    screen.getByTestId("logo")
  })
  it("should display email and password inputs", () => {
    renderWithProviders(<LoginScreen />)

    getEmailInput()
    getPasswordInput()
  })
  it("should display form submit button", () => {
    renderWithProviders(<LoginScreen />)

    getSubmitBtn()
  })
})

describe("When Login form is submited with errors", () => {
  it("should show required messages when submit button is pressed with no values", async () => {
    renderWithProviders(<LoginScreen />)

    fireEvent.press(getSubmitBtn())

    expect(await screen.findAllByText(locales.required)).toHaveLength(2)
  })
  it("should show wrong email format message when user types in an invalid email", async () => {
    renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getEmailInput(), "invalidEmail.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    expect(await screen.findByText(locales.invalid_email))
  })
})

describe("When Login form is submited correctly", () => {
  it("should fetch login with email and password", async () => {
    renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        email: "email@email.com",
        password: "123456",
      })
    )
  })
  it("should show error message when user is unauthoirized (response status 401)", () => {
    const loginError = require("../../services/auth")
    loginError.mockImplementation()
  })
})
