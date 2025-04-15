import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex gap-1 items-center text-yellow-400">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  )
}
