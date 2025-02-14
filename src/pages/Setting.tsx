import { useState } from "react"
import { logOut } from "../lib/auth"
import { useNavigate } from "react-router-dom"

export default function Setting() {
  const navigate = useNavigate()
  const [toastMsg, setToastMsg] = useState<string>("")

  const handleLogOut = async () => {
    const result = await logOut()

    if (result.isLogOut) {
      navigate("/")
    } else {
      setToastMsg("Logout failed. Please try again later.")

      setTimeout(() => {
        setToastMsg("")
      }, 3000)
    }
  }

  return (
    <div>
      <p>setting page</p>
      <button className="btn btn-secondary" onClick={handleLogOut}>
        Log Out
      </button>
      {toastMsg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-warning">
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  )
}
