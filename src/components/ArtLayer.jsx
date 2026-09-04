/**
 * The illustrated artwork, used behind both the opening screen and the first
 * screen of the invitation so the two read as one piece.
 *
 * The drift animation owns the <img> transform, so the pointer parallax is
 * applied to a wrapper — otherwise the two would fight over the same property.
 */
export default function ArtLayer({ art, strong = false, pointer = { x: 0, y: 0 }, depth = 16 }) {
  if (!art?.hero) return null

  return (
    <div
      className={`art ${strong ? 'art--strong' : ''}`}
      aria-hidden="true"
      style={{
        '--focus-wide': art.focusWide || '50% 50%',
        '--focus-narrow': art.focusNarrow || art.focusWide || '50% 50%',
      }}
    >
      <div
        className="art__shift"
        style={{
          transform: `translate3d(${-pointer.x * depth}px, ${-pointer.y * depth * 0.7}px, 0)`,
        }}
      >
        <picture>
          {art.heroWebp && <source srcSet={art.heroWebp} type="image/webp" />}
          <img className="art__img" src={art.hero} alt="" />
        </picture>
      </div>
      <span className="art__veil" />
    </div>
  )
}
