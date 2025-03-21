import { useNavigate } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import { useAuth } from "../hooks/useAuth"
import { RECORD_TYPES } from "../constants/record_types"

export default function Records() {
  const navigate = useNavigate()
  const { useUserRecords } = useRecords()
  const { user } = useAuth()
  const { data: records, isLoading } = useUserRecords(user?.user_id || "")

  return (
    <div>
      <h1 className="font-heading font-bold text-center text-xl">
        Your Records
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : records && records.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {records?.map((record) => {
            const type =
              RECORD_TYPES.find((type) => type.id === record.type_id)?.name ||
              ""
            const typeEmoji = type === "book" ? "📕" : "🎥"
            return (
              <li
                key={record.id}
                className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="mr-2">{typeEmoji}</span>
                    <span className="font-semibold text-lg">
                      {record.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                <div className="text-sm text-gray-700">{record.rating} ⭐</div>
              </li>
            )
          })}
        </ul>
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
