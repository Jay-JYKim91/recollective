import { useNavigate, useParams } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import { FaBookOpen, FaCalendar, FaClock } from "react-icons/fa"
import { getGenreName, getTimeText } from "../utils/common"
import RecordIcon from "../components/ui/RecordIcon"
import StarRating from "../components/ui/StarRating"
import { useState } from "react"
import { usePageToast } from "../hooks/usePageToast"
import Toast from "../components/ui/Toast"
import LoadingCircle from "../components/ui/LoadingCircle"

export default function RecordDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { useRecord, deleteRecord } = useRecords()
  const { data: record, isLoading } = useRecord(id || "")
  const details = record?.details ? JSON.parse(record?.details) : {}
  const [showToast, setShowToast] = useState(false)
  const toastMessage = usePageToast(setShowToast)

  const handleDelete = () => {
    deleteRecord.mutate({
      id: id,
      callback: () =>
        navigate("/records", {
          state: {
            showToast: true,
            toastMessage: "Record deleted successfully!",
          },
          replace: true,
        }),
    })
  }

  const handleEdit = () => {
    navigate(`/records/${id}/edit`)
  }

  if (isLoading) return <LoadingCircle />

  if (!id || !record)
    return <p>Oops! Something went wrong. Please try again.</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {showToast && <Toast toastMessage={toastMessage} />}
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <div className="card-actions justify-between mb-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/records", { replace: true })}
            >
              ← Back
            </button>
            <div className="display">
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={handleEdit}
              >
                Edit
              </button>
              <label htmlFor="delete_modal" className="btn btn-error btn-sm">
                Delete
              </label>
            </div>
          </div>
          <h2 className="card-title text-3xl font-body">
            <RecordIcon typeId={record.type_id} /> {record.title}
          </h2>
          {record.creator && (
            <div className="text-gray-600 mb-2 text-sm">
              by <span className="font-medium">{record.creator}</span>
            </div>
          )}
          <div className="flex">
            {record.record_genres.map((genre: { genre_id: number }) => {
              return (
                <div
                  key={genre.genre_id}
                  className="px-2 py-1 rounded-lg bg-secondary text-white border-primary mr-2 text-sm"
                >
                  {getGenreName(genre.genre_id)}
                </div>
              )
            })}
          </div>

          <div className="flex gap-2">
            {record.rating && <StarRating rating={record.rating} />}
            <div className="flex items-center gap-2">
              <FaCalendar /> {new Date(record.date).toLocaleDateString()}
            </div>

            {details?.running_time && (
              <div className="flex items-center gap-2">
                <FaClock />
                <span className="font-medium">
                  {getTimeText(details.running_time)}
                </span>
              </div>
            )}

            {details?.pages && (
              <div className="flex items-center gap-2">
                <FaBookOpen />
                <span className="font-medium">{details.pages} pages</span>
              </div>
            )}
          </div>

          {record.notes !== "" && (
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {record.notes}
            </div>
          )}
        </div>
      </div>
      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Are you sure you want to delete this record?
          </h3>
          <p className="py-4">This action cannot be undone.</p>
          <div className="modal-action">
            <label htmlFor="delete_modal" className="btn btn-outline">
              Cancel
            </label>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
