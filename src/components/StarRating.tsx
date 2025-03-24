import { FaRegStar, FaStar } from "react-icons/fa"

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center text-yellow-400">
      {Array.from({ length: rating }, (_, i) => (
        <FaStar key={i} />
      ))}
      {Array.from({ length: 5 - rating }, (_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  )
}
