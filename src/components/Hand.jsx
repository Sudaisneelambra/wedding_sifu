/**
 * A stylised hand reaching to the right, in the same warm line-art register as
 * the rest of the invitation. `adorned` adds bangles, henna and a ring.
 */
export default function Hand({ adorned = false }) {
  return (
    <svg className="hand__svg" viewBox="0 14 190 112" fill="none">
      <g
        stroke="rgba(92, 64, 51, 0.42)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        {/* sleeve */}
        <rect x="-14" y="50" width="58" height="58" rx="16" fill="#F3E7D4" />

        {/* palm */}
        <rect x="44" y="42" width="82" height="70" rx="31" fill="#F9F0E2" />

        {/* thumb */}
        <rect
          x="0" y="0" width="50" height="21" rx="10.5"
          fill="#F9F0E2"
          transform="translate(72 44) rotate(-44)"
        />

        {/* fingers, longest in the middle */}
        <rect x="110" y="44" width="66" height="20" rx="10" fill="#F9F0E2" />
        <rect x="110" y="64" width="76" height="20" rx="10" fill="#F9F0E2" />
        <rect x="110" y="84" width="69" height="20" rx="10" fill="#F9F0E2" />
        <rect x="110" y="104" width="56" height="18" rx="9" fill="#F9F0E2" />
      </g>

      {adorned ? (
        <g>
          {/* bangles */}
          <rect x="30" y="48" width="6" height="62" rx="3" fill="#C9A84C" fillOpacity="0.75" />
          <rect x="39" y="48" width="4" height="62" rx="2" fill="#E8C96A" fillOpacity="0.8" />
          <rect x="46" y="50" width="5" height="58" rx="2.5" fill="#C9A84C" fillOpacity="0.6" />

          {/* henna */}
          <circle cx="84" cy="77" r="7" fill="none" stroke="#A86040" strokeOpacity="0.4" strokeWidth="1.3" />
          <circle cx="84" cy="77" r="2.4" fill="#A86040" fillOpacity="0.35" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="84" cy="63" rx="2.6" ry="4"
              fill="#A86040" fillOpacity="0.28"
              transform={`rotate(${a} 84 77)`}
            />
          ))}
          <path
            d="M99 92c6 4 13 5 20 3"
            stroke="#A86040" strokeOpacity="0.3" strokeWidth="1.3"
            strokeLinecap="round" fill="none"
          />
        </g>
      ) : (
        <g>
          {/* cuff */}
          <rect x="34" y="50" width="7" height="58" rx="3" fill="#C9A84C" fillOpacity="0.5" />
          {/* ring */}
          <rect x="146" y="84" width="8" height="20" rx="3" fill="#C9A84C" fillOpacity="0.85" />
          <circle cx="150" cy="82" r="3" fill="#E8C96A" />
        </g>
      )}
    </svg>
  )
}
