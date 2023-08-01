import { useMutation } from "react-query"
import { login } from "../../services/auth"
import { storeToken } from "../../utils"
import { LoginBody } from "../../services/interfaces"

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (body: LoginBody) => await login(body),
  })
