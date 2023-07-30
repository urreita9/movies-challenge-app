import axios from "axios"
import { LoginBody } from "./interfaces"

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL || "http://localhost:8080",
})

export const login = async (body: LoginBody): Promise<void> =>
  await authApi.post("/login", body)
