import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabase"
import { getAndSaveUser } from "../lib/auth"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import Toast from "../components/ui/Toast"
import LoadingCircle from "../components/ui/LoadingCircle"
import { FcStatistics } from "react-icons/fc"
import { FaRegClock, FaRegStar } from "react-icons/fa"
import { getTimeText } from "../utils/common"
import { IoMdBook } from "react-icons/io"

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

  const totalPages = useMemo((): number => {
    const books = records?.filter((record) => record.type_id === 1)

    if (!books || books.length === 0) return 0

    return books.reduce((sum, book) => {
      const details = JSON.parse(book.details)
      return sum + details?.pages
    }, 0)
  }, [records])

  const avgRating = useMemo(() => {
    const rated = records?.filter((r) => r.rating > 0) || []

    if (rated.length === 0) return 0

    const sum = rated.reduce((sum, r) => sum + r.rating, 0)
    return sum / rated.length
  }, [records])

  const watchTime = useMemo((): number => {
    let totalMinutes: number = 0
    const dramas = records?.filter((record) => record.type_id === 2)
    const movies = records?.filter((record) => record.type_id === 3)

    if (dramas && dramas?.length > 0) {
      totalMinutes += dramas.reduce((sum, drama) => {
        const details = JSON.parse(drama.details)
        const time = details?.running_time * (details?.episode_count ?? 1)
        return sum + (time || 0)
      }, 0)
    }

    if (movies && movies?.length > 0) {
      totalMinutes += movies.reduce((sum, movie) => {
        const details = JSON.parse(movie.details)
        const time = details?.running_time
        return sum + (time || 0)
      }, 0)
    }

    return totalMinutes
  }, [records])

  return (
    <div>
      {isLoading ? (
        <LoadingCircle />
      ) : records && records.length > 0 ? (
        <div className="max-w-3xl mx-auto mt-10 px-4">
          <h1 className="text-center mb-4">Hi, {user?.name}</h1>
          <div className="card shadow-xl bg-base-100 border border-gray-200">
            <div className="card-body">
              {/* <div className="card-actions justify-between mb-4"></div> */}
              <h2 className="card-title text-xl font-body">
                <FcStatistics />
                Statistics Summary
              </h2>
              <ul className="text-lg">
                <li className="flex items-center gap-2">
                  <FaRegClock />
                  <span>Watch Time: {getTimeText(watchTime)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IoMdBook />
                  <span>Pages Read: {totalPages} pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaRegStar />
                  <span>Avg Rating: {avgRating}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
