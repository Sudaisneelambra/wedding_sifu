import ArtLayer from './ArtLayer.jsx'
import Reveal from './Reveal.jsx'
import Rule from './Rule.jsx'

/** The opening screen. It is replaced by the invitation once opened. */
export default function Hero({ first, second, words, art, event, venue, pointer, onOpen }) {
  const { x, y } = pointer

  return (
    <header className="hero" id="top">
      <ArtLayer art={art} pointer={pointer} depth={18} />

      {/* the entrance animation owns the wrapper's transform,
          the tilt owns the card's — so they never fight */}
      <div className="hero__cardwrap">
        <div
          className="hero__card"
          style={{
            transform: `perspective(1000px) rotateX(${-y * 3.2}deg) rotateY(${x * 3.6}deg) translate3d(${x * 6}px, ${y * 5}px, 0)`,
          }}
        >
          <span className="hero__frame" aria-hidden="true" />
          <span className="hero__sheen" aria-hidden="true" />

          <Reveal as="p" className="arabic hero__bismillah" delay={200}>
            {words.bismillah}
          </Reveal>

          <Reveal delay={340}><Rule animated /></Reveal>

          <Reveal delay={460}>
            <h1 className="hero__names">
              <span className="hero__name shimmer">{first.shortName}</span>
              <span className="hero__amp">{words.connector}</span>
              <span className="hero__name shimmer" style={{ animationDelay: '1.1s' }}>
                {second.shortName}
              </span>
            </h1>
          </Reveal>

          <Reveal as="p" className="hero__sub" delay={620}>
            {words.heroSub}
          </Reveal>

          <Reveal delay={780}>
            <button type="button" className="hero__scroll" onClick={onOpen}>
              <span className="hero__scroll-icon" aria-hidden="true">✉</span>
              {words.openCta}
            </button>
          </Reveal>
          {/* The essentials, right on the cover — so a guest who never taps
              through, or whose browser struggles, still has the date, the
              venue and a scannable route to it. */}
          <Reveal className="hero__facts" delay={900}>
            <Rule />

            <div className="hero__facts-row">
              <div className="hero__facts-text">
                <p className="hero__date">
                  {event.weekday}, {event.dayNumber} {event.monthLabel} {event.yearLabel}
                </p>
                <p className="hero__time">{event.title} · {event.timeLabel}</p>
                <p className="hero__venue">{venue.name}</p>
                <p className="hero__addr">{venue.address}</p>
              </div>

              {venue.qr && (
                <a
                  className="hero__qr"
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={venue.qr} alt={`QR code with directions to ${venue.name}`} />
                  <span className="hero__qr-cap">{venue.qrCaption || 'Scan for directions'}</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  )
}
