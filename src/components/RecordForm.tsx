import { useState } from "react"
import { RECORD_TYPES } from "../constants/record_types"
import { getRecordTypeName } from "../utils/common"
import GenreSelector from "./GenreSelector"
import { RecordFormInputType } from "../types/types"

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
    >
      <label className="block mb-2 font-semibold">Select Type:</label>
      <div className="flex flex-wrap gap-4 mb-4">
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

      {input.type !== "" && (
        <>
          {/* Title Input */}
          {/* <MovieSearchInput
              title={input.title}
              isReadySearch={isReadySearch}
              setIsReadySearch={setIsReadySearch}
              handleTitleInput={handleTitleInput}
            /> */}
          <label className="block mb-2 font-semibold">Title</label>
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
            className="input input-bordered w-full mb-4"
          />

          <label className="block mb-2 font-semibold">
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
            className="input input-bordered w-full mb-4"
          />

          <GenreSelector
            selectedGenres={selectedGenres}
            setSelectedGenres={SetSelectedGenres}
            record_type={input.type}
          />

          <label className="block mb-2 font-semibold">Rating:</label>
          <input
            type="number"
            value={input.rating}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                rating: Number(e.target.value),
              }))
            }
            min="0"
            max="5"
            className="input input-bordered w-full mb-4"
            placeholder="Rate between 0 to 5"
          />

          <label className="block mb-2 font-semibold">Date:</label>
          <input
            type="date"
            value={input.date}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, date: e.target.value }))
            }
            className="input input-bordered w-full mb-4"
            max={new Date().toISOString().split("T")[0]}
          />

          {input.type === "1" && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Pages:</label>
              <input
                type="number"
                value={input.pages}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    pages: Number(e.target.value),
                  }))
                }
                className="input input-bordered w-full"
                placeholder="Enter the total number of pages"
              />
            </div>
          )}

          {(input.type === "2" || input.type === "3") && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Running Time (minutes):
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
                className="input input-bordered w-full"
                placeholder="Enter duration in minutes"
              />
            </div>
          )}

          {input.type === "2" && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Number of Episodes:
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
                className="input input-bordered w-full"
                placeholder="Enter the total number of episodes"
              />
            </div>
          )}

          <label className="block mb-2 font-semibold">Notes:</label>
          <textarea
            value={input.notes}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Add any notes..."
          ></textarea>
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
