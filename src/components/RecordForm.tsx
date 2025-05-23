import { useState } from "react"
import { RECORD_TYPES } from "../constants/record_types"
import { getRecordTypeName } from "../utils/common"
import GenreSelector from "./GenreSelector"
import { RecordFormInputType } from "../types/types"
import StarRatingForm from "./ui/StarRatingForm"

type RecordFormProps = {
  initialValues: RecordFormInputType
  initialGenres?: number[]
  onSubmit: (data: {
    input: RecordFormInputType
    selectedGenres: number[]
  }) => void
  submitLabel: string
}

export default function RecordForm({
  initialValues,
  initialGenres,
  onSubmit,
  submitLabel,
}: RecordFormProps) {
  const [input, setInput] = useState<RecordFormInputType>(initialValues)
  const canSubmit = input.type && input.title && input.rating > 0 && input.date
  const [selectedGenres, SetSelectedGenres] = useState<number[]>(
    initialGenres || []
  )

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      type: e.target.value,
      title: "",
      creator: "",
    }))
  }

  //   const handleTitleInput = async (
  //     e:
  //       | React.ChangeEvent<HTMLInputElement>
  //       | React.KeyboardEvent<HTMLInputElement>
  //   ) => {
  //     if ("key" in e) {
  //       if (e.key === "Enter") {
  //         setIsReadySearch(true)
  //         setTimeout(() => setIsReadySearch(false), 1000)
  //       }
  //     } else {
  //       setIsReadySearch(false)
  //       setInput((prev) => ({ ...prev, title: e.target.value }))
  //     }
  //   }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ input, selectedGenres })
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block mb-2 font-semibold">Select Type</label>
        <div className="flex flex-wrap gap-4">
          {RECORD_TYPES.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="recordType"
                value={option.id}
                checked={Number(input.type) === option.id}
                onChange={handleTypeChange}
                className="radio radio-primary"
              />
              <span className="capitalize">{option.name}</span>
            </label>
          ))}
        </div>
      </div>

      {input.type !== "" && (
        <>
          {/* Title Input */}
          {/* <MovieSearchInput
              title={input.title}
              isReadySearch={isReadySearch}
              setIsReadySearch={setIsReadySearch}
              handleTitleInput={handleTitleInput}
            /> */}
          <div className="flex items-center justify-between gap-8">
            <label className="block font-semibold w-60">Title</label>
            <input
              type="text"
              value={input.title}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder={`Enter the title of the ${getRecordTypeName(
                Number(input.type)
              )}`}
              className="input w-full"
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <label className="block font-semibold w-60">
              {input.type === "1" ? "Writer:" : "Director"}
            </label>
            <input
              type="text"
              value={input.creator}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  creator: e.target.value,
                }))
              }
              placeholder={`Enter the ${
                input.type === "1" ? "writer" : "director"
              }'s name`}
              className="input w-full"
            />
          </div>

          <GenreSelector
            selectedGenres={selectedGenres}
            setSelectedGenres={SetSelectedGenres}
            record_type={input.type}
          />

          <StarRatingForm
            rating={input.rating}
            setRating={(value: number) => {
              setInput((prev) => ({ ...prev, rating: value }))
            }}
          />

          <div className="flex items-center justify-between gap-8">
            <label className="block font-semibold w-60">Date</label>
            <input
              type="date"
              value={input.date}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, date: e.target.value }))
              }
              className="input w-full "
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {input.type === "1" && (
            <div className="flex items-center justify-between gap-8">
              <label className="block font-semibold w-60">Pages</label>
              <input
                type="number"
                value={input.pages}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    pages: Number(e.target.value),
                  }))
                }
                className="input w-full"
                placeholder="Enter the total number of pages"
              />
            </div>
          )}

          {(input.type === "2" || input.type === "3") && (
            <div className="flex items-center justify-between gap-8">
              <label className="block font-semibold w-60">
                Running Time (minutes)
              </label>
              <input
                type="number"
                value={input.running_time}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    running_time: Number(e.target.value),
                  }))
                }
                className="input w-full"
                placeholder="Enter duration in minutes"
              />
            </div>
          )}

          {input.type === "2" && (
            <div className="flex items-center justify-between gap-8">
              <label className="block font-semibold w-60">
                Number of Episodes
              </label>
              <input
                type="number"
                value={input.episodes}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    episodes: Number(e.target.value),
                  }))
                }
                className="input w-full"
                placeholder="Enter the total number of episodes"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="block font-semibold">Notes</label>
            <textarea
              value={input.notes}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Add any notes..."
            ></textarea>
          </div>
        </>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!canSubmit}
      >
        {submitLabel}
      </button>
    </form>
  )
}
