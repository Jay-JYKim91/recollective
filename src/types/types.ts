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
