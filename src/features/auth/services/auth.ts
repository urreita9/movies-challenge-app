import axios, { AxiosResponse } from "axios"
import { login as loginEndpoint } from "./api"
import { LoginBody } from "./interfaces"
import { baseUrl } from "./config"

export const authApi = axios.create({
  baseURL: baseUrl,
})

export const login = async (body: LoginBody): Promise<AxiosResponse> =>
  await authApi.post(loginEndpoint, body)
