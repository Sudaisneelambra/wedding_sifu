import { useEffect, useState } from 'react'

const clamp = (v, m = 1) => Math.max(-m, Math.min(m, v))

/**
 * A normalised -1…1 pointer position used for parallax.
 *
 *  - mouse / trackpad → follows the cursor
 *  - phones and tablets → follows the tilt of the device, and the finger
 *    while dragging (this invitation is opened on a phone far more often
 *    than on a desktop, so the touch paths matter most)
 *
 * Returns { x: 0, y: 0 } when the guest prefers reduced motion.
 */
export function usePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const set = (x, y) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setPos({ x: clamp(x), y: clamp(y) })
        frame = 0
      })
    }

    const fromPoint = (cx, cy) =>
      set((cx / window.innerWidth) * 2 - 1, (cy / window.innerHeight) * 2 - 1)

    const onMouse = (e) => fromPoint(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches && e.touches[0]
      if (t) fromPoint(t.clientX, t.clientY)
    }
    const onTilt = (e) => {
      if (e.gamma == null || e.beta == null) return
      // gamma: left/right tilt, beta: front/back — held at roughly 45°
      set(e.gamma / 28, (e.beta - 45) / 28)
    }

    const fine = window.matchMedia('(pointer: fine)').matches
    if (fine) window.addEventListener('pointermove', onMouse, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('deviceorientation', onTilt)

    return () => {
      window.removeEventListener('pointermove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('deviceorientation', onTilt)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return pos
}
