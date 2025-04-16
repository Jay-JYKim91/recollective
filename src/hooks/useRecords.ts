import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import { FetchedRecordType, RecordType } from "../types/types"

export const useRecords = () => {
  const queryClient = useQueryClient()

  const useUserRecords = (
    userId: string
  ): UseQueryResult<FetchedRecordType[]> =>
    useQuery({
      queryKey: ["records", userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("records")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: true })

        if (error) throw error
        return data
      },
      enabled: !!userId,
    })

  const useRecord = (id: string) => {
    return useQuery({
      queryKey: ["record", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("records")
          .select(
            `*, 
            record_genres (
              genre_id
            )
            `
          )
          .eq("id", id)
          .single()

        if (error) throw error
        return data
      },
      enabled: !!id,
    })
  }

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
      variables.callback()
      queryClient.invalidateQueries({ queryKey: ["records"] })
    },
  })

  const updateRecord = useMutation<
    null,
    Error,
    {
      id: string
      updatedRecord: RecordType
      genres: number[]
      callback: () => void
    }
  >({
    mutationFn: async ({ id, updatedRecord, genres }) => {
      const { error: recordError } = await supabase
        .from("records")
        .update(updatedRecord)
        .eq("id", id)

      if (recordError) throw recordError

      const { error: deleteGenreError } = await supabase
        .from("record_genres")
        .delete()
        .eq("record_id", id)

      if (deleteGenreError) throw deleteGenreError

      if (genres.length > 0) {
        const genreEntries = genres.map((genre_id) => ({
          record_id: id,
          genre_id: genre_id,
        }))

        const { error: insertGenreError } = await supabase
          .from("record_genres")
          .insert(genreEntries)

        if (insertGenreError) throw insertGenreError
      }

      return null
    },

    onSuccess: (_, variables) => {
      variables.callback()
      queryClient.invalidateQueries({ queryKey: ["records"] })
      queryClient.invalidateQueries({ queryKey: ["record", variables.id] })
    },
  })

  const deleteRecord = useMutation<
    void,
    Error,
    { id: string | undefined; callback?: () => void }
  >({
    mutationFn: async ({ id }) => {
      if (!id) return

      const { error } = await supabase.from("records").delete().eq("id", id)

      if (error) throw error
    },
    onSuccess: (_, { callback }) => {
      queryClient.invalidateQueries({ queryKey: ["records"] })
      if (callback) callback()
    },
  })

  return { addRecord, useUserRecords, useRecord, deleteRecord, updateRecord }
}
