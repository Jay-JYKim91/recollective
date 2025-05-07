import { fireEvent, render, screen } from "@testing-library/react"
import StarRatingForm from "./StarRatingForm"

describe("StarRatingForm() allows selecting and displaying rating via mouse interaction", () => {
  test("should render 3 full stars for rating 3", () => {
    render(<StarRatingForm rating={3} setRating={jest.fn()} />)
    expect(screen.getAllByTestId(/^star-/)).toHaveLength(5)
    expect(screen.getByTestId("star-1")).toHaveAttribute(
      "data-icon",
      "full-star"
    )
    expect(screen.getByTestId("star-4")).toHaveAttribute(
      "data-icon",
      "empty-star"
    )
  })

  test("should render 2.5 full stars for rating 2.5", () => {
    render(<StarRatingForm rating={2.5} setRating={jest.fn()} />)
    expect(screen.getAllByTestId(/^star-/)).toHaveLength(5)
    expect(screen.getByTestId("star-2")).toHaveAttribute(
      "data-icon",
      "full-star"
    )
    expect(screen.getByTestId("star-3")).toHaveAttribute(
      "data-icon",
      "half-star"
    )
    expect(screen.getByTestId("star-4")).toHaveAttribute(
      "data-icon",
      "empty-star"
    )
  })

  test("should call setRating with 4.5 when left half of 5th star is clicked", () => {
    const setRatingMock = jest.fn()
    render(<StarRatingForm rating={0} setRating={setRatingMock} />)
    const fifthStarLeftHalf = screen.getAllByRole("button")[8]
    fireEvent.click(fifthStarLeftHalf)
    expect(setRatingMock).toHaveBeenCalledWith(4.5)
  })

  test("should call setRating with 3 when right half of 3rd star is clicked", () => {
    const setRatingMock = jest.fn()
    render(<StarRatingForm rating={0} setRating={setRatingMock} />)
    const thirdStarRightHalf = screen.getAllByRole("button")[5]
    fireEvent.click(thirdStarRightHalf)
    expect(setRatingMock).toHaveBeenCalledWith(3)
  })

  test("should show preview of 2.5 stars when hovering over left half of 3rd star", () => {
    render(<StarRatingForm rating={0} setRating={jest.fn()} />)
    const thirdStarLeftHalf = screen.getAllByRole("button")[4]
    fireEvent.mouseEnter(thirdStarLeftHalf)
    expect(screen.getByTestId("star-3")).toHaveAttribute(
      "data-icon",
      "half-star"
    )
  })

  test("should reset to actual rating after hover ends", () => {
    render(<StarRatingForm rating={4} setRating={jest.fn()} />)
    const thirdStarLeftHalf = screen.getAllByRole("button")[4]
    fireEvent.mouseEnter(thirdStarLeftHalf)
    fireEvent.mouseLeave(thirdStarLeftHalf)
    expect(screen.getByTestId("star-4")).toHaveAttribute(
      "data-icon",
      "full-star"
    )
  })
})
