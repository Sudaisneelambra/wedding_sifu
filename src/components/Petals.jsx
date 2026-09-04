import { useMemo } from 'react'

/* fewer on phones — a full set of animated layers costs real frames there */
const PETALS = typeof window !== 'undefined' && window.innerWidth < 760 ? 9 : 16

/** Slow-falling gold & sage petals — purely decorative, GPU-friendly. */
export default function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETALS }, (_, i) => ({
        id: i,
        left: (i * 6.3 + ((i * 37) % 11)) % 100,
        size: 7 + ((i * 13) % 9),
        duration: 16 + ((i * 7) % 14),
        delay: -((i * 5) % 24),
        drift: i % 2 ? 1 : -1,
        gold: i % 3 !== 0,
      })),
    []
  )

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal ${p.gold ? 'petal--gold' : 'petal--sage'}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  )
}
