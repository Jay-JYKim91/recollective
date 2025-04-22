import { GENRES } from "../constants/genres"
import { RECORD_TYPES } from "../constants/record_types"
import { RecordTypeName } from "../types/types"

export const getRecordTypeName = (type_id: number): RecordTypeName | "" => {
  return RECORD_TYPES.find((type) => type.id === type_id)?.name || ""
}

export const getRecordTypeEmoji = (type_id: number): string => {
  return getRecordTypeName(type_id) === "book" ? "📕" : "🎥"
}

export const getGenreName = (genre_id: number): string => {
  return GENRES.find((genre) => genre.id === genre_id)?.name || ""
}

export const getTimeText = (running_time: number): string => {
  let result = ""

  if (running_time < 60) {
    result += `${running_time} minutes`
  } else {
    const hours = Math.floor(running_time / 60)
    const minutes = running_time % 60

    result += hours === 1 ? `${hours} hour` : `${hours} hours`

    if (minutes > 0) {
      result += ` ${minutes} minutes`
    }
  }
  return result
}
