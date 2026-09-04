import { Fragment } from 'react'
import { useCountdown } from '../hooks/useCountdown.js'
import Reveal from './Reveal.jsx'

/** A digit pair that flips whenever its value changes. */
function Flip({ value, label }) {
  return (
    <div className="timer__box">
      <span className="timer__num" key={value}>{value}</span>
      <span className="timer__label">{label}</span>
    </div>
  )
}

export default function Countdown({ dateTime, caption }) {
  const t = useCountdown(dateTime)

  const boxes = [
    { n: t.days, label: 'Days' },
    { n: t.hours, label: 'Hours' },
    { n: t.minutes, label: 'Mins' },
    { n: t.seconds, label: 'Secs' },
  ]

  return (
    <section className="section" id="countdown">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          {t.done ? 'The blessed day is here' : 'Counting down to the big day'}
        </Reveal>

        <Reveal delay={120}>
          <div className="timer" role="timer">
            {boxes.map((b, i) => (
              <Fragment key={b.label}>
                {i > 0 && <span className="timer__sep" aria-hidden="true">:</span>}
                <Flip value={b.n} label={b.label} />
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal as="p" className="timer__caption" delay={220}>
          {caption} <span className="twinkle">✦</span>
        </Reveal>
      </div>
    </section>
  )
}
