import { useMemo } from 'react'

/* --- the falling shapes ---------------------------------------------------
 * Three kinds so the fall never looks like one repeated sprite.
 * ------------------------------------------------------------------------ */

const Leaf = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 1.5C6.4 6.2 2.4 12 3.2 17.9c0 0 7.8 3.9 13.6-2.9 3.9-4.6 2-10.6-4.8-13.5z"
      fill="currentColor"
    />
    <path
      d="M11.2 20.5C10.2 14.4 12 7.4 14.9 3.3"
      stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"
    />
  </svg>
)

const Blossom = () => (
  <svg viewBox="0 0 24 24" fill="none">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse
        key={a}
        cx="12" cy="7" rx="3.4" ry="5"
        fill="currentColor"
        transform={`rotate(${a} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="2.1" fill="var(--gold)" fillOpacity="0.75" />
  </svg>
)

const Sprig = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    {[5, 9, 13, 17].map((y, i) => (
      <g key={y}>
        <ellipse cx="8" cy={y} rx="3.6" ry="1.7" fill="currentColor"
          transform={`rotate(${-32 - i * 3} 8 ${y})`} />
        <ellipse cx="16" cy={y + 2} rx="3.6" ry="1.7" fill="currentColor"
          transform={`rotate(${32 + i * 3} 16 ${y + 2})`} />
      </g>
    ))}
  </svg>
)

const KINDS = [
  { Shape: Leaf, cls: 'petal--sage' },
  { Shape: Blossom, cls: 'petal--blossom' },
  { Shape: Leaf, cls: 'petal--olive' },
  { Shape: Sprig, cls: 'petal--sage' },
  { Shape: Blossom, cls: 'petal--cream' },
  { Shape: Leaf, cls: 'petal--gold' },
]

/**
 * Leaves, blossoms and sprigs drifting down the page.
 *
 * Two depth layers — a blurred, slower, smaller set behind and a crisper set
 * in front — so the fall has some space to it. The count drops on phones,
 * where every extra animated layer costs real frames.
 */
export default function Petals({ pointer = { x: 0 } }) {
  const items = useMemo(() => {
    const phone = typeof window !== 'undefined' && window.innerWidth < 760
    const count = phone ? 11 : 20

    return Array.from({ length: count }, (_, i) => {
      const far = i % 3 === 0
      const kind = KINDS[i % KINDS.length]
      return {
        id: i,
        ...kind,
        far,
        left: Math.min(95, (i * 100) / count + ((i * 37) % 9)),
        size: (far ? 10 : 16) + ((i * 13) % (far ? 6 : 11)),
        fall: (far ? 26 : 17) + ((i * 7) % 12),
        delay: -((i * 4.5) % 30),
        dx: (i % 2 ? 1 : -1) * (30 + ((i * 17) % 70)),
        spin: (i % 2 ? 1 : -1) * (360 + ((i * 53) % 360)),
        sway: 8 + ((i * 11) % 16),
        swayTime: 3.5 + ((i * 3) % 4),
      }
    })
  }, [])

  return (
    <div
      className="petals"
      aria-hidden="true"
      style={{ transform: `translate3d(${pointer.x * 18}px, 0, 0)` }}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className={`petal ${p.cls} ${p.far ? 'petal--far' : ''}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.fall}s`,
            animationDelay: `${p.delay}s`,
            '--dx': `${p.dx}px`,
          }}
        >
          <span
            className="petal__sway"
            style={{ '--sway': `${p.sway}px`, animationDuration: `${p.swayTime}s` }}
          >
            <span
              className="petal__spin"
              style={{ '--spin': `${p.spin}deg`, animationDuration: `${p.fall * 0.55}s` }}
            >
              <p.Shape />
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
