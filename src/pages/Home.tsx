import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { getAndSaveUser } from "../lib/auth"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [toastMsg, setToastMsg] = useState<string>("")
  const navigate = useNavigate()

  const { user } = useAuth()

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
      {toastMsg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  )
}
