import { render, screen } from "@testing-library/react"
import * as commonUtils from "../../utils/common"
import RecordIcon from "./RecordIcon"

jest.mock("../../utils/common")

describe("RecordIcon() renders correct icon based on typeName", () => {
  test("should render icon for 'book'", () => {
    jest.spyOn(commonUtils, "getRecordTypeName").mockReturnValue("book")
    render(<RecordIcon typeId={1} />)
    const icon = screen.getByTestId("record-icon")
    expect(icon).toBeInTheDocument()
    expect(icon.innerHTML).toContain("svg")
  })

  test("should render icon for 'drama'", () => {
    jest.spyOn(commonUtils, "getRecordTypeName").mockReturnValue("drama")
    render(<RecordIcon typeId={2} />)
    const icon = screen.getByTestId("record-icon")
    expect(icon).toBeInTheDocument()
    expect(icon.innerHTML).toContain("svg")
  })

  test("should render icon for 'movie'", () => {
    jest.spyOn(commonUtils, "getRecordTypeName").mockReturnValue("movie")
    render(<RecordIcon typeId={3} />)
    const icon = screen.getByTestId("record-icon")
    expect(icon).toBeInTheDocument()
    expect(icon.innerHTML).toContain("svg")
  })

  test("should render nothing for unknown typeId", () => {
    jest.spyOn(commonUtils, "getRecordTypeName").mockReturnValue("")
    render(<RecordIcon typeId={99} />)
    const icon = screen.getByTestId("record-icon")
    expect(icon).toBeEmptyDOMElement()
  })
})
