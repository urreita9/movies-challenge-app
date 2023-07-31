import axios from "axios"
import { login as loginEndpoint } from "./api"
import { LoginBody } from "./interfaces"
import { baseUrl } from "./config"

export const authApi = axios.create({
  baseURL: baseUrl,
})

export const login = async (body: LoginBody): Promise<void> =>
  await authApi.post(loginEndpoint, body)
