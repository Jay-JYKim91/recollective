import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { getAndSaveUser } from "../lib/auth"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import RecordIcon from "../components/RecordIcon"
import StarRating from "../components/StarRating"
import Toast from "../components/Toast"
import LoadingCircle from "../components/LoadingCircle"

export default function Home() {
  const [toastMsg, setToastMsg] = useState<string>("")
  const navigate = useNavigate()
  const { useUserRecords } = useRecords()
  const { user } = useAuth()
  const { data: records, isLoading } = useUserRecords(user?.user_id || "")

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          console.log("✅ User signed in:", session.user)
          const result = await getAndSaveUser()

          if (result === "new_user") {
            setToastMsg("🎊 Congratulations on signing up!")
          } else if (result === "welcome_back") {
            setToastMsg("🎉 Welcome back!")
          }

          setTimeout(() => {
            setToastMsg("")
          }, 3000)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div>
      <h1 className="text-center">Hi, {user?.name}</h1>
      {isLoading ? (
        <LoadingCircle />
      ) : records && records.length > 0 ? (
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

      {toastMsg && <Toast toastMessage={toastMsg} />}
    </div>
  )
}
