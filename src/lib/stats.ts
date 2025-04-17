import { supabase } from "./supabase"

export const fetchGenreStats = async (userId: string) => {
  const { data: records, error: recordsError } = await supabase
    .from("records")
    .select("id")
    .eq("user_id", userId)

  if (recordsError) throw recordsError

  const recordsId = records?.map((record) => record.id)

  const { data: genres, error: genreError } = await supabase
    .from("record_genres")
    .select("genre_id")
    .in("record_id", recordsId)

  if (genreError) throw genreError

  return genres
}
