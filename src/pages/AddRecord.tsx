import React, { useState } from "react"

type InputType = {
  type: string
  title: string
  creator: string
  rating: number
  date: string
  notes: string
  pages: number
  duration: number
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
  })
  const [titleSuggestions, setTitleSuggestions] = useState([])

  const handleTypeChange = (e) => {
    setInput((prev) => ({
      ...prev,
      type: e.target.value,
      title: "",
      creator: "",
    }))

    setTitleSuggestions([])
  }

  const handleTitleInput = async (e) => {
    setInput((prev) => ({ ...prev, title: e.target.value }))
    // TODO: API call -> suggestion update
  }

  const handleSuggestionClick = (suggestion) => {
    setInput((prev) => ({
      ...prev,
      title: suggestion.title,
      creator: suggestion.creator,
    }))

    setTitleSuggestions([])
  }

  const handleSave = () => {
    // TODO: Supabase save
    console.log("Saved record:")
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
          {["book", "movie", "drama"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="recordType"
                value={option}
                checked={input.type === option}
                onChange={handleTypeChange}
                className="radio radio-primary"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>

        {/* Title Input */}
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          value={input.title}
          onChange={handleTitleInput}
          placeholder="Enter title"
          className="input input-bordered w-full mb-2"
        />

        {/* Title Suggestions */}
        {/* {titleSuggestions.length > 0 && (
          <ul className="border border-neutral rounded-lg mb-4">
            {titleSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer px-4 py-2 hover:bg-neutral"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )} */}

        <label className="block mb-2 font-semibold">Creator:</label>
        <input
          type="text"
          value={input.creator}
          readOnly
          placeholder="Auto-filled creator"
          className="input input-bordered w-full mb-4"
        />

        <label className="block mb-2 font-semibold">Rating:</label>
        <input
          type="number"
          value={input.rating}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, rating: Number(e.target.value) }))
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
        />

        <label className="block mb-2 font-semibold">Notes:</label>
        <textarea
          value={input.notes}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Add any notes..."
        ></textarea>

        {input.type === "book" && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Pages:</label>
            <input
              type="number"
              value={input.pages}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, pages: Number(e.target.value) }))
              }
              className="input input-bordered w-full"
              placeholder="Enter number of pages"
            />
          </div>
        )}

        {(input.type === "movie" || input.type === "drama") && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Duration (minutes):
            </label>
            <input
              type="number"
              value={input.duration}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  duration: Number(e.target.value),
                }))
              }
              className="input input-bordered w-full"
              placeholder="Enter duration in minutes"
            />
          </div>
        )}

        <button onClick={handleSave} className="btn btn-primary w-full">
          Save Record
        </button>
      </div>
    </div>
  )
}
