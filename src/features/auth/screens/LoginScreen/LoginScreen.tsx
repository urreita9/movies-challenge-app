import React, { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import Logo from "../../../../components/Logo/Logo"
import locales from "./locales.json"
import { useLoginMutation } from "./useLoginMutation"
import { storeToken } from "../../utils"
import { RootStackParamList } from "../../../AppNavigator/types"

type Props = NativeStackScreenProps<RootStackParamList, "Login">

const LoginScreen = ({ navigation }: Props) => {
  const [errorMessage, setErrorMessage] = useState("")
  const mutation = useLoginMutation()
  return (
    <>
      <Logo />
      {mutation.isError && errorMessage && <Text>{errorMessage}</Text>}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          mutation.mutate(values, {
            onSuccess: async (res) => {
              await storeToken(res.data.token)
              navigation.navigate("Home")
            },
            onError: (error: any) => {
              setErrorMessage(error.response.data)
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

export default LoginScreen
