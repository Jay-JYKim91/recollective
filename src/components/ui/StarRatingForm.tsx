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
    <div className="flex justify-between">
      <label className="block mb-2 font-semibold">Rating</label>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => {
          let icon
          if (displayRating >= i + 1) {
            icon = <FaStar />
          } else if (displayRating >= i + 0.5) {
            icon = <FaStarHalfAlt />
          } else {
            icon = <FaRegStar />
          }

          return (
            <div key={i} className="relative text-yellow-400 text-xl w-6 h-6">
              <div
                className="absolute left-0 top-0 w-1/2 h-full z-10"
                onMouseEnter={() => handleMouseEnter(i, true)}
                onClick={() => handleClick(i, true)}
                onMouseLeave={() => setHoverRating(null)}
              ></div>
              <div
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
