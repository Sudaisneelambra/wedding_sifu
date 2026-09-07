import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Background music.
 *
 * Browsers refuse to start audio without a user gesture, so playback begins on
 * the "Open Invitation" click (`start`), with a plain tap anywhere as a
 * fallback. It fades in rather than jumping to full volume.
 */
export default function MusicToggle({ music, start }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const [playing, setPlaying] = useState(false)

  const target = music.volume ?? 0.45
  const fadeMs = music.fadeInMs ?? 2600

  const fadeIn = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    clearInterval(fadeRef.current)
    const step = 60
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return clearInterval(fadeRef.current)
      const next = audioRef.current.volume + target / (fadeMs / step)
      if (next >= target) {
        audioRef.current.volume = target
        clearInterval(fadeRef.current)
      } else {
        audioRef.current.volume = next
      }
    }, step)
  }, [target, fadeMs])

  const play = useCallback(() => {
    const el = audioRef.current
    if (!el || !el.paused) return
    el.volume = 0
    el.play()
      .then(() => {
        setPlaying(true)
        fadeIn()
      })
      .catch(() => {
        /* still blocked — the button is there */
      })
  }, [fadeIn])

  // start with the opening of the invitation
  useEffect(() => {
    if (start) play()
  }, [start, play])

  // fallback: any first interaction on the page
  useEffect(() => {
    if (!music.enabled || !music.src) return undefined
    const once = () => play()
    window.addEventListener('pointerdown', once, { once: true })
    return () => window.removeEventListener('pointerdown', once)
  }, [music, play])

  useEffect(() => () => clearInterval(fadeRef.current), [])

  if (!music.enabled || !music.src) return null

  function toggle(e) {
    e.stopPropagation()
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      play()
    } else {
      clearInterval(fadeRef.current)
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {/* `none`: the track is half a megabyte and must not compete with
          the first paint. It is fetched on the gesture that starts it. */}
      <audio ref={audioRef} src={music.src} loop preload="none" />
      <button
        className={`music ${playing ? 'is-playing' : 'is-paused'}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? (
          /* playing — the bars dance */
          <span className="music__bars" aria-hidden="true">
            <i className="music__bar" /><i className="music__bar" />
            <i className="music__bar" /><i className="music__bar" />
          </span>
        ) : (
          /* silent — a plain music note, so the control reads as music
             rather than as an empty circle */
          <svg className="music__note" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 17.5V6.2l10-2.1v11"
              stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <ellipse cx="6.6" cy="17.7" rx="2.6" ry="2.2" fill="currentColor" />
            <ellipse cx="16.6" cy="15.6" rx="2.6" ry="2.2" fill="currentColor" />
          </svg>
        )}
        <span className="music__ping" aria-hidden="true" />
      </button>
    </>
  )
}
