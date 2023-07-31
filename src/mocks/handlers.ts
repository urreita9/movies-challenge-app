import { rest } from "msw"
import { login } from "../features/auth/services/api"
import { baseUrl } from "../features/auth/services/config"
import { MOCKED_TOKEN } from "../features/auth/services/constants"

export const handlers = [
  rest.post(`${baseUrl}${login}`, (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ token: MOCKED_TOKEN })
    )
  }),
]
