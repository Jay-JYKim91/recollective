import { supabase } from './supabase'

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    return { data, error }
}

export const saveUser = async (user: any) => {
    if (!user) return;

    const { id, email, user_metadata } = user;
    const name = user_metadata.full_name;
    const avatar_url = user_metadata.avatar_url;

    const { data: existingUser, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("유저 조회 오류???????????:", error.message);
    }

    if (existingUser) {
        console.log("🎉 다시 오신 걸 환영합니다!");
        return "welcome_back";
    } else {
        const { error: insertError } = await supabase.from("user").insert([
            { id, email, name, avatar_url },
        ]);

        if (insertError) {
            console.error("유저 저장 오류!!!!!!!!:", insertError.message);
        } else {
            console.log("🎊 회원가입을 축하합니다!");
            return "new_user";
        }
    }
}