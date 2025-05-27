import { render, screen } from "@testing-library/react"
import RecordActivityBarChart from "./RecordActivityBarChart"
import type { Bar } from "react-chartjs-2"

jest.mock("react-chartjs-2", () => ({
  Bar: (props: React.ComponentProps<typeof Bar>) => (
    <div data-testid="mock-bar">
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

describe("RecordActivityBarChart() renders bar chart with correct data", () => {
  test("should render Bar component", () => {
    render(<RecordActivityBarChart records={mockRecords} />)
    expect(screen.getByTestId("mock-bar")).toBeInTheDocument()
  })

  test("should pass correct labels and datasets to Bar", () => {
    render(<RecordActivityBarChart records={mockRecords} />)
    const chartData = JSON.parse(screen.getByTestId("chart-data").textContent!)

    expect(chartData.labels).toHaveLength(6)

    expect(chartData.datasets[0].label).toBe("Book")
    expect(chartData.datasets[1].label).toBe("Drama")
    expect(chartData.datasets[2].label).toBe("Movie")

    // check the data for the latest month
    const lastIndex = chartData.labels.length - 1
    expect(chartData.datasets[0].data[lastIndex]).toBe(1)
    expect(chartData.datasets[1].data[lastIndex]).toBe(1)
    expect(chartData.datasets[2].data[lastIndex]).toBe(1)
  })
})
