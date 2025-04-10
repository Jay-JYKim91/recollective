import { JSX } from "react"
import { getRecordTypeName } from "../../utils/common"
import { BiSolidBook, BiSolidCameraMovie } from "react-icons/bi"

type RecordIconProps = {
  typeId: number
}

export default function RecordIcon({ typeId }: RecordIconProps) {
  const typeName = getRecordTypeName(typeId) as "book" | "movie" | "drama"

  const iconMap: Record<"book" | "movie" | "drama", JSX.Element> = {
    book: <BiSolidBook />,
    movie: <BiSolidCameraMovie />,
    drama: <BiSolidCameraMovie />,
  }

  return iconMap[typeName] ?? <BiSolidBook />
}
