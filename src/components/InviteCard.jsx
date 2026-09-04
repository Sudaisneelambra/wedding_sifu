import ArtLayer from './ArtLayer.jsx'
import Reveal from './Reveal.jsx'
import Rule from './Rule.jsx'

function Person({ person, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="person">
        <div className="person__name">{person.name}</div>
        {person.parents && <div className="person__detail">{person.parents}</div>}
        {person.house && <div className="person__house">{person.house}</div>}
      </div>
    </Reveal>
  )
}

/** The first screen of the invitation — same artwork as the cover behind it. */
export default function InviteCard({ first, second, words, art, pointer = { x: 0, y: 0 } }) {
  return (
    <section className="section section--art" id="invitation">
      <ArtLayer art={art} strong pointer={pointer} depth={14} />

      <div className="shell">
        {/* Reveal owns the entrance transform; the inner card owns the tilt */}
        <Reveal className="invite-wrap">
          <div
            className="invite"
            style={{
              transform: `perspective(1100px) rotateX(${-pointer.y * 1.6}deg) rotateY(${pointer.x * 1.9}deg)`,
            }}
          >
            <span className="invite__corner invite__corner--tl" aria-hidden="true" />
            <span className="invite__corner invite__corner--tr" aria-hidden="true" />
            <span className="invite__corner invite__corner--bl" aria-hidden="true" />
            <span className="invite__corner invite__corner--br" aria-hidden="true" />
            <span className="invite__sheen" aria-hidden="true" />

            <p className="arabic invite__bismillah">{words.bismillah}</p>
            <Rule animated />
            <p className="eyebrow">{words.eyebrow}</p>
            <p className="section-sub invite__label">{words.inviteLabel}</p>

            <div className="invite__people">
              <Person person={first} delay={120} />
              <Reveal className="invite__amp" delay={260}>{words.connector}</Reveal>
              <Person person={second} delay={380} />
            </div>

            <Rule animated />
            <p className="eyebrow">{words.heroSub}</p>
          </div>
        </Reveal>

        <div className="invite__cue" aria-hidden="true">
          <span className="hero__cue-line" />
        </div>
      </div>
    </section>
  )
}
