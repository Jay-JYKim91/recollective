import { createContext } from "react"

export type User = {
  user_id: string
  name: string
  email: string
  avatar_url: string
  default_record_type: number
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
