import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuth = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error("Session exchange failed:", error.message)
          navigate("/")
          return
        }
        navigate("/home")
      } else {
        console.error("No auth code found in URL.")
        navigate("/")
      }
    }

    handleAuth()
  }, [navigate])

  return <p>Redirecting...</p>
}
