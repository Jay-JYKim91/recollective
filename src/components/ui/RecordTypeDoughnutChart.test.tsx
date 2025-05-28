import React from "react"
import RecordTypeDoughnutChart from "./RecordTypeDoughnutChart"
import type { Doughnut } from "react-chartjs-2"
import { render, screen } from "@testing-library/react"

jest.mock("react-chartjs-2", () => ({
  Doughnut: (props: React.ComponentProps<typeof Doughnut>) => (
    <div data-testid="mock-doughnut">
      <span data-testid="chart-data">{JSON.stringify(props.data)}</span>
      <span data-testid="chart-options">{JSON.stringify(props.options)}</span>
    </div>
  ),
}))

const mockRecords = [
  {
    created_at: "2025-03-01",
    creator: "creator",
    date: "2025-05-01",
    details: "",
    id: "id",
    notes: "",
    rating: 3,
    title: "title",
    type_id: 1,
    user_id: "user_id",
  },
  {
    created_at: "2025-03-01",
    creator: "creator",
    date: "2025-05-01",
    details: "",
    id: "id",
    notes: "",
    rating: 3,
    title: "title",
    type_id: 2,
    user_id: "user_id",
  },
  {
    created_at: "2025-03-01",
    creator: "creator",
    date: "2025-05-01",
    details: "",
    id: "id",
    notes: "",
    rating: 3,
    title: "title",
    type_id: 3,
    user_id: "user_id",
  },
]

describe("RecordtypeDoughnutChart() renders doughnut chart with correct data", () => {
  test("should render Doughtnut component", () => {
    render(<RecordTypeDoughnutChart records={mockRecords} />)
    expect(screen.getByTestId("mock-doughnut")).toBeInTheDocument()
  })

  test("should pass correct labels and datasets to Doughtnut", () => {
    render(<RecordTypeDoughnutChart records={mockRecords} />)
    const chartData = JSON.parse(screen.getByTestId("chart-data").textContent!)

    expect(chartData.labels).toEqual(["Book", "Drama", "Movie"])
    expect(chartData.datasets[0].label).toBe(" Record Type Count")
    expect(chartData.datasets[0].data).toEqual([1, 1, 1])
  })
})
