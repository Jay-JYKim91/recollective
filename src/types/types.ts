import { RECORD_TYPES } from "../constants/record_types"

export type RecordType = {
  user_id: string
  title: string
  creator: string
  rating: number
  date: object
  notes: string
  type_id: number
  details: string
}

export type RecordFormInputType = {
  type: string
  title: string
  creator: string
  rating: number
  date: string
  notes: string
  pages?: number
  duration?: number
  running_time?: number
  episodes?: number
}

export type FetchedRecordType = {
  created_at: string
  creator: string
  date: string
  details: string
  id: string
  notes: string
  rating: number
  title: string
  type_id: number
  user_id: string
}

export type RecordTypeName = (typeof RECORD_TYPES)[number]["name"]
