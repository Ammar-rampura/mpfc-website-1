import { useState } from 'react'
import Hero from './components/Hero'
import Backdrop from './components/Backdrop'
import StickyNav from './components/StickyNav'
import About from './components/About'
import Services from './components/Services'
import Fleet from './components/Fleet'
import BigText from './components/BigText'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import useScrollVars from './useScrollVars'

export default function App() {
  useScrollVars()
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Hero />
      <Backdrop />
      <StickyNav />
      <About />
      <Services />
      <Fleet />
      <BigText />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}


