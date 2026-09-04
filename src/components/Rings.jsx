/**
 * A gold wedding band, in the style of the reference photograph: yellow gold
 * with a white-gold wave running around it, and a small brilliant on one.
 *
 * Metal reads as metal because the light travels around it — bright, dark,
 * bright, dark — so the band is a conic gradient masked into a ring rather
 * than a flat stroke. Rotating that layer sends the highlight travelling the
 * way it does on a ring turned in the light.
 *
 * Layers, back to front:
 *   metal — the yellow gold body
 *   inlay — the white-gold wave, clipped to the band
 *   inner — the inside wall: shadow at the top, bounced light at the bottom,
 *           which is what gives the band thickness
 *   glint — the hot specular spots
 *   stone — a small brilliant, on the bride's band only
 */
export default function Rings({ side = 'l' }) {
  return (
    <span className={`band band--${side}`}>
      <span className="band__tilt">
        <span className="band__metal" />

        <span className="band__inlay">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={`inlay-${side}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8E8B85" />
                <stop offset="22%" stopColor="#FFFFFF" />
                <stop offset="46%" stopColor="#CFCBC3" />
                <stop offset="68%" stopColor="#F7F5F1" />
                <stop offset="100%" stopColor="#7E7B75" />
              </linearGradient>
            </defs>
            {/* a ribbon sweeping across the face — clipped to the band by CSS,
                so it reads as an inlay running around the ring */}
            <path
              d="M-6 74 C 18 75, 32 50, 52 43 S 88 30, 106 19
                 L 106 32 C 88 43, 70 47, 52 55 S 18 88, -6 88 Z"
              fill={`url(#inlay-${side})`}
            />
          </svg>
        </span>

        <span className="band__inner" />
        <span className="band__glint" />

        {side === 'r' && (
          <span className="band__stone" aria-hidden="true">
            <span className="band__stone-fire" />
          </span>
        )}
      </span>
    </span>
  )
}
