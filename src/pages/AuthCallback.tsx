import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

export default function AuthCallback() {
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  useEffect(() => {
    const handleAuth = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")

      if (!code) {
        navigate("/")
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error("Session exchange failed:", error.message)
        navigate("/")
        return
      }

      await refreshUser()

      navigate("/home")
    }

    handleAuth()
  }, [navigate, refreshUser])

  return <p>Redirecting...</p>
}
