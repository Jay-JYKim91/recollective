import { supabase } from "./supabase"

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export const logOut = async (): Promise<{ isLogOut: boolean }> => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log("logout error: ", error.message)
    return { isLogOut: false }
  }

  return { isLogOut: true }
}

export const getAndSaveUser = async () => {
  const { data: userData, error } = await supabase.auth.getUser()

  if (error || !userData?.user) {
    console.error("❌ Failed to retrieve user:", error?.message)
    return null
  }

  const { id, email, user_metadata } = userData.user
  const name = user_metadata.full_name
  const avatar_url = user_metadata.avatar_url

  try {
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("유저 조회 오류???????????:", error.message)
    }

    if (existingUser) {
      console.log("🎉 다시 오신 걸 환영합니다!")
      return "welcome_back"
    } else {
      const { error: insertError } = await supabase
        .from("user")
        .insert([{ id, email, name, avatar_url }])

      if (insertError) {
        console.error("유저 저장 오류!!!!!!!!:", insertError.message)
      } else {
        console.log("🎊 회원가입을 축하합니다!")
        return "new_user"
      }
    }
  } catch (err) {
    console.error("🚨 saveUser 실행 중 오류 발생:", err)
    return null
  }
}

export const updateDefaultRecordType = async ({
  record_type,
  user_id,
}: {
  record_type: number
  user_id: string
}) => {
  const { error } = await supabase
    .from("users")
    .update({ default_record_type: record_type })
    .eq("id", user_id)

  if (error) {
    console.error("Failed to update default record type:", error)
  } else {
    console.log("✅ Default record type updated!")
  }
}
