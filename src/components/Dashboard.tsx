import React from "react"
import { useAuth } from "../lib/useAuth"

export default function Dashboard() {
  const user = useAuth()

  return (
    <div>
      <h1>dashboard</h1>
      <h3>{user?.name}</h3>
      <img src={user?.avatar_url} width={50} />
    </div>
  )
}
