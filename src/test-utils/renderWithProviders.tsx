import { render } from "@testing-library/react-native"
import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient()

export const renderWithProviders = (ui: React.ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
