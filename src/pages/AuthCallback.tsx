import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

export default function AuthCallback() {
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        await refreshUser()
        navigate("/home")
        return
      }

      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          await refreshUser()
          navigate("/home")
          return
        }
      }

      navigate("/")
    }

    handleAuth()
  }, [navigate, refreshUser])

  return <p>Redirecting...</p>
}
