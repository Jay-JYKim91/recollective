import { useRecords } from "../hooks/useRecords"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import RecordForm from "../components/RecordForm"
import { RecordFormInputType } from "../types/types"

const INITIAL_VALUES = {
  type: "",
  title: "",
  creator: "",
  rating: 0,
  date: "",
  notes: "",
  pages: 0,
  duration: 0,
  running_time: 0,
  episodes: 0,
}

export default function AddRecord() {
  const navigate = useNavigate()
  const { addRecord } = useRecords()
  const { user } = useAuth()

  const handleSave = ({
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

    const newRecord = {
      user_id: user.user_id,
      title: input.title,
      creator: input.creator,
      rating: input.rating,
      date: new Date(input.date),
      notes: input.notes,
      type_id: Number(input.type),
      details: JSON.stringify(details),
    }

    addRecord.mutate({
      newRecord,
      genres: selectedGenres,
      callback: () =>
        navigate("/records", {
          state: {
            showToast: true,
            toastMessage: "New record added!",
          },
          replace: true,
        }),
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
            Add New Record
          </h1>
          <RecordForm
            initialValues={INITIAL_VALUES}
            onSubmit={handleSave}
            submitLabel={"Save Record"}
          />
        </div>
      </div>
    </div>
  )
}
