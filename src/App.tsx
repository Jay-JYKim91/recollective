import { useState } from "react"
// import "./App.css"
import { saveUser, signInWithGoogle } from "./lib/auth"
import { supabase } from "./lib/supabase"

function App() {
  const [message, setMessage] = useState<string>("")

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle()
    if (result?.data) {
      console.log("data in app.ts", result?.data)
    }
    if (result?.error) {
      console.log("google login error", result?.error.message)
    }

    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const result = await saveUser(session?.user)

        if (result === "new_user") {
          setMessage("회원가입 ㅊㅋㅊㅋ")
        } else {
          setMessage("웰컴백!")
        }
      }
    })
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
      {message && <p className="mt-4 text-lg font-bold">{message}</p>}
    </div>
  )
}

export default App
