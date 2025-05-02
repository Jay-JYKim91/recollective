import { render, screen } from "@testing-library/react"
import LoadingCircle from "./LoadingCircle"

describe("LoadingCircle() renders a spinner element", () => {
  test("should render a spinner with loading-spinner class", () => {
    render(<LoadingCircle />)
    const spinner = screen.getByRole("status", { hidden: true })
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass("loading-spinner")
  })
})
