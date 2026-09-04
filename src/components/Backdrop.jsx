import { useScrollY } from '../hooks/useParallax.js'

const Sprig = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" fill="none">
    <path
      className="sprig__stem"
      d="M18 182C56 150 88 112 108 70 118 49 124 32 128 18"
      stroke="#C9A84C" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round"
    />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const t = 0.12 + i * 0.14
      const x = 18 + (128 - 18) * t
      const y = 182 - (182 - 18) * t
      return (
        <g key={i} className="sprig__leaf" style={{ animationDelay: `${0.5 + i * 0.13}s` }}>
          <ellipse cx={x - 13} cy={y - 5} rx="13" ry="6"
            fill="#6B7C5C" fillOpacity="0.17"
            transform={`rotate(${-38 - i * 4} ${x - 13} ${y - 5})`} />
          <ellipse cx={x + 13} cy={y + 5} rx="13" ry="6"
            fill="#C9A84C" fillOpacity="0.19"
            transform={`rotate(${142 - i * 4} ${x + 13} ${y + 5})`} />
        </g>
      )
    })}
  </svg>
)

const Lantern = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 40 130" fill="none">
    <line x1="20" y1="0" x2="20" y2="42" stroke="#8B6A2E" strokeOpacity="0.5" strokeWidth="1" />
    <path d="M13 44h14l-2-6H15z" fill="#C9A84C" fillOpacity="0.5" />
    <path d="M9 50h22l-3 40H12z" fill="#E8C96A" fillOpacity="0.34" stroke="#8B6A2E" strokeOpacity="0.4" strokeWidth="1" />
    <path d="M12 90h16l-3 8H15z" fill="#C9A84C" fillOpacity="0.5" />
    <circle className="lantern__flame" cx="20" cy="70" r="6" fill="#E8C96A" fillOpacity="0.5" />
    <circle cx="20" cy="103" r="3" fill="#C9A84C" fillOpacity="0.5" />
  </svg>
)

const STARS = [
  { x: 16, y: 14, s: 7, d: 0 },
  { x: 34, y: 8, s: 5, d: 1.4 },
  { x: 62, y: 17, s: 6, d: 2.6 },
  { x: 81, y: 9, s: 8, d: 0.7 },
  { x: 91, y: 26, s: 5, d: 3.3 },
  { x: 46, y: 30, s: 4, d: 2.0 },
]

const Stars = () => (
  <div className="backdrop__stars">
    {STARS.map((st) => (
      <span
        key={`${st.x}-${st.y}`}
        className="backdrop__star"
        style={{
          left: `${st.x}%`,
          top: `${st.y}%`,
          fontSize: `${st.s}px`,
          animationDelay: `${st.d}s`,
        }}
      >
        ✦
      </span>
    ))}
  </div>
)

const Arch = () => (
  <svg className="backdrop__arch" viewBox="0 0 400 220" fill="none" preserveAspectRatio="xMidYMax meet">
    <path
      d="M40 220V120a30 30 0 0160 0v100M110 220V95a40 40 0 0180 0v125M200 220V70a45 45 0 0190 0v150M300 220V110a28 28 0 0156 0v110"
      stroke="#8B6A2E" strokeOpacity="0.16" strokeWidth="1.4"
    />
    <circle cx="245" cy="42" r="15" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="1.2" />
    <circle cx="252" cy="38" r="13" fill="#FAF7F1" />
  </svg>
)

/** Fixed ornamental backdrop — gradients, a skyline arch, sprigs and lanterns,
 *  all drifting at different rates as the guest scrolls. */
export default function Backdrop({ pointer = { x: 0, y: 0 } }) {
  const y = useScrollY()
  const px = pointer.x
  const py = pointer.y

  return (
    <div className="backdrop" aria-hidden="true">
      <div
        className="backdrop__wash"
        style={{ transform: `translate3d(${px * -10}px, ${y * -0.04 + py * -8}px, 0)` }}
      />

      <Sprig className="backdrop__corner backdrop__corner--tl"
        style={{ transform: `translate3d(${px * 14}px, ${y * 0.07 + py * 10}px, 0)` }} />
      <Sprig className="backdrop__corner backdrop__corner--br"
        style={{ transform: `rotate(180deg) translate3d(${px * 12}px, ${y * 0.05 + py * 8}px, 0)` }} />

      <Lantern className="backdrop__lantern backdrop__lantern--a"
        style={{ marginTop: `${y * 0.10}px` }} />
      <Lantern className="backdrop__lantern backdrop__lantern--b"
        style={{ marginTop: `${y * 0.16}px` }} />
      <Lantern className="backdrop__lantern backdrop__lantern--c"
        style={{ marginTop: `${y * 0.12}px` }} />
      <Lantern className="backdrop__lantern backdrop__lantern--d"
        style={{ marginTop: `${y * 0.19}px` }} />

      <Stars />

      <div className="backdrop__archwrap" style={{ transform: `translate3d(0, ${y * 0.03}px, 0)` }}>
        <Arch />
      </div>
    </div>
  )
}
