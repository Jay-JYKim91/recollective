import { useMemo } from "react"
import { useGenreStats } from "../../hooks/useStats"
import { GENRES } from "../../constants/genres"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

type RecordGenreRadarChartProps = {
  userId: string
}

export default function RecordGenreRadarChart({
  userId,
}: RecordGenreRadarChartProps) {
  const { data } = useGenreStats(userId)

  const genreCounts = useMemo(() => {
    const countMap: Record<number, number> = {}

    data?.forEach(({ genre_id }) => {
      countMap[genre_id] = (countMap[genre_id] || 0) + 1
    })

    const result = GENRES.map((genre) => ({
      label: genre.name,
      value: countMap[genre.id] || 0,
    }))

    return result.filter((item) => item.value > 0)
  }, [data])

  const chartData = {
    labels: genreCounts.map((genre) => genre.label),
    datasets: [
      {
        label: "Genre Preference",
        data: genreCounts.map((g) => g.value),
        backgroundColor: "rgba(92, 122, 234, 0.3)",
        borderColor: "#5C7AEA",
        borderWidth: 2,
        pointBackgroundColor: "#5C7AEA",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        beginAtZero: true,
      },
    },
  }
  return (
    <div className="flex justify-center md:mx-28">
      <Radar data={chartData} options={options} />
    </div>
  )
}
