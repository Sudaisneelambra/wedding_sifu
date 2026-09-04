import { useRef } from 'react'
import { useSectionProgress } from '../hooks/useSectionProgress.js'
import Rings from './Rings.jsx'
import Reveal from './Reveal.jsx'

const clamp01 = (v) => Math.max(0, Math.min(1, v))

/**
 * Scrolling past the invitation brings two images in from either side until
 * they meet and hold in the middle. Everything is driven by how far the
 * section has travelled up the screen, so it tracks the guest's own scrolling
 * rather than playing on a timer.
 *
 * Drop two cut-out photographs into /public and point `art.handLeft` and
 * `art.handRight` at them to use real hands; without them, two interlocking
 * gold bands are shown instead.
 */
export default function HandsJoin({ words, art }) {
  const ref = useRef(null)
  const p = useSectionProgress(ref)

  const photos = Boolean(art?.handLeft && art?.handRight)

  // eased so the two sides slow as they come together
  const ease = 1 - Math.pow(1 - p, 3)
  const apart = (1 - ease) * (photos ? 104 : 78)
  const met = clamp01((p - 0.76) / 0.24)

  const slide = (dir) => ({
    transform: `translate3d(${dir * apart}%, ${photos ? (dir < 0 ? -5 : 6) : 0}%, 0) rotate(${dir * (1 - ease) * 7}deg)`,
  })

  return (
    <section className="section hands" ref={ref} id="union" aria-label="Joining together">
      <div className="shell">
        <div className={`hands__stage ${photos ? 'hands__stage--photo' : 'hands__stage--rings'}`}>
          <span
            className="hands__side hands__side--l"
            style={slide(-1)}
          >
            {photos ? (
              <img className="hands__photo" src={art.handLeft} alt="" />
            ) : (
              <Rings side="l" />
            )}
          </span>

          <span
            className="hands__side hands__side--r"
            style={slide(1)}
          >
            {photos ? (
              <img className="hands__photo" src={art.handRight} alt="" />
            ) : (
              <Rings side="r" />
            )}
          </span>

          {/* the lower arc of the left band, drawn back on top of the right one
              so the two genuinely interlock instead of merely overlapping */}
          {!photos && (
            <span
              className="hands__side hands__side--l hands__overlap"
              style={slide(-1)}
              aria-hidden="true"
            >
              <Rings side="l" />
            </span>
          )}

          {/* the warmth where they meet */}
          <span className="hands__glow" style={{ opacity: met * 0.6 }} aria-hidden="true" />
          <span className="hands__ring" style={{ opacity: met }} aria-hidden="true" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="hands__spark"
              style={{
                opacity: met,
                transform: `rotate(${i * 60}deg) translateY(${-26 - met * 34}px)`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="hands__words" style={{ opacity: clamp01((p - 0.55) / 0.3) }}>
          <p className="arabic hands__arabic">{words.unionArabic}</p>
          <p className="hands__line">{words.unionLine}</p>
        </div>

        <Reveal as="p" className="eyebrow hands__ref" delay={120}>
          {words.unionRef}
        </Reveal>
      </div>
    </section>
  )
}
