import Reveal from './Reveal.jsx'
import SectionTitle from './SectionTitle.jsx'

export default function EventDetails({ event, venue }) {
  const cards = [
    { icon: '✦', label: 'Occasion', value: event.title },
    { icon: '☾', label: 'Time', value: event.timeLabel },
    { icon: '⌖', label: 'Venue', value: venue.name },
  ]

  return (
    <section className="section section--alt" id="details">
      <div className="shell">
        <SectionTitle sub="The details of the day">{event.title}</SectionTitle>

        <Reveal delay={180}>
          <div className="datepill glow">
            <div className="datepill__side">
              <span className="datepill__lbl">{event.monthLabel}</span>
              <span className="datepill__sub">{event.yearLabel}</span>
            </div>
            <div className="datepill__num">{event.dayNumber}</div>
            <div className="datepill__side datepill__side--right">
              <span className="datepill__lbl">{event.weekday}</span>
              <span className="datepill__time">{event.timeLabel}</span>
            </div>
          </div>
        </Reveal>

        <div className="details">
          {cards.map((d, i) => (
            <Reveal key={d.label} className="detail" delay={140 * i}>
              <div className="detail__icon" aria-hidden="true">{d.icon}</div>
              <div className="detail__label">{d.label}</div>
              <div className="detail__value">{d.value}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
