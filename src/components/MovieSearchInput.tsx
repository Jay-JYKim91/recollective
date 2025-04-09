import { AiOutlineEnter } from "react-icons/ai"
import { useMovieSearch } from "../hooks/useMovieSearch"
import LoadingCircle from "./LoadingCircle"

export default function MovieSearchInput({
  title,
  isReadySearch,
  setIsReadySearch,
  handleTitleInput,
}: {
  title: string
  isReadySearch: boolean
  setIsReadySearch: React.Dispatch<React.SetStateAction<boolean>>
  handleTitleInput: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>
}) {
  const { data, error, isLoading } = useMovieSearch(isReadySearch, title)

  return (
    <>
      <label className="block mb-2 font-semibold">Title:</label>
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={handleTitleInput}
          onKeyDown={handleTitleInput}
          placeholder="Enter title"
          className="input input-bordered mb-2 mr-4 basis-11/12"
        />
        <button
          className="btn btn-primary basis-1/12"
          onClick={() => {
            setIsReadySearch(true)
            setTimeout(() => setIsReadySearch(false), 1000)
          }}
        >
          <AiOutlineEnter className="w-6 h-6" />
        </button>
      </div>

      {isLoading && <LoadingCircle />}
      {error && <p>Error: {error.message}</p>}
      <p>hi {data?.actors}</p>
    </>
  )
}
