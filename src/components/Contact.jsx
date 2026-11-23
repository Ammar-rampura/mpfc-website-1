import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import { waLink, PHONE_DISPLAY, PHONE_TEL } from '../config'

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leftY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px'])
  const formY = useTransform(scrollYProgress, [0, 1], ['35px', '-35px'])

  const submit = (e) => {
    e.preventDefault()
    const f = e.target.elements
    const text = `*New Load Booking Request - MPFC*\n------------------------\n👤 Name: ${f.n.value}\n📞 Phone: ${f.p.value}\n📍 Pickup: ${f.a.value}\n🏁 Drop: ${f.b.value}\n📦 Material/Weight: ${f.m.value || 'Not specified'}\n📝 Message: ${f.x.value || 'None'}`
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <section className="ct-upgraded" id="contact" ref={ref}>
      <div className="ct-wrapper">
        {/* Left Information Column */}
        <motion.div className="ct-info-col" style={{ y: leftY }}>
          <div className="eyebrow">Quick Dispatch & Contact</div>
          <h2 className="ct-heading">Let's Get Your Cargo Moving.</h2>
          <p className="ct-desc">
            Direct interstate linehaul rates within minutes. Submit your pickup and drop locations, or reach our central dispatch team directly.
          </p>

          <div className="ct-cards-stack">
            <a href={`tel:${PHONE_TEL}`} className="contact-card-box">
              <div className="contact-card-icon">
                <Phone size={22} />
              </div>
              <div>
                <span className="contact-card-label">Direct Phone Line</span>
                <strong className="contact-card-value">{PHONE_DISPLAY}</strong>
                <span className="contact-card-sub">Mon – Sun, 24/7 Available</span>
              </div>
            </a>

            <a href={waLink('Hello MPFC dispatch team, I have a transport enquiry.')} target="_blank" rel="noopener noreferrer" className="contact-card-box wa-accent">
              <div className="contact-card-icon wa-icon">
                <MessageSquare size={22} />
              </div>
              <div>
                <span className="contact-card-label">Instant WhatsApp Support</span>
                <strong className="contact-card-value">Start Chat on WhatsApp</strong>
                <span className="contact-card-sub">Typical reply time: Under 5 mins</span>
              </div>
            </a>

            <div className="contact-card-box info-only">
              <div className="contact-card-icon">
                <MapPin size={22} />
              </div>
              <div>
                <span className="contact-card-label">Central Operations Base</span>
                <strong className="contact-card-value">Madhya Pradesh, India</strong>
                <span className="contact-card-sub">Connected to all major national highways</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form Card */}
        <motion.div className="ct-form-card" style={{ y: formY }}>
          <div className="form-card-header">
            <h3>Request Freight Rate</h3>
            <p>Fills your message directly into WhatsApp with load parameters.</p>
          </div>

          <form className="upgraded-form" onSubmit={submit}>
            <div className="form-row-2">
              <label>
                <span>Full Name *</span>
                <input name="n" placeholder="e.g. Rajesh Kumar" required />
              </label>
              <label>
                <span>Phone Number *</span>
                <input name="p" type="tel" placeholder="+91 98765 43210" required />
              </label>
            </div>

            <div className="form-row-2">
              <label>
                <span>Pickup Location *</span>
                <input name="a" placeholder="e.g. Indore, MP" required />
              </label>
              <label>
                <span>Drop Location *</span>
                <input name="b" placeholder="e.g. Mumbai, MH" required />
              </label>
            </div>

            <label className="form-full">
              <span>Material Type & Estimated Weight</span>
              <input name="m" placeholder="e.g. Paper rolls / 22 Tonnes" />
            </label>

            <label className="form-full">
              <span>Additional Instructions</span>
              <textarea name="x" rows="3" placeholder="Preferred vehicle type, loading date, specific requirements..." />
            </label>

            <button className="submit-quote-btn" type="submit">
              <span>Send Load Details on WhatsApp</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}


