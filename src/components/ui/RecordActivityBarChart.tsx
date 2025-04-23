import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import { FetchedRecordType } from "../../types/types"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type RecordActivityBarChartProps = {
  records: FetchedRecordType[]
}

export default function RecordActivityBarChart({
  records,
}: RecordActivityBarChartProps) {
  const getLastSixMonthsLabel = () => {
    const months = []
    const today = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`
      months.push(key)
    }
    return months
  }

  const monthlyActivity = () => {
    const months = getLastSixMonthsLabel()
    const result = months.map((month) => ({
      month,
      book: 0,
      movie: 0,
      drama: 0,
    }))

    records.forEach((record) => {
      const date = new Date(record.date)
      const recordMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`

      const target = result.find((r) => r.month === recordMonth)
      if (!target) return

      if (record.type_id === 1) target.book++
      if (record.type_id === 2) target.drama++
      if (record.type_id === 3) target.movie++
    })

    return result
  }

  const data = {
    labels: monthlyActivity().map((r) => r.month),
    datasets: [
      {
        label: "Book",
        data: monthlyActivity().map((r) => r.book),
        backgroundColor: "#5C7AEA",
      },
      {
        label: "Drama",
        data: monthlyActivity().map((r) => r.drama),
        backgroundColor: "#5ABFBF",
      },
      {
        label: "Movie",
        data: monthlyActivity().map((r) => r.movie),
        backgroundColor: "#FFC857",
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="flex justify-center md:mx-28">
      <Bar data={data} options={options} />
    </div>
  )
}
