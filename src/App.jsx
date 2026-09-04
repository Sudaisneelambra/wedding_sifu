import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { invitation } from './data/invitation.js'
import { usePointer } from './hooks/usePointer.js'

import Backdrop from './components/Backdrop.jsx'
import Petals from './components/Petals.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Loader from './components/Loader.jsx'
import OpenTransition from './components/OpenTransition.jsx'
import Hero from './components/Hero.jsx'
import InviteCard from './components/InviteCard.jsx'
import EventDetails from './components/EventDetails.jsx'
import Countdown from './components/Countdown.jsx'
import Rsvp from './components/Rsvp.jsx'
import Venue from './components/Venue.jsx'
import Closing from './components/Closing.jsx'
import MusicToggle from './components/MusicToggle.jsx'

export default function App() {
  const { meta, couple, words, event, venue, rsvp, music, art } = invitation

  /* The page is only built once the loader hands over — the fonts have landed
   * by then, so the entrance animations play against final type instead of
   * jumping when the script face swaps in. */
  const [ready, setReady] = useState(false)

  /* Two states, never both: the cover screen, or the invitation. */
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)

  const pointer = usePointer()

  const handleReady = useCallback(() => setReady(true), [])
  const startOpening = useCallback(() => setOpening(true), [])
  const revealInvitation = useCallback(() => setOpened(true), [])
  const finishOpening = useCallback(() => setOpening(false), [])

  // the invitation always begins at its own first screen
  useLayoutEffect(() => {
    if (opened) window.scrollTo(0, 0)
  }, [opened])

  useEffect(() => {
    document.title = meta.pageTitle
    const tag = document.querySelector('meta[name="description"]')
    if (tag && meta.description) tag.setAttribute('content', meta.description)
  }, [meta])

  // couple.order decides who is named first throughout the page
  const [firstKey, secondKey] = couple.order
  const first = couple[firstKey]
  const second = couple[secondKey]

  return (
    <>
      <Backdrop pointer={pointer} />
      <Petals />
      {opened && <ScrollProgress />}
      <Loader names={words.signature} onDone={handleReady} />
      <OpenTransition active={opening} onReveal={revealInvitation} onDone={finishOpening} />

      <main className={`app ${opened ? 'is-open' : 'is-sealed'}`}>
        {!ready ? null : opened ? (
          <>
            <InviteCard
              first={first}
              second={second}
              words={words}
              art={art}
              pointer={pointer}
            />
            <EventDetails event={event} venue={venue} />
            <Countdown dateTime={event.dateTime} caption={words.countdownCaption} />
            <Rsvp rsvp={rsvp} />
            <Venue venue={venue} event={event} />
            <Closing words={words} />
          </>
        ) : (
          <Hero
            first={first}
            second={second}
            words={words}
            art={art}
            pointer={pointer}
            onOpen={startOpening}
          />
        )}
      </main>

      <MusicToggle music={music} start={opening || opened} />
    </>
  )
}
