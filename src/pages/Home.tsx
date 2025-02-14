import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { getAndSaveUser } from "../lib/auth"

export default function Dashboard() {
  const [toastMsg, setToastMsg] = useState<string>("")

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
      <h1>home page</h1>
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
