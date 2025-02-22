import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../hooks/useAuth"

export default function ProtectedLayout() {
  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) {
    return <div className="text-center py-40">Loading...</div>
  }

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
