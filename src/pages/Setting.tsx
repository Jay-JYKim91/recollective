import { useEffect, useState } from "react"
import { logOut } from "../lib/auth"
import { useNavigate } from "react-router-dom"
import Toast from "../components/ui/Toast"
import { useAuth } from "../hooks/useAuth"

export default function Setting() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [toastMsg, setToastMsg] = useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "cupcake"
    setIsDarkMode(savedTheme === "dark")
  }, [])

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

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "cupcake" : "dark"
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-center text-xl mb-4">
        Settings
      </h1>
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="card shadow-md bg-base-100 mb-8">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            {/* <p>Change Avatar</p> */}
          </div>
        </div>

        <div className="card shadow-md bg-base-100 mb-8">
          <div className="card-body">
            <h2 className="card-title">Preferences</h2>
            {/* <p>Default Record Type</p> */}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="toggle"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span>Enable Dark Mode</span>
            </label>
          </div>
        </div>

        <div className="card shadow-md bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Account Actions</h2>

            <div className="flex flex-col gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleLogOut}
              >
                Log Out
              </button>
              {/* <button className="btn btn-sm btn-warning" onClick={handleLogOut}>
                Delete Account
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {toastMsg && <Toast toastMessage={toastMsg} toastType="alert-warning" />}
    </div>
  )
}
