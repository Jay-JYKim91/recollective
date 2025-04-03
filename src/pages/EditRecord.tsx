import { useNavigate, useParams } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import RecordForm from "../components/RecordForm"

export default function EditRecord() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { useRecord } = useRecords()
  const { data: record, isLoading } = useRecord(id || "")

  if (isLoading) return <p>is Loading...</p>
  if (!id || !record)
    return <p>Oops! Something went wrong. Please try again.</p>

  const details = record?.details ? JSON.parse(record?.details) : {}
  const existingInput = {
    type: `${record.type_id}`,
    title: record.title,
    creator: record.creator,
    rating: record.rating,
    date: record.date,
    notes: record.notes,
    pages: details?.pages ?? 0,
    duration: 0,
    running_time: details?.running_time ?? 0,
    episodes: details?.episode_count ?? 0,
  }
  const existingGenres =
    record?.record_genres?.map(
      (genre: { genre_id: number }) => genre.genre_id
    ) || []

  const handleEdit = () => {}

  return (
    <div>
      <div className="px-0 lg:px-52">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/records", { replace: true })}
        >
          ← Back
        </button>
        <h1 className="font-heading font-bold text-center text-xl">
          Edit Record
        </h1>
        <RecordForm
          initialValues={existingInput}
          initialGenres={existingGenres}
          onSubmit={handleEdit}
          submitLabel={"Edit Record"}
        />
      </div>
    </div>
  )
}
