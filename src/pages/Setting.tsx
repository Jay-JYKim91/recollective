import { useEffect, useState } from "react"
import { logOut, updateDefaultRecordType } from "../lib/auth"
import { useNavigate } from "react-router-dom"
import Toast from "../components/ui/Toast"
import { useAuth } from "../hooks/useAuth"
import { RECORD_TYPES } from "../constants/record_types"

export default function Setting() {
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const [toastMsg, setToastMsg] = useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedDefaultRecordType, setSelectedDefaultRecordType] = useState(
    user?.default_record_type || "1"
  )

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

  const handleDefaultRecordTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDefaultRecordType(Number(e.target.value))
    updateDefaultRecordType({
      record_type: Number(e.target.value),
      user_id: user?.user_id || "",
    })
    refreshUser()
  }

  return (
    <div className="max-w-3xl mx-auto md:mt-10 md:px-4">
      <h1 className="font-heading font-bold text-center text-xl mb-4">
        Settings
      </h1>
      <div>
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

            <div className="form-control">
              <label>
                <span>Default Record Type</span>
              </label>
              <div className="flex gap-4">
                {RECORD_TYPES.map(({ id, name }) => (
                  <label
                    key={id}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="defaultRecordType"
                      value={id}
                      checked={selectedDefaultRecordType === id}
                      onChange={handleDefaultRecordTypeChange}
                      // className="radio"
                    />
                    <span className="capitalize">{name}</span>
                  </label>
                ))}
              </div>
            </div>

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
