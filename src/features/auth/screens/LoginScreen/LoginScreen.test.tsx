import { screen, fireEvent, waitFor } from "@testing-library/react-native"
import "@testing-library/jest-native"
import LoginScreen from "./LoginScreen"
import locales from "./locales.json"
import { renderWithProviders } from "../../../../test-utils/renderWithProviders"
import { server } from "../../../../mocks/server"
import { rest } from "msw"
import { baseUrl } from "../../services/config"

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

const setup = () =>
  renderWithProviders(
    <LoginScreen navigation={null as any} route={null as any} />
  )

const getEmailInput = () => screen.getByPlaceholderText(locales.input_email)
const getPasswordInput = () =>
  screen.getByPlaceholderText(locales.input_password)
const getSubmitBtn = () => screen.getByTestId("login_submit_btn")

describe("When Login Screen mounts", () => {
  it("should display app logo", () => {
    setup()

    screen.getByTestId("logo")
  })
  it("should display email and password inputs", () => {
    setup()

    getEmailInput()
    getPasswordInput()
  })
  it("should display form submit button", () => {
    setup()

    getSubmitBtn()
  })
})

describe("When Login form is submited with errors", () => {
  it("should show required messages when submit button is pressed with no values", async () => {
    setup()

    fireEvent.press(getSubmitBtn())

    expect(await screen.findAllByText(locales.required)).toHaveLength(2)
  })
  it("should show wrong email format message when user types in an invalid email", async () => {
    setup()

    fireEvent.changeText(getEmailInput(), "invalidEmail.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    expect(await screen.findByText(locales.invalid_email))
  })
})

describe("When Login form is submited correctly", () => {
  it("should  disable submit mutton", async () => {
    setup()

    expect(getSubmitBtn()).not.toBeDisabled()

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    await waitFor(() => expect(getSubmitBtn()).toBeDisabled())
  })
  it("should show error message when user is unauthoirized (response status 401)", async () => {
    mockServerWithError(401)
    setup()

    fireEvent.changeText(getEmailInput(), "email@email.com")
    fireEvent.changeText(getPasswordInput(), "123456")

    fireEvent.press(getSubmitBtn())

    expect(await screen.findByText("error api"))
  })
})
