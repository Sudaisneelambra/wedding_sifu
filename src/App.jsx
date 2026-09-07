import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { invitation } from './data/invitation.js'
import { usePointer } from './hooks/usePointer.js'

import Backdrop from './components/Backdrop.jsx'
import Petals from './components/Petals.jsx'
import Sparkles from './components/Sparkles.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Loader from './components/Loader.jsx'
import OpenTransition from './components/OpenTransition.jsx'
import Hero from './components/Hero.jsx'
import InviteCard from './components/InviteCard.jsx'
import HandsJoin from './components/HandsJoin.jsx'
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
  /* The rest of the page mounts once the transition is over. Building all six
   * sections in the same frame as the reveal is a heavy synchronous render,
   * and on a slow phone it stalls the door animation. */
  const [full, setFull] = useState(false)

  const pointer = usePointer()

  const handleReady = useCallback(() => setReady(true), [])
  const startOpening = useCallback(() => setOpening(true), [])
  const revealInvitation = useCallback(() => setOpened(true), [])
  const finishOpening = useCallback(() => {
    setOpening(false)
    setFull(true)
  }, [])

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
      <Petals pointer={pointer} />
      <Sparkles />
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
            {full && (
              <>
                <HandsJoin words={words} art={art} />
                <EventDetails event={event} venue={venue} />
                <Countdown dateTime={event.dateTime} caption={words.countdownCaption} />
                <Rsvp rsvp={rsvp} />
                <Venue venue={venue} event={event} />
                <Closing words={words} />
              </>
            )}
          </>
        ) : (
          <Hero
            first={first}
            second={second}
            words={words}
            art={art}
            event={event}
            venue={venue}
            pointer={pointer}
            onOpen={startOpening}
          />
        )}
      </main>

      <MusicToggle music={music} start={opening || opened} />
    </>
  )
}
