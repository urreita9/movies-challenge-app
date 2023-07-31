import React, { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import { useMutation } from "react-query"
import { AxiosResponse } from "axios"
import Logo from "../../../../components/Logo/Logo"
import locales from "./locales.json"
import { login } from "../../services/auth"
import { LoginBody } from "../../services/interfaces"
import { storeToken } from "../../utils"

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState("")
  const mutation = useMutation({
    mutationFn: async (body: LoginBody) => await login(body),
  })
  return (
    <>
      <Logo />
      {mutation.isError && errorMessage && <Text>{errorMessage}</Text>}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          mutation.mutate(values, {
            onError: (error: any) => {
              console.log("ERROR", error.data)
              setErrorMessage(error.response.data)
            },
            onSuccess: (res: any) => {
              console.log("holo", res.data.token)
              storeToken(res.data.token)
            },
          })
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(locales.invalid_email)
            .required(locales.required),
          password: Yup.string().required(locales.required),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              placeholder={locales.input_email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && <Text>{errors.email}</Text>}
            <TextInput
              placeholder={locales.input_password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && <Text>{errors.password}</Text>}
            <TouchableOpacity
              onPress={handleSubmit as any}
              disabled={mutation.isLoading}
              testID='login_submit_btn'
              aria-label='button'
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </>
  )
}

const styles = StyleSheet.create({})
