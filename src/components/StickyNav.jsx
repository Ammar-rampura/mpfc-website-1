import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import logo from '../assets/logo.jpg'

export default function StickyNav() {
  const [on, setOn] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setOn(y > innerHeight * 0.8))
  return (
    <nav className={'sticky' + (on ? ' on' : '')}>
      <img src={logo} alt="MPFC" className="sticky-logo-img" />
      <a className="l" href="#about">About</a><a className="l" href="#services">Services</a>
      <a className="l" href="#fleet">Fleet</a><a className="l" href="#contact">Contact</a>
      <a className="q" href="#contact">Get a Quote</a>
    </nav>
  )
}

