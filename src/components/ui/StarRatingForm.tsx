import { useState } from "react"
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

type StarRatingFormProps = {
  rating: number
  setRating: (value: number) => void
}
export default function StarRatingForm({
  rating,
  setRating,
}: StarRatingFormProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handleMouseEnter = (index: number, isHalf: boolean) => {
    setHoverRating(index + (isHalf ? 0.5 : 1))
  }

  const handleClick = (index: number, isHalf: boolean) => {
    setRating(index + (isHalf ? 0.5 : 1))
  }

  const displayRating = hoverRating ?? rating

  return (
    <div className="flex gap-8">
      <label className="block font-semibold w-60">Rating</label>
      <div className="flex gap-1 w-full">
        {Array.from({ length: 5 }, (_, i) => {
          let icon
          if (displayRating >= i + 1) {
            icon = (
              <FaStar data-testid={`star-${i + 1}`} data-icon="full-star" />
            )
          } else if (displayRating >= i + 0.5) {
            icon = (
              <FaStarHalfAlt
                data-testid={`star-${i + 1}`}
                data-icon="half-star"
              />
            )
          } else {
            icon = (
              <FaRegStar data-testid={`star-${i + 1}`} data-icon="empty-star" />
            )
          }

          return (
            <div key={i} className="relative text-yellow-400 text-xl w-6 h-6">
              <div
                role="button"
                aria-label={`Set rating to ${i + 0.5}`}
                className="absolute left-0 top-0 w-1/2 h-full z-10"
                onMouseEnter={() => handleMouseEnter(i, true)}
                onClick={() => handleClick(i, true)}
                onMouseLeave={() => setHoverRating(null)}
              ></div>
              <div
                role="button"
                aria-label={`Set rating to ${i + 1}`}
                className="absolute right-0 top-0 w-1/2 h-full z-10"
                onMouseEnter={() => handleMouseEnter(i, false)}
                onClick={() => handleClick(i, false)}
                onMouseLeave={() => setHoverRating(null)}
              ></div>
              {icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}
