import { FetchedRecordType } from "../../types/types"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import LoadingCircle from "./LoadingCircle"

ChartJS.register(ArcElement, Tooltip, Legend)

type RecordTypeDoughnutChartProps = {
  records: FetchedRecordType[]
}

export default function RecordTypeDoughnutChart({
  records,
}: RecordTypeDoughnutChartProps) {
  if (!records) return <LoadingCircle />

  const recordTypeCounts = {
    book: 0,
    drama: 0,
    movie: 0,
  }

  records.forEach((record) => {
    if (record.type_id === 1) recordTypeCounts.book++
    if (record.type_id === 2) recordTypeCounts.drama++
    if (record.type_id === 3) recordTypeCounts.movie++
  })

  const data = {
    labels: ["Book", "Drama", "Movie"],
    datasets: [
      {
        label: " Record Type Count",
        data: [
          recordTypeCounts.book,
          recordTypeCounts.drama,
          recordTypeCounts.movie,
        ],
        backgroundColor: ["#5C7AEA", "#5ABFBF", "#FFC857"],
        borderColor: "#F6F1E9",
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-96">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
