import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"

type RecordType = {
  user_id: string
  title: string
  creator: string
  rating: number
  date: object
  notes: string
  type_id: number
  details: string
}

export const useRecords = () => {
  const queryClient = useQueryClient()

  const addRecord = useMutation<
    null,
    Error,
    { newRecord: RecordType; genres: number[]; callback: () => void }
  >({
    mutationFn: async ({ newRecord, genres }) => {
      const { data, error: recordError } = await supabase
        .from("records")
        .insert([newRecord])
        .select()
        .single()

      if (recordError) throw recordError

      if (genres.length > 0) {
        const genreEntries = genres.map((genre_id) => ({
          record_id: data.id,
          genre_id: genre_id,
        }))

        const { error: genreError } = await supabase
          .from("record_genres")
          .insert(genreEntries)

        if (genreError) throw genreError
      }

      return data
    },

    onSuccess: (_, variables) => {
      console.log(">>> success!")
      variables.callback()
      queryClient.invalidateQueries({ queryKey: ["records"] })
    },
  })

  return { addRecord }
}
