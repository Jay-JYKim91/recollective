import { GENRES } from "../constants/genres"
import { RECORD_TYPES } from "../constants/record_types"
import { RecordTypeName } from "../types/types"

export const getRecordTypeName = (type_id: number): RecordTypeName | "" => {
  return RECORD_TYPES.find((type) => type.id === type_id)?.name || ""
}

export const getRecordTypeEmoji = (type_id: number): string => {
  let result = ""

  switch (getRecordTypeName(type_id)) {
    case "book":
      result = "📕"
      break
    case "drama":
      result = "📺"
      break
    case "movie":
      result = "🎥"
      break
    default:
      break
  }

  return result
}

export const getGenreName = (genre_id: number): string => {
  return GENRES.find((genre) => genre.id === genre_id)?.name || ""
}

export const getTimeText = (running_time: number): string => {
  if (running_time === 0) return ""

  let result = ""

  if (running_time < 60) {
    result += `${running_time} ${running_time === 1 ? "minute" : "minutes"}`
  } else {
    const hours = Math.floor(running_time / 60)
    const minutes = running_time % 60

    result += hours === 1 ? `${hours} hour` : `${hours} hours`

    if (minutes > 0) {
      result += ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
    }
  }

  return result
}

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export function getAverageRating<T extends { rating: number }>(
  records: T[] = []
): number {
  const ratedRecords = records.filter((r) => r.rating > 0)
  if (ratedRecords.length === 0) return 0

  const sum = ratedRecords.reduce((total, r) => total + r.rating, 0)
  return sum / ratedRecords.length
}
