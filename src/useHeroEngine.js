import { useEffect, useRef, useState } from 'react'
import { clamp, smooth, store } from './utils'

const SINK = 240, RISE = 820, DEPTH = 0.27
const calm = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

// Real-world Time Detection helper:
// Day/Sunset: between 6 AM and 6:30 PM (returns 0)
// Night: between 6:30 PM and 6 AM (returns 1)
function getInitialTimeMode() {
  const hour = new Date().getHours()
  const minutes = new Date().getMinutes()
  const currentTime = hour + minutes / 60
  // 6:00 (6.0) to 18:30 (18.5) is Day/Sunset
  return (currentTime >= 6 && currentTime < 18.5) ? 0 : 1
}

export default function useHeroEngine() {
  // Automatically detects current real-world hour
  const defaultMode = useRef(getInitialTimeMode()).current
  const [want, setWant] = useState(defaultMode)
  const [shown, setShown] = useState(defaultMode)
  const e = useRef({ target: defaultMode, from: defaultMode, start: -1e9, queued: null, swapped: true, animating: false, clock: 0, k: defaultMode, s: 0 })

  useEffect(() => {
    const root = document.documentElement.style
    const S = e.current
    let id

    // Initialize CSS properties with the real-world time mode
    root.setProperty('--k', defaultMode.toFixed(3))
    root.setProperty('--k2', defaultMode.toFixed(3))
    store.k = defaultMode

    // Manual click trigger (smooth transition)
    const begin = (n, now) => { S.target = n; S.from = S.k; S.start = now; S.swapped = false; S.animating = true }
    S.begin = begin

    const frame = (now) => {
      id = requestAnimationFrame(frame)
      S.clock = now
      const scrollY = window.scrollY
      const trackHeight = window.innerHeight * 0.85

      if (!S.animating) {
        // Continuous scroll-driven progress (0.0 to 1.0)
        const scrollFraction = clamp(scrollY / Math.max(1, trackHeight))

        // If currently Day (defaultMode === 0): scrolling down goes Day -> Night (0 -> 1)
        // If currently Night (defaultMode === 1): scrolling down goes Night -> Day (1 -> 0)
        const scrollK = defaultMode === 0 ? scrollFraction : (1 - scrollFraction)

        if (Math.abs(scrollK - S.k) > 0.005) {
          S.k = scrollK
          // Smoothly toggle headlights & photo layer
          const activeNight = S.k > 0.45 ? 1 : 0
          if (activeNight !== shown) setShown(activeNight)
          
          S.s = Math.sin(S.k * Math.PI) * 0.35
          setWant(S.k > 0.5 ? 1 : 0)

          store.k = S.k
          root.setProperty('--k', S.k.toFixed(3))
          root.setProperty('--k2', S.k.toFixed(3))
        }
      } else {
        const d = now - S.start
        let y = 0, s = 0, dip = 0, k2 = S.k
        if (d < SINK) { const x = d / SINK; y = x * x * (3 - 2 * x) * DEPTH }
        else {
          if (!S.swapped) { S.swapped = true; setShown(S.target) }
          const x = clamp((d - SINK) / RISE); y = Math.pow(1 - x, 3.4) * DEPTH
        }
        s = smooth(0, SINK * 0.92, d) * (1 - smooth(SINK + 70, SINK + RISE * 0.92, d))
        dip = smooth(30, 190, d) * (1 - smooth(330, 720, d))
        S.k = S.from + (S.target - S.from) * smooth(120, 520, d)
        k2 = S.from + (S.target - S.from) * smooth(340, 760, d)
        if (d >= SINK + RISE) {
          S.animating = false; S.k = k2 = S.target; y = s = dip = 0
          if (S.queued !== null && S.queued !== S.target) { const q = S.queued; S.queued = null; begin(q, now) }
          else S.queued = null
        }
        S.s = s
        root.setProperty('--sink', (y * innerHeight).toFixed(1) + 'px')
        root.setProperty('--dip', dip.toFixed(3))
        store.k = S.k
        root.setProperty('--k', S.k.toFixed(3))
        root.setProperty('--k2', S.k.toFixed(3))
      }
    }

    id = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(id)
  }, [shown, defaultMode])

  const pick = (n) => {
    const S = e.current
    if (n === S.target && S.queued === null) return
    setWant(n)
    if (calm) { S.target = n; S.k = n; setShown(n); return }
    if (S.animating) S.queued = n
    else S.begin(n, S.clock)
  }

  return { want, shown, pick, eng: e }
}
