import { useMemo } from 'react'

/**
 * Slow gold motes rising through the page — the counterpoint to the falling
 * leaves, so the screen has movement in both directions.
 */
export default function Sparkles() {
  const motes = useMemo(() => {
    const phone = typeof window !== 'undefined' && window.innerWidth < 760
    const count = phone ? 8 : 14

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * 100) / count + ((i * 23) % 7),
      size: 2 + ((i * 5) % 4),
      rise: 14 + ((i * 9) % 13),
      delay: -((i * 3.5) % 22),
      drift: (i % 2 ? 1 : -1) * (14 + ((i * 13) % 30)),
      star: i % 4 === 0,
    }))
  }, [])

  return (
    <div className="sparks" aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className={`spark ${m.star ? 'spark--star' : ''}`}
          style={{
            left: `${m.left}%`,
            width: `${m.size * (m.star ? 3 : 1)}px`,
            height: `${m.size * (m.star ? 3 : 1)}px`,
            animationDuration: `${m.rise}s`,
            animationDelay: `${m.delay}s`,
            '--dx': `${m.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
