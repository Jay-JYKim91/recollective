import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../hooks/useAuth"
import LoadingCircle from "../components/LoadingCircle"

export default function ProtectedLayout() {
  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) return <LoadingCircle />

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <Header />
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}
