import { useEffect, useState } from 'react'

/** Returns the window scrollY, throttled to animation frames. */
export function useScrollY() {
  const [y, setY] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setY(window.scrollY)
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return y
}

/** Fraction of the page scrolled, 0 → 1. */
export function useScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        frame = 0
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return p
}
