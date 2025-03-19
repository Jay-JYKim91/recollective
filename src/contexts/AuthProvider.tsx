import { ReactNode, useEffect, useState } from "react"
import { AuthContext, User } from "./AuthContext"
import { supabase } from "../lib/supabase"
import { User as SupabaseUser } from "@supabase/supabase-js"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const formatUserInfo = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null

    return {
      user_id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name ?? "Unknown",
      email: supabaseUser.email ?? "",
      avatar_url: supabaseUser.user_metadata?.avatar_url ?? "",
    }
  }

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(formatUserInfo(session?.user ?? null))
      setIsLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(formatUserInfo(session?.user ?? null))
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
