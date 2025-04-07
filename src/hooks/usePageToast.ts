import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const usePageToast = (
  setToastVisible: (value: boolean) => void
): string | null => {
  const location = useLocation()
  const message = location?.state?.toastMessage || null
  const shouldShow = location?.state?.showToast

  useEffect(() => {
    if (shouldShow && message) {
      setToastVisible(true)

      const timer = setTimeout(() => setToastVisible(false), 3000)

      return () => clearTimeout(timer)
    }
  }, [shouldShow, message, setToastVisible])

  return message
}
