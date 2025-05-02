import { render, screen } from "@testing-library/react"
import Toast from "./Toast"

describe("Toast() renders toast message and type correctly", () => {
  test("should render the toast message", () => {
    render(<Toast toastMessage="Record Saved!" />)
    expect(screen.getByText("Record Saved!")).toBeInTheDocument()
  })

  test("should apply default toast type class when toastType is not provided", () => {
    render(<Toast toastMessage="Record Saved!" />)
    const alert = screen.getByText("Record Saved!").closest(".alert")
    expect(alert).toHaveClass("alert-success")
  })

  test("should apply custom toast type class when toastType is provided", () => {
    render(<Toast toastMessage="Error!" toastType="alert-error" />)
    const alert = screen.getByText("Error!").closest(".alert")
    expect(alert).toHaveClass("alert-error")
  })
})
