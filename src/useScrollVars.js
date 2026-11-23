import { useEffect } from 'react'
import { clamp, smooth, store } from './utils'

// Writes page-level CSS variables: sky colour, text colour, cloud parallax, progress bar.
export default function useScrollVars() {
  useEffect(() => {
    const r = document.documentElement.style
    let ly = -1, lk = -1, id
    const tick = () => {
      const y = scrollY, k = store.k
      if (y !== ly || k !== lk) {
        ly = y; lk = k
        const H = innerHeight
        const max = Math.max(1, document.documentElement.scrollHeight - H)
        const pk = clamp((y - H * 0.6) / (max - H * 0.6))
        const pt = Math.max(smooth(0.25, 0.55, pk), k * (1 - smooth(0, 0.3, pk)))
        const bn = Math.max(pk, k * (1 - smooth(0, 0.35, pk)))
        r.setProperty('--pt', pt.toFixed(3))
        r.setProperty('--bn', bn.toFixed(3))
        r.setProperty('--sy', y)
        r.setProperty('--p', (y / max).toFixed(4))
      }
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(id)
  }, [])
}
