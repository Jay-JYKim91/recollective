import { useNavigate } from "react-router-dom"

export default function Records() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="font-heading font-bold text-center text-xl">
        Your Records
      </h1>
      <p className="font-body text-center text-lg">
        You haven't recorded anything yet!
      </p>
      <div className="flex justify-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/records/new")}
        >
          + Add New Record
        </button>
      </div>
    </div>
  )
}
