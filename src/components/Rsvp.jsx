import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import Rule from './Rule.jsx'

const STORAGE_KEY = 'invitation.rsvp'

export default function Rsvp({ rsvp }) {
  const [answer, setAnswer] = useState(null)
  const [sending, setSending] = useState(false)

  // remember the guest's answer on this device
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'yes' || saved === 'no') setAnswer(saved)
    } catch { /* storage unavailable — fine */ }
  }, [])

  async function respond(value) {
    setAnswer(value)
    try { window.localStorage.setItem(STORAGE_KEY, value) } catch { /* ignore */ }

    if (!rsvp.endpoint) return
    setSending(true)
    try {
      await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attending: value === 'yes', at: new Date().toISOString() }),
      })
    } catch {
      // Never block the guest on a network failure — the answer is kept locally.
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setAnswer(null)
    try { window.localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }

  if (!rsvp.enabled) return null

  return (
    <section className="section section--alt" id="rsvp">
      <div className="shell">
        {answer === null ? (
          <>
            <Reveal as="p" className="eyebrow">{rsvp.prompt}</Reveal>
            <Reveal delay={120}>
              <div className="rsvp__row">
                <button
                  className="rsvp__btn rsvp__btn--yes"
                  onClick={() => respond('yes')}
                  disabled={sending}
                >
                  <span className="rsvp__dot rsvp__dot--yes" aria-hidden="true">✓</span>
                  {rsvp.yesLabel}
                </button>
                <button
                  className="rsvp__btn rsvp__btn--no"
                  onClick={() => respond('no')}
                  disabled={sending}
                >
                  <span className="rsvp__dot rsvp__dot--no" aria-hidden="true">✕</span>
                  {rsvp.noLabel}
                </button>
              </div>
            </Reveal>
            <Reveal as="p" className="rsvp__hint" delay={220}>
              ↑ {rsvp.hint}
            </Reveal>
          </>
        ) : (
          <div className="rsvp__result">
            <div className={`rsvp__icon rsvp__icon--${answer}`} aria-hidden="true">
              {answer === 'yes' ? '✓' : '✕'}
            </div>
            <h2 className="section-title">
              {answer === 'yes' ? rsvp.yesTitle : rsvp.noTitle}
            </h2>
            <Rule />
            <p className="section-sub">
              {answer === 'yes' ? rsvp.yesSub : rsvp.noSub}
            </p>
            <button className="rsvp__reset" onClick={reset}>Change my response</button>
          </div>
        )}
      </div>
    </section>
  )
}
