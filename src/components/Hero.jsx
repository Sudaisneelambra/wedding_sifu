import ArtLayer from './ArtLayer.jsx'
import Reveal from './Reveal.jsx'
import Rule from './Rule.jsx'

/** The opening screen. It is replaced by the invitation once opened. */
export default function Hero({ first, second, words, art, pointer, onOpen }) {
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
        </div>
      </div>
    </header>
  )
}
