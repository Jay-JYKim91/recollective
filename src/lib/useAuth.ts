import { useEffect, useState } from "react"
import { supabase } from "./supabase"

type User = {
  name: string
  email: string
  avatar_url: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      // data?.user?.user_metadata
      // avatar_url, email, name
      console.log("data in useAuth: ", data?.user?.user_metadata)
      const userData = {
        name: data?.user?.user_metadata?.name,
        email: data?.user?.user_metadata?.email,
        avatar_url: data?.user?.user_metadata?.avatar_url,
      }
      setUser(userData)
    }

    getUser()
  }, [])

  return user
}
