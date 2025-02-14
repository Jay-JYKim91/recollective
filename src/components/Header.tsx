import { useAuth } from "../lib/useAuth"
import { NavLink, useNavigate } from "react-router-dom"

export default function Header() {
  const user = useAuth()
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate("/home")
  }

  console.log(">>> header: ", user)
  return (
    <header className="flex px-8 py-6 justify-between">
      <div className="flex items-center" onClick={handleLogoClick}>
        <img src="../logo.png" className="w-12 mr-2" />
        <span className="text-2xl">Recollective</span>
      </div>
      <div className="flex items-center">
        <NavLink to="/records" className="px-4">
          Records
        </NavLink>
        <NavLink to="/setting">
          <img
            src={user?.avatar_url || "../avatar_default.svg"}
            className="w-12 rounded-full"
          />
        </NavLink>
      </div>
    </header>
  )
}
