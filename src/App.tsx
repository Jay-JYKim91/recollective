import { useState } from "react"
import { signInWithGoogle } from "./lib/auth"

function App() {
  const [toastMsg, setToastMsg] = useState<string>("")

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle()

    if (result?.error) {
      console.log("google login error", result?.error.message)
      setToastMsg("Something went wrong. Please try again later.")

      setTimeout(() => {
        setToastMsg("")
      }, 3000)
    }
  }

  return (
    <div className="w-full text-center py-40">
      <div className="flex items-center justify-center">
        <img src="/logo.png" className="px-4 w-24" />
        <h1 className="font-heading text-6xl ">Recollective</h1>
      </div>
      <p className="font-accent text-4xl py-8">
        Remember, Reflect, Rediscover.
      </p>
      <button className="btn btn-secondary" onClick={handleGoogleLogin}>
        Log In
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

export default App
