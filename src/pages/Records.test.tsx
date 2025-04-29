jest.mock("../lib/supabase")

import { render, screen } from "@testing-library/react"
import Records from "./Records"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "../contexts/AuthProvider"

describe("Records Page", () => {
  test("Add New Record 버튼이 화면에 보여야 한다", () => {
    const queryClient = new QueryClient()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Records />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )

    const addButton = screen.getByRole("button", { name: /add new record/i })
    expect(addButton).toBeInTheDocument()
  })
})
