import { useQuery } from "@tanstack/react-query"
import { fetchGenreStats } from "../lib/stats"

export const useGenreStats = (userId: string) => {
  return useQuery({
    queryKey: ["genreStats", userId],
    queryFn: () => fetchGenreStats(userId),
    enabled: !!userId,
  })
}
