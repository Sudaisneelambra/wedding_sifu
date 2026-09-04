import Reveal from './Reveal.jsx'

/** Section heading with an underline that sweeps out on reveal. */
export default function SectionTitle({ children, sub, delay = 0 }) {
  return (
    <>
      <Reveal as="h2" className="section-title underline" delay={delay}>
        {children}
      </Reveal>
      {sub && (
        <Reveal as="p" className="section-sub" delay={delay + 110}>
          {sub}
        </Reveal>
      )}
    </>
  )
}
