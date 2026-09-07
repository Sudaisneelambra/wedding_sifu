import { useEffect, useRef, useState } from 'react'

/**
 * The "opening the invitation" moment.
 *
 *  1. two cream panels sweep in and meet in the middle
 *  2. a gold wax seal presses into place
 *  3. `onReveal` fires while the screen is fully covered — that is when the
 *     rest of the invitation mounts and the page moves into position
 *  4. the seal splits and the panels swing open onto the invitation
 */
export default function OpenTransition({ active, onReveal, onDone }) {
  const [phase, setPhase] = useState('closing')
  const startedAt = useRef(0)

  useEffect(() => {
    if (!active) return undefined

    startedAt.current = performance.now()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal()
      onDone()
      return undefined
    }

    setPhase('closing')

    // screen is fully covered — mount the page behind the curtain
    const t1 = setTimeout(() => {
      onReveal()
      setPhase('opening')
    }, 900)

    // curtain is gone
    const t2 = setTimeout(onDone, 2300)

    /* Browsers throttle — and in-app browsers such as WhatsApp's or
     * Instagram's often suspend — timers in a backgrounded tab. Without this,
     * a guest who taps Open and switches away can come back to a page still
     * sitting behind the closed curtain. On return we catch the sequence up to
     * where it should be. Both callbacks are idempotent. */
    const catchUp = () => {
      if (document.visibilityState !== 'visible') return
      const elapsed = performance.now() - startedAt.current
      if (elapsed >= 900) {
        onReveal()
        setPhase('opening')
      }
      if (elapsed >= 2300) onDone()
    }
    document.addEventListener('visibilitychange', catchUp)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.removeEventListener('visibilitychange', catchUp)
    }
  }, [active, onReveal, onDone])

  if (!active) return null

  return (
    <div className={`opening opening--${phase}`} aria-hidden="true">
      <span className="opening__panel opening__panel--l" />
      <span className="opening__panel opening__panel--r" />

      <span className="opening__seal">
        <span className="opening__seal-disc">
          <span className="opening__seal-half opening__seal-half--l" />
          <span className="opening__seal-half opening__seal-half--r" />
          <span className="opening__seal-mark">✦</span>
        </span>
        <span className="opening__seal-ring" />
      </span>

      <span className="opening__flash" />
    </div>
  )
}
