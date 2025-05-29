import { useNavigate } from "react-router-dom"
import { useRecords } from "../hooks/useRecords"
import { useAuth } from "../hooks/useAuth"
import RecordIcon from "../components/ui/RecordIcon"
import StarRating from "../components/ui/StarRating"
import { useEffect, useMemo, useState } from "react"
import { usePageToast } from "../hooks/usePageToast"
import Toast from "../components/ui/Toast"
import LoadingCircle from "../components/ui/LoadingCircle"
import { RECORD_TYPES } from "../constants/record_types"
import { capitalize } from "../utils/common"
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa"

export type FilterType = {
  year: string
  record_type: string
  rating: string
}

const INITIAL_FILTER = { year: "", record_type: "", rating: "" }
const PAGE_SIZE = 10

export default function Records() {
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [isAscending, setIsAscending] = useState<boolean>(false)
  const [filters, setFilters] = useState<FilterType>(INITIAL_FILTER)
  const { usePaginatedUserRecords, useRecordYears } = useRecords()
  const { user } = useAuth()
  const { data: { data: records = [], count = 0 } = {}, isLoading } =
    usePaginatedUserRecords(
      user?.user_id || "",
      page,
      PAGE_SIZE,
      isAscending,
      filters
    )
  const { data: allDates = [] } = useRecordYears(user?.user_id || "")
  const [showToast, setShowToast] = useState(false)
  const toastMessage = usePageToast(setShowToast)

  const totalPage = count ? Math.ceil(count / PAGE_SIZE) : 1

  const yearOptions = useMemo(() => {
    const yearSet = new Set<number>()

    allDates.forEach((record) => {
      const year = new Date(record.date).getFullYear()
      yearSet.add(year)
    })

    return Array.from(yearSet).sort((a, b) => b - a)
  }, [allDates])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    setPage(1)
  }, [filters])

  return (
    <div className="max-w-3xl mx-auto md:mt-10 md:px-4">
      {showToast && <Toast toastMessage={toastMessage} />}
      <h1 className="font-heading font-bold text-center text-xl mb-4">
        Your Records
      </h1>

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/records/new")}
            >
              + Add New Record
            </button>
          </div>

          {!records || records.length === 0 ? (
            <>
              <p className="font-body text-center text-lg">
                You haven't recorded anything yet!
              </p>
            </>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6 items-center">
                <select
                  className="w-[47.5%] md:flex-1 select select-bordered"
                  onChange={handleFilterChange}
                  value={filters.year}
                  name="year"
                >
                  <option value="">All Years</option>
                  {yearOptions.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="w-[47.5%] md:flex-1 select select-bordered"
                  onChange={handleFilterChange}
                  value={filters.record_type}
                  name="record_type"
                >
                  <option value="">All Types</option>
                  {RECORD_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {capitalize(type.name)}
                    </option>
                  ))}
                </select>
                <select
                  className="w-[47.5%] md:flex-1 select select-bordered"
                  onChange={handleFilterChange}
                  value={filters.rating}
                  name="rating"
                >
                  <option value="">All Ratings</option>
                  <option value="5">Only ★★★★★</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
                <button
                  type="button"
                  className="w-[47.5%] md:flex-1 btn btn-warning"
                  onClick={() => setFilters(() => INITIAL_FILTER)}
                >
                  Reset
                </button>
                <div className="w-[47.5%] md:hidden"></div>
                <button
                  type="button"
                  className="w-[47.5%] md:flex-1 btn "
                  onClick={() => setIsAscending((prev) => !prev)}
                >
                  Date
                  {isAscending ? (
                    <FaRegArrowAltCircleUp />
                  ) : (
                    <FaRegArrowAltCircleDown />
                  )}
                </button>
              </div>

              {records?.length > 0 ? (
                <>
                  <ul className="divide-y divide-gray-200">
                    {records.map((record) => (
                      <li
                        key={record.id}
                        className="flex justify-between items-center py-2 md:px-4 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                        onClick={() => navigate(`/records/${record.id}`)}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span className="mr-2">
                              <RecordIcon typeId={record.type_id} />
                            </span>
                            <span className="font-semibold text-lg truncate max-w-[200px] sm:max-w-xs">
                              {record.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {record.date}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <StarRating rating={record.rating} />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      className="btn"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </button>
                    <span>
                      {page} / {totalPage}
                    </span>

                    <button
                      className="btn"
                      disabled={!records || records.length < PAGE_SIZE}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No records match your filters.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
