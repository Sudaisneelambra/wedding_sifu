import Reveal from './Reveal.jsx'
import Rule from './Rule.jsx'

export default function Closing({ words }) {
  return (
    <>
      <section className="section" id="closing">
        <div className="shell">
          <Reveal as="p" className="arabic closing__dua" delay={60}>
            {words.duaArabic}
          </Reveal>
          <Reveal as="p" className="closing__translit" delay={160}>
            {words.duaTranslit}
          </Reveal>

          <Reveal delay={240}><Rule animated /></Reveal>

          <Reveal as="p" className="closing__msg" delay={320}>
            {words.closing}
          </Reveal>
          <Reveal as="div" className="closing__sign shimmer" delay={440}>
            {words.signature}
          </Reveal>
        </div>
      </section>
      <footer className="footer">
        With love and gratitude · {new Date().getFullYear()}
      </footer>
    </>
  )
}
