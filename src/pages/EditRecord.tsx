import { useNavigate, useParams } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import RecordForm from "../components/RecordForm"
import { RecordFormInputType } from "../types/types"
import { useAuth } from "../hooks/useAuth"
import LoadingCircle from "../components/ui/LoadingCircle"

export default function EditRecord() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { useRecord, updateRecord } = useRecords()
  const { data: record, isLoading } = useRecord(id || "")
  const { user } = useAuth()

  if (isLoading) return <LoadingCircle />
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

  const handleEdit = ({
    input,
    selectedGenres,
  }: {
    input: RecordFormInputType
    selectedGenres: number[]
  }) => {
    if (!user) return

    let details
    if (input.type === "1") {
      details = {
        pages: input.pages,
      }
    } else if (input.type === "2") {
      details = {
        running_time: input.running_time,
        episode_count: input.episodes,
      }
    } else if (input.type === "3") {
      details = {
        running_time: input.running_time,
      }
    }

    const updatedRecord = {
      user_id: user.user_id,
      title: input.title,
      creator: input.creator,
      rating: input.rating,
      date: new Date(input.date),
      notes: input.notes,
      type_id: Number(input.type),
      details: JSON.stringify(details),
    }

    updateRecord.mutate({
      id,
      updatedRecord,
      genres: selectedGenres,
      callback: () => {
        navigate(`/records/${id}`, {
          state: {
            showToast: true,
            toastMessage: "Record updated!",
          },
          replace: true,
        })
      },
    })
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <div className="card-actions justify-between">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/records", { replace: true })}
            >
              ← Back
            </button>
          </div>

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
    </div>
  )
}
