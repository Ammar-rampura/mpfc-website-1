import logo from '../assets/logo.jpg'
import truck from '../assets/truck.webp'
import mobileBg from '../assets/mobile-bg.webp'
import Fog from './Fog'
import useHeroEngine from '../useHeroEngine'
import { waLink, PHONE_DISPLAY, PHONE_TEL } from '../config'

export default function Hero() {
  const { want, shown, pick, eng } = useHeroEngine()
  return (
    <div className="hero-pinned-track" id="top">
      <main className="hero">
        <div className="layer sky">
          <picture className="sk-pic">
            <source media="(max-width: 820px)" srcSet={mobileBg} />
            <img className="sk" id="skyM" alt="" src={truck} />
          </picture>
          <picture className="sk-pic">
            <source media="(max-width: 820px)" srcSet={mobileBg} />
            <img className="sk" id="skyN" alt="" src={truck} />
          </picture>
        </div>
        <div className="layer home">
          <div className={'set' + (shown ? '' : ' is-on')} id="setM">
            <div className="fg">
              <picture className="ph-pic">
                <source media="(max-width: 820px)" srcSet={mobileBg} />
                <img className="ph" alt="An MPFC truck carrying paper rolls on a highway at sunset" src={truck} />
              </picture>
            </div>
          </div>
          <div className={'set n' + (shown ? ' is-on' : '')} id="setN">
            <div className="fg">
              <picture className="ph-pic">
                <source media="(max-width: 820px)" srcSet={mobileBg} />
                <img className="ph" alt="The MPFC truck on the highway at night" src={truck} />
              </picture>
              <i className="tint" />
              <i className="hl hl-left" />
              <i className="hl hl-right" />
            </div>
          </div>
        </div>
        <div className="tilt" />
        <Fog eng={eng} />
        <div className="ui">
          <header className="bar">
            <a className="logo logo-img-wrap" href="#top" aria-label="MPFC">
              <img src={logo} alt="Madhya Pradesh Freight Carrier Logo" className="brand-logo-img" />
            </a>
            <ul className="links">
              <li><a href="#top">Home</a></li><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#fleet">Fleet</a></li><li><a href="#contact">Contact</a></li>
            </ul>
            <div className="side">
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              <a className="cta" href={waLink('Hello MPFC, I need a truck quote.')} target="_blank" rel="noopener noreferrer">Get a Quote</a>
            </div>
          </header>
          <h1>
            <span className="l1">Trucks That Carry Your Business</span>
            <span><i>by Madhya Pradesh</i> <span className="y">Freight Carrier</span></span>
          </h1>
          <div className="dock">
            <div className="toggle" role="group" aria-label="Time of day">
              <button id="bm" aria-pressed={!want} onClick={() => pick(0)}><b>Sunset</b><small>Freight in motion</small></button>
              <button id="bn" aria-pressed={!!want} onClick={() => pick(1)}><b>Night</b><small>Freight in motion</small></button>
            </div>
            <p className="cap">MPFC truck transport services. Send your load details<br />and we will reply on WhatsApp.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

