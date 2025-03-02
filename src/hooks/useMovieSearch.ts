import { useQuery } from "@tanstack/react-query"

async function fetchMovies(keyword: string) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&t=${keyword}`
  )

  if (!response.ok) {
    throw new Error("fail to fetch movie")
  }

  const data = await response.json()

  const filteredData = {
    actors: data["Actors"],
    director: data["Director"],
    genre: data["Genre"],
    plot: data["Plot"],
    poster: data["Poster"],
    production: data["Production"],
    released: data["Released"],
    response: data["Response"],
    runtime: data["Runtime"],
    title: data["Title"],
    type: data["Type"],
    writer: data["Writer"],
    year: data["Year"],
    imdbID: data["imdbID"],
  }

  console.log(">>> filteredData", filteredData)

  return filteredData
}
export const useMovieSearch = (isReadySearch: boolean, keyword: string) => {
  return useQuery({
    queryKey: ["movies", keyword],
    queryFn: () => fetchMovies(keyword),
    enabled: isReadySearch && keyword.length > 0,
  })
}
