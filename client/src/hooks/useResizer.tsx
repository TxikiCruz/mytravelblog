import { useState, useEffect } from 'react'

const useResizer = () => {
  const [isMobile, setIsMobile] = useState(false)
  const breakpoint = 992

  const handleSizeChange = () => {
    const size = window.innerWidth < breakpoint
    return setIsMobile(size)
  }

  useEffect(() => {
    handleSizeChange()
    window.addEventListener("resize", handleSizeChange)
    return () => window.removeEventListener("resize", handleSizeChange)
  }, [isMobile])

  return isMobile
}

export { useResizer }