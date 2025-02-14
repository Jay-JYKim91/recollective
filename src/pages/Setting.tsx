import { useState } from "react"
import { logOut } from "../lib/auth"
import { useNavigate } from "react-router-dom"

export default function Setting() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string>("")

  const handleLogOut = async () => {
    const result = await logOut()

    if (result.isLogOut) {
      navigate("/")
    } else {
      setErrorMsg("Logout failed. Please try again later.")

      setTimeout(() => {
        setErrorMsg("")
      }, 3000)
    }
  }

  return (
    <div>
      <p>setting page</p>
      <button className="btn btn-secondary" onClick={handleLogOut}>
        Log Out
      </button>
      {errorMsg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-warning">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  )
}
