type ToastProps = {
  toastMessage: string
  toastType?: string
}

export default function Toast({
  toastMessage,
  toastType = "alert-success",
}: ToastProps) {
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${toastType}`}>
        <span>{toastMessage}</span>
      </div>
    </div>
  )
}
