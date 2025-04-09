import { useNavigate } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import { useAuth } from "../hooks/useAuth"
import RecordIcon from "../components/RecordIcon"
import StarRating from "../components/StarRating"
import { useState } from "react"
import { usePageToast } from "../hooks/usePageToast"
import Toast from "../components/Toast"

export default function Records() {
  const navigate = useNavigate()
  const { useUserRecords } = useRecords()
  const { user } = useAuth()
  const { data: records, isLoading } = useUserRecords(user?.user_id || "")
  const [showToast, setShowToast] = useState(false)
  const toastMessage = usePageToast(setShowToast)

  return (
    <div>
      {showToast && <Toast toastMessage={toastMessage} />}
      <h1 className="font-heading font-bold text-center text-xl mb-4">
        Your Records
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : records && records.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/records/new")}
            >
              + Add New Record
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {records?.map((record) => {
              return (
                <li
                  key={record.id}
                  className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/records/${record.id}`)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="mr-2">
                        <RecordIcon typeId={record.type_id} />
                      </span>
                      <span className="font-semibold text-lg">
                        {record.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <StarRating rating={record.rating} />
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <>
          <p className="font-body text-center text-lg">
            You haven't recorded anything yet!
          </p>
          <div className="flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/records/new")}
            >
              + Add New Record
            </button>
          </div>
        </>
      )}
    </div>
  )
}
