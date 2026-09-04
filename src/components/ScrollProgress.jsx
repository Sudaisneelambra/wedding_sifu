import { useScrollProgress } from '../hooks/useParallax.js'

/** Thin gold rule across the top that fills as the guest reads. */
export default function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__bar" style={{ transform: `scaleX(${p})` }} />
    </div>
  )
}
