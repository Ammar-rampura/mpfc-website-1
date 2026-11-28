import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { waLink } from '../config'
import logo from '../assets/logo.jpg'

export default function StickyNav() {
  const [on, setOn] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setOn(y > 300))

  return (
    <nav className={'sticky' + (on ? ' on' : '')}>
      <a href="#top" className="sticky-logo-link">
        <img src={logo} alt="MPFC" className="sticky-logo-img" />
      </a>
      <div className="sticky-links">
        <a className="l" href="#about">About</a>
        <a className="l" href="#services">Services</a>
        <a className="l" href="#fleet">Fleet</a>
        <a className="l" href="#contact">Contact</a>
      </div>
      <a className="q" href={waLink('Hello MPFC, I need a truck quote.')} target="_blank" rel="noopener noreferrer">Get a Quote</a>
    </nav>
  )
}

