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
      <Outlet />
    </div>
  )
}
