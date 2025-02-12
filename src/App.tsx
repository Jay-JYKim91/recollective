import { useState } from "react"
import "./App.css"
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
    <>
      <img src="./public/logo.png" width={50} />
      <button className="btn" onClick={handleGoogleLogin}>
        Login
      </button>
      {message && <p className="mt-4 text-lg font-bold">{message}</p>}
    </>
  )
}

export default App
