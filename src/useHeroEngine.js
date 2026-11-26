import { useEffect, useRef, useState } from 'react'
import { clamp, smooth, store } from './utils'

const SINK = 220, RISE = 780, DEPTH = 0.25
const calm = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches

// Real-world Time Detection:
// Day/Sunset: between 6:00 AM and 6:30 PM (returns 0)
// Night: between 6:30 PM and 6:00 AM (returns 1)
export function getInitialTimeMode() {
  if (typeof window === 'undefined') return 0
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours + minutes / 60
  // Between 6:00 (6.0) and 18:30 (18.5) is Sunset/Day, otherwise Night
  return (currentTime >= 6 && currentTime < 18.5) ? 0 : 1
}

export default function useHeroEngine() {
  const [initialMode] = useState(getInitialTimeMode)
  const [want, setWant] = useState(initialMode) // 0: sunset, 1: night
  const [shown, setShown] = useState(initialMode)
  const isManual = useRef(false)
  const e = useRef({
    target: initialMode,
    from: initialMode,
    start: -1e9,
    queued: null,
    swapped: true,
    animating: false,
    clock: 0,
    k: initialMode,
    s: 0
  })

  // Initialize CSS variables once on mount based on initial mode
  useEffect(() => {
    const root = document.documentElement.style
    root.setProperty('--k', initialMode.toFixed(3))
    root.setProperty('--k2', initialMode.toFixed(3))
    root.setProperty('--bn', initialMode.toFixed(3))
    root.setProperty('--pt', initialMode.toFixed(3))
    store.k = initialMode
  }, [initialMode])

  useEffect(() => {
    const root = document.documentElement.style
    const S = e.current
    let id

    // Manual or programmatic transition
    const begin = (n, now) => {
      S.target = n
      S.from = S.k
      S.start = now
      S.swapped = false
      S.animating = true
    }
    S.begin = begin

    const frame = (now) => {
      id = requestAnimationFrame(frame)
      S.clock = now
      const scrollY = window.scrollY
      const trackHeight = window.innerHeight * 0.85

      if (!S.animating) {
        // Only drive via scroll if user hasn't manually clicked
        if (!isManual.current) {
          // If starting at night (initialMode == 1), scroll goes from night (1) to sunset (0)
          // If starting at day (initialMode == 0), scroll goes from sunset (0) to night (1)
          const scrollFraction = clamp(scrollY / Math.max(1, trackHeight))
          const targetK = initialMode === 1 ? clamp(1 - scrollFraction) : scrollFraction
          
          if (Math.abs(targetK - S.k) > 0.005) {
            S.k = targetK
            const activeNight = S.k > 0.5 ? 1 : 0
            if (activeNight !== shown) setShown(activeNight)
            
            S.s = Math.sin(S.k * Math.PI) * 0.35
            setWant(activeNight)

            store.k = S.k
            root.setProperty('--k', S.k.toFixed(3))
            root.setProperty('--k2', S.k.toFixed(3))
            root.setProperty('--bn', S.k.toFixed(3))
            root.setProperty('--pt', S.k.toFixed(3))
          }
        }
      } else {
        const d = now - S.start
        let y = 0, s = 0, dip = 0, k2 = S.k
        if (d < SINK) {
          const x = d / SINK
          y = x * x * (3 - 2 * x) * DEPTH
        } else {
          if (!S.swapped) {
            S.swapped = true
            setShown(S.target)
          }
          const x = clamp((d - SINK) / RISE)
          y = Math.pow(1 - x, 3.4) * DEPTH
        }
        s = smooth(0, SINK * 0.92, d) * (1 - smooth(SINK + 70, SINK + RISE * 0.92, d))
        dip = smooth(30, 190, d) * (1 - smooth(330, 720, d))
        S.k = S.from + (S.target - S.from) * smooth(120, 520, d)
        k2 = S.from + (S.target - S.from) * smooth(340, 760, d)

        if (d >= SINK + RISE) {
          S.animating = false
          S.k = k2 = S.target
          y = s = dip = 0
          setShown(S.target)
          if (S.queued !== null && S.queued !== S.target) {
            const q = S.queued
            S.queued = null
            begin(q, now)
          } else {
            S.queued = null
          }
        }
        S.s = s
        root.setProperty('--sink', (y * window.innerHeight).toFixed(1) + 'px')
        root.setProperty('--dip', dip.toFixed(3))
        store.k = S.k
        root.setProperty('--k', S.k.toFixed(3))
        root.setProperty('--k2', S.k.toFixed(3))
        root.setProperty('--bn', S.k.toFixed(3))
        root.setProperty('--pt', S.k.toFixed(3))
      }
    }

    id = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(id)
  }, [shown, initialMode])

  const pick = (n) => {
    isManual.current = true // Permanently freeze manual override so scroll loop never reverses it
    const S = e.current
    if (n === S.target && S.queued === null && !S.animating) return
    setWant(n)
    if (calm) {
      S.target = n
      S.k = n
      setShown(n)
      const root = document.documentElement.style
      root.setProperty('--k', n.toFixed(3))
      root.setProperty('--k2', n.toFixed(3))
      root.setProperty('--bn', n.toFixed(3))
      root.setProperty('--pt', n.toFixed(3))
      return
    }
    if (S.animating) {
      S.queued = n
    } else {
      S.begin(n, S.clock || performance.now())
    }
  }

  return { want, shown, pick, eng: e }
}
