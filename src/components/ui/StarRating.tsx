import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex gap-1 items-center text-yellow-400">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar data-testid="full-star" key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt data-testid="half-star" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaRegStar data-testid="empty-star" key={`empty-${i}`} />
      ))}
    </div>
  )
}
