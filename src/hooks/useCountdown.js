import { useEffect, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

function diff(target) {
  const ms = target - Date.now()
  if (ms <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', done: true }
  return {
    days: pad(Math.floor(ms / 86400000)),
    hours: pad(Math.floor(ms / 3600000) % 24),
    minutes: pad(Math.floor(ms / 60000) % 60),
    seconds: pad(Math.floor(ms / 1000) % 60),
    done: false,
  }
}

/** Live countdown to an ISO date-time string. */
export function useCountdown(isoDateTime) {
  const target = new Date(isoDateTime).getTime()
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    if (Number.isNaN(target)) return
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}
