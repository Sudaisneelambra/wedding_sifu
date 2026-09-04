/** Ornamental divider. `animated` draws the two hairlines outward on reveal. */
export default function Rule({ mark = '✦', animated = false }) {
  return (
    <div className={`rule ${animated ? 'rule--draw' : ''}`} aria-hidden="true">
      <span className="rule__mark">{mark}</span>
    </div>
  )
}
