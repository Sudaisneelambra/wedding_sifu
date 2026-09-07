import Reveal from './Reveal.jsx'
import SectionTitle from './SectionTitle.jsx'

export default function Venue({ venue, event }) {
  return (
    <section className="section" id="venue">
      <div className="shell">
        <SectionTitle sub="We would be honoured to host you">Venue</SectionTitle>

        <Reveal className="venue" delay={180}>
          <div className="venue__pin" aria-hidden="true">
            <span className="venue__pulse" />⌖
          </div>
          <div className="venue__name">{venue.name}</div>
          <p className="venue__address">{venue.address}</p>
          <p className="venue__address venue__when">
            {event.weekday}, {event.dayNumber} {event.monthLabel} {event.yearLabel}
            <span className="venue__dot">·</span>
            {event.title} {event.timeLabel}
          </p>
          <a className="venue__map" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">➤</span> Open Google Maps
          </a>

          {venue.qr && (
            <div className="venue__qr">
              <span className="venue__qr-frame">
                <img src={venue.qr} alt={`QR code with directions to ${venue.name}`} />
              </span>
              <p className="venue__qr-cap">{venue.qrCaption || 'Scan for directions'}</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
