import { createContext } from "react"

export type User = {
  user_id: string
  name: string
  email: string
  avatar_url: string
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
