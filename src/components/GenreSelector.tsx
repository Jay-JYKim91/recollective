import React from "react"
import { GENRES } from "../constants/genres"

type PropType = {
  record_type: string
  selectedGenres: number[]
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>
}

export default function GenreSelector({
  record_type,
  selectedGenres,
  setSelectedGenres,
}: PropType) {
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
    <div>
      <label className="block mb-2 font-semibold">Genres</label>
      <div className="flex flex-wrap gap-2">
        {filtered_genre.map((genre) => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`px-4 py-2 rounded-lg border ${
              selectedGenres.includes(genre.id)
                ? "bg-blue-500 text-white border-blue-500" // ✅ 선택된 스타일
                : "bg-gray-200 text-gray-700 border-gray-300" // ❌ 기본 스타일
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}
