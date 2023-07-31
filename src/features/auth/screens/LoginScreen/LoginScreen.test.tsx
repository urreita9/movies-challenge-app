import { screen, fireEvent, waitFor } from "@testing-library/react-native"
import "@testing-library/jest-native"
import LoginScreen from "./LoginScreen"
import locales from "./locales.json"
import { renderWithProviders } from "../../../../test-utils/renderWithProviders"
import { server } from "../../../../mocks/server"
import { rest } from "msw"
import { baseUrl } from "../../services/config"
import { storeToken } from "../../utils"
import { MOCKED_TOKEN } from "../../services/constants"

jest.mock("../../utils", () => ({
  storeToken: jest.fn(),
}))

const mockServerWithError = (statusCode: number) => {
  server.use(
    rest.post(`${baseUrl}/login`, (req, res, ctx) =>
      res(ctx.delay(1), ctx.status(statusCode), ctx.json("error api"))
    )
  )
}

const getEmailInput = () => screen.getByPlaceholderText(locales.input_email)
const getPasswordInput = () =>
  screen.getByPlaceholderText(locales.input_password)
const getSubmitBtn = () => screen.getByTestId("login_submit_btn")

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

describe("When Login form is submited correctly and", () => {
  it("should  disable submit mutton", async () => {
    renderWithProviders(<LoginScreen />)

    expect(getSubmitBtn()).not.toBeDisabled()

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    await waitFor(() => expect(getSubmitBtn()).toBeDisabled())
  })
  it.only("should fetch login with email and password and save token on response status 200", async () => {
    renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    await waitFor(() => expect(storeToken).toHaveBeenCalledWith(MOCKED_TOKEN))
  })
  it("should show error message when user is unauthoirized (response status 401)", async () => {
    mockServerWithError(401)
    renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    expect(await screen.findByText("error api"))
  })
})
