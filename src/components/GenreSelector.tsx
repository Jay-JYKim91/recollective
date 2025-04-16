import React from "react"
import { GENRES } from "../constants/genres"

type GenreSelectorProps = {
  record_type: string
  selectedGenres: number[]
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>
}

export default function GenreSelector({
  record_type,
  selectedGenres,
  setSelectedGenres,
}: GenreSelectorProps) {
  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
  }

  const string_type = record_type === "1" ? "book" : "movie_drama"

  const filtered_genre = GENRES.filter(
    (genre) => genre.type === "common" || genre.type === string_type
  )

  return (
    <div className="flex flex-col gap-2">
      <label className="block font-semibold">Genres</label>
      <div className="flex flex-wrap gap-2">
        {filtered_genre.map((genre) => (
          <button
            type="button"
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`px-2 py-1 rounded-lg border ${
              selectedGenres.includes(genre.id)
                ? "bg-teal-500 text-white border-teal-600"
                : "bg-gray-200 text-gray-700 border-gray-300"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}
