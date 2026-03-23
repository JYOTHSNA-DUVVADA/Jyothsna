import { useRef, useCallback } from 'react'

export function useTilt(intensity = 10) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform =
      `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(8px)`
  }, [intensity])

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
