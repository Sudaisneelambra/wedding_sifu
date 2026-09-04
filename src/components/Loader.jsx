import { useEffect, useState } from 'react'

/**
 * Opening splash.
 *
 * It waits for the web fonts before handing over — otherwise the script and
 * Arabic faces swap in mid-fade and the whole screen visibly jumps. `maxMs`
 * makes sure a slow font never holds a guest hostage.
 */
export default function Loader({ names, minMs = 1700, maxMs = 4500, onDone }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const started = Date.now()

    const finish = () => {
      if (cancelled) return
      const wait = Math.max(0, minMs - (Date.now() - started))
      setTimeout(() => {
        if (cancelled) return
        setDone(true)
        onDone?.()
      }, wait)
    }

    const fallback = setTimeout(finish, maxMs)

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(finish).catch(finish)
    } else {
      finish()
    }

    return () => {
      cancelled = true
      clearTimeout(fallback)
    }
  }, [minMs, maxMs, onDone])

  return (
    <div className={`loader ${done ? 'is-done' : ''}`} aria-hidden={done}>
      <div className="loader__inner">
        <svg className="loader__ring" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle className="loader__ring-track" cx="60" cy="60" r="53" />
          <circle className="loader__ring-draw" cx="60" cy="60" r="53" />
        </svg>

        <span className="loader__mark" aria-hidden="true">✦</span>
        <p className="loader__names">{names}</p>
        <p className="loader__text">Loading your invitation</p>

        <span className="loader__bar" aria-hidden="true">
          <i className="loader__bar-fill" />
        </span>
      </div>
    </div>
  )
}
