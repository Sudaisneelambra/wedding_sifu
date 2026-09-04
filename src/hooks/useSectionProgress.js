import { useEffect, useState } from 'react'

/**
 * How far a section has travelled towards the middle of the screen.
 *
 *   0 → its centre is still a screen-height below the middle
 *   1 → its centre is level with the middle of the viewport
 *
 * Used to drive scroll-linked animation. Returns 1 immediately when the guest
 * prefers reduced motion, so the finished state is simply shown.
 */
export function useSectionProgress(ref, reach = 0.72) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return undefined
    }

    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const offset = r.top + r.height / 2 - vh / 2
        const p = 1 - offset / (vh * reach)
        setProgress(Math.max(0, Math.min(1, p)))
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
  }, [ref, reach])

  return progress
}
