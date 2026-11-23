import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Clock, MapPin, Award, CheckCircle } from 'lucide-react'

const ABOUT_IMG = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=85'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const badgeY = useTransform(scrollYProgress, [0, 1], ['25px', '-25px'])
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px'])

  return (
    <section className="about-nike" id="about" ref={ref}>
      <div className="about-grid-wrapper">
        <motion.div className="about-text-col" style={{ y: textY }}>
          <div className="eyebrow-nike">ABOUT MPFC</div>
          <h2 className="title-nike">ENGINEERED FOR THE LONG HAUL.</h2>
          <p className="lead-nike">
            Madhya Pradesh Freight Carrier is the backbone of heavy highway logistics across India. We deliver precision, reliability, and sheer capability for businesses moving critical, large-scale cargo.
          </p>

          <div className="about-stats-row">
            <motion.div
              className="stat-pill"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <b>15+</b>
              <span>Years on Highway</span>
            </motion.div>
            <motion.div
              className="stat-pill"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <b>10,000+</b>
              <span>Loads Delivered</span>
            </motion.div>
            <motion.div
              className="stat-pill"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <b>99.4%</b>
              <span>On-Time Arrival</span>
            </motion.div>
          </div>

          <div className="about-checklist">
            <div className="check-item">
              <CheckCircle size={18} className="check-ico" />
              <div>
                <strong>Direct WhatsApp Dispatch</strong>
                <p>Instant rate estimation and linehaul tracking without lengthy call queues.</p>
              </div>
            </div>
            <div className="check-item">
              <CheckCircle size={18} className="check-ico" />
              <div>
                <strong>Heavy & Bulky Cargo Certified</strong>
                <p>Specialized flatbeds equipped with heavy-duty lashings for steel, machinery, and paper rolls.</p>
              </div>
            </div>
            <div className="check-item">
              <CheckCircle size={18} className="check-ico" />
              <div>
                <strong>Full Route Insurance & GPS</strong>
                <p>Complete peace of mind with vetted drivers and verified interstate permits.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="about-visual-col">
          <div className="visual-card">
            <motion.img
              src={ABOUT_IMG}
              alt="MPFC Logistics on Highway"
              className="visual-img"
              style={{ y: imgY, scale: 1.12 }}
            />
            <div className="visual-gradient-overlay" />
            <motion.div className="visual-floating-badge" style={{ y: badgeY }}>
              <Award size={28} className="badge-ico" />
              <div>
                <span className="badge-h">Certified Carrier</span>
                <span className="badge-p">Madhya Pradesh & Interstate Lines</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}



