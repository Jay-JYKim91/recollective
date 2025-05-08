import { ReactNode, useEffect, useState } from "react"
import { AuthContext, User } from "./AuthContext"
import { supabase } from "../lib/supabase"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const init = async () => await refreshUser()

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        const handleRefresh = async () => await refreshUser()

        handleRefresh()
      } else {
        setUser(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const refreshUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const authUser = session?.user
    if (!authUser) {
      setUser(null)
      setIsLoading(false)
      return
    }

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single()

    if (error) {
      console.error("Failed to fetch user profile:", error)
      setUser(null)
    } else {
      setUser({
        user_id: authUser.id,
        name: authUser.user_metadata?.name ?? "Unknown",
        email: authUser.email ?? "",
        avatar_url: authUser.user_metadata?.avatar_url ?? "",
        default_record_type: userData.default_record_type ?? 1,
      })
    }

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
