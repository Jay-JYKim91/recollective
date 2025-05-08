import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Session exchange failed:", error.message)
        }
        navigate("/home")
      })
    } else {
      console.error("No auth code found in URL.")
      navigate("/")
    }
  }, [navigate])

  return <p>Redirecting...</p>
}
