import { render, screen } from "@testing-library/react"
import StarRating from "./StarRating"

describe("StarRating() renders the correct number of star icon", () => {
  test("should render 5 full stars for rating 5", () => {
    render(<StarRating rating={5} />)
    expect(screen.getAllByTestId("full-star")).toHaveLength(5)
    expect(screen.queryByTestId("half-star")).toBeNull()
    expect(screen.queryByTestId("empty-star")).toBeNull()
  })

  test("should render 4 full stars and 1 half star for rating 4.5", () => {
    render(<StarRating rating={4.5} />)
    expect(screen.getAllByTestId("full-star")).toHaveLength(4)
    expect(screen.getByTestId("half-star")).toBeInTheDocument()
    expect(screen.queryByTestId("empty-star")).toBeNull()
  })

  test("should render 3 full stars and 2 empty stars for rating 3", () => {
    render(<StarRating rating={3} />)
    expect(screen.getAllByTestId("full-star")).toHaveLength(3)
    expect(screen.queryByTestId("half-star")).toBeNull()
    expect(screen.getAllByTestId("empty-star")).toHaveLength(2)
  })

  test("should render 2 full stars, 1 half star and 2 empty stars for rating 2.5", () => {
    render(<StarRating rating={2.5} />)
    expect(screen.getAllByTestId("full-star")).toHaveLength(2)
    expect(screen.getByTestId("half-star")).toBeInTheDocument()
    expect(screen.getAllByTestId("empty-star")).toHaveLength(2)
  })

  test("should render 5 empty stars for rating 0", () => {
    render(<StarRating rating={0} />)
    expect(screen.queryByTestId("full-star")).toBeNull()
    expect(screen.queryByTestId("half-star")).toBeNull()
    expect(screen.getAllByTestId("empty-star")).toHaveLength(5)
  })
})
