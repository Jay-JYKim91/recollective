import { useState } from "react"
import { logOut } from "../lib/auth"
import { useNavigate } from "react-router-dom"
import Toast from "../components/ui/Toast"
import { useAuth } from "../hooks/useAuth"

export default function Setting() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [toastMsg, setToastMsg] = useState<string>("")
  const [isDark, setIsDark] = useState(
    (localStorage.getItem("theme") ?? "cupcake") === "dark"
  )

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

  const toggleDarkMode = () => {
    const html = document.documentElement
    const isDark = html.classList.contains("dark")

    if (isDark) {
      html.classList.remove("dark")
      html.setAttribute("data-theme", "cupcake")
      localStorage.setItem("theme", "cupcake")
      setIsDark(false)
    } else {
      html.classList.add("dark")
      html.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
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

        <div className="card shadow-md bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Preferences</h2>
            {/* <p>Default Record Type</p> */}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="toggle"
                checked={isDark}
                onChange={toggleDarkMode}
              />
              <span>Enable Dark Mode</span>
            </label>
          </div>
        </div>
        <button className="btn btn-secondary mt-8" onClick={handleLogOut}>
          Log Out
        </button>
      </div>

      {toastMsg && <Toast toastMessage={toastMsg} toastType="alert-warning" />}
    </div>
  )
}
