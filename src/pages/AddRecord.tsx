import React, { useState } from "react"
import MovieSearchInput from "../components/MovieSearchInput"
import { RECORD_TYPES } from "../constants/record_types"

{
  /* movie, drama */
}
{
  /* user_id, 
        type_id, 
        title, 
        creator, - optional
        rating, 
        date, 
        notes, - optional
        created_at, 
        details (running time, episode_count) - optional */
}

{
  /* book */
}
{
  /* user_id, 
        type_id, 
        title, 
        creator, - optional
        rating, 
        date, 
        notes, - optional
        created_at, 
        details (pages) - optional */
}

type InputType = {
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

export default function AddRecord() {
  const [input, setInput] = useState<InputType>({
    type: "",
    title: "",
    creator: "",
    rating: 0,
    date: "",
    notes: "",
    pages: 0,
    duration: 0,
    running_time: 0,
    episodes: 0,
  })
  const [isReadySearch, setIsReadySearch] = useState(false)
  const canSubmit = input.type && input.title && input.rating > 0 && input.date

  const handleTypeChange = (e) => {
    setInput((prev) => ({
      ...prev,
      type: e.target.value,
      title: "",
      creator: "",
    }))
  }

  const handleTitleInput = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e) {
      if (e.key === "Enter") {
        setIsReadySearch(true)
        setTimeout(() => setIsReadySearch(false), 1000)
      }
    } else {
      setIsReadySearch(false)
      setInput((prev) => ({ ...prev, title: e.target.value }))
    }
  }

  const handleSave = () => {
    // TODO: Supabase save
    console.log("Saved record:")
  }

  const getTypeName = (id: string): string => {
    const type = RECORD_TYPES.find((type) => type.id === Number(id))

    return type ? type.name : "stuff"
  }

  return (
    <div>
      <div className="px-0 lg:px-52">
        <h1 className="font-heading font-bold text-center text-xl">
          Add New Record
        </h1>
        {/* Record Type */}
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
              placeholder={`Enter the title of the ${getTypeName(input.type)}`}
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
          onClick={handleSave}
          className="btn btn-primary w-full"
          disabled={!canSubmit}
        >
          Save Record
        </button>
      </div>
    </div>
  )
}
