import { render, screen } from "@testing-library/react"
import RecordGenreRadarChart from "./RecordGenreRadarChart"
import React from "react"
import type { Radar } from "react-chartjs-2"
import * as useStatsHook from "../../hooks/useStats"
import type { UseQueryResult } from "@tanstack/react-query"

jest.mock("../../lib/supabase", () => ({}))

jest.mock("../../constants/genres", () => ({
  GENRES: [
    { id: 1, name: "Comedy" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Fantasy" },
    { id: 4, name: "Horror" },
    { id: 5, name: "Mystery" },
    { id: 6, name: "Romance" },
  ],
}))

jest.mock("react-chartjs-2", () => ({
  Radar: (props: React.ComponentProps<typeof Radar>) => (
    <div data-testid="mock-radar">
      <span data-testid="chart-data">{JSON.stringify(props.data)}</span>
      <span data-testid="chart-options">{JSON.stringify(props.options)}</span>
    </div>
  ),
}))

const mockGenreStats = [
  { genre_id: 1 },
  { genre_id: 2 },
  { genre_id: 2 },
  { genre_id: 3 },
  { genre_id: 4 },
  { genre_id: 5 },
  { genre_id: 5 },
  { genre_id: 6 },
]

const mockUseQueryResult = {
  data: mockGenreStats,
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn(),
  isFetching: false,
  isSuccess: true,
  status: "success",
} as unknown as UseQueryResult<{ genre_id: number }[], Error>

describe("RecordGenreRadarChart() renders radar chart with correct data", () => {
  beforeEach(() => {
    jest
      .spyOn(useStatsHook, "useGenreStats")
      .mockReturnValue(mockUseQueryResult)
  })

  test("should render Radar component", () => {
    render(<RecordGenreRadarChart userId="userId" />)
    expect(screen.getByTestId("mock-radar")).toBeInTheDocument()
  })

  test("should pass correct labels and datasets to Radar", () => {
    render(<RecordGenreRadarChart userId="userId" />)
    const chartData = JSON.parse(screen.getByTestId("chart-data").textContent!)

    expect(chartData.labels).toEqual([
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
    ])
    expect(chartData.datasets[0].label).toBe("Genre Preference")
    expect(chartData.datasets[0].data).toEqual([1, 2, 1, 1, 2, 1])
  })
})
