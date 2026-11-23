import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Truck, PackageCheck, Layers, Factory, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { waLink } from '../config'

const ITEMS = [
  {
    n: '01',
    title: 'Full Truck Load (FTL)',
    subtitle: 'Direct Non-Stop Linehaul',
    desc: 'Dedicated point-to-point transportation exclusively reserved for your cargo. Ideal for high-volume commercial shipments, manufacturing production runs, and time-critical deliveries.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85',
    tag: 'Dedicated Fleet',
    icon: Truck,
    highlights: ['Single consignee direct transit', 'Zero intermediate transshipment', 'Real-time GPS route visibility', 'Express highway clearance'],
  },
  {
    n: '02',
    title: 'Part Load & LTL',
    subtitle: 'Consolidated Road Freight',
    desc: 'Cost-effective consolidated transit for smaller consignments. Pay strictly for the truck space and payload you use, backed by scheduled linehaul dispatches across interstate corridors.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    tag: 'Cost Optimized',
    icon: PackageCheck,
    highlights: ['Economical parcel & pallet rates', 'Scheduled weekly departures', 'Careful compartmentalized packing', 'Transparent weight-based billing'],
  },
  {
    n: '03',
    title: 'Heavy & Bulky Cargo',
    subtitle: 'Specialized Multi-Axle Trailers',
    desc: 'Customized heavy-payload flatbeds and multi-axle trailers built to carry heavy industrial machinery, paper rolls, steel coils, and oversized structural engineering cargo safely.',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85',
    tag: 'Specialized Trailers',
    icon: Layers,
    highlights: ['Certified heavy-duty lashings', 'Multi-axle weight distribution', 'ODC highway escort support', 'Experienced heavy-haul drivers'],
  },
  {
    n: '04',
    title: 'Industrial & B2B Logistics',
    subtitle: 'Enterprise Supply Chain SLA',
    desc: 'Turnkey contract logistics tailored for manufacturers and distributors. Includes dedicated fleet allocation, priority bay placement, and guaranteed linehaul availability.',
    img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85',
    tag: 'Enterprise SLA',
    icon: Factory,
    highlights: ['Dedicated account dispatch manager', 'Guaranteed monthly vehicle supply', 'End-to-end transit insurance', 'Priority warehouse turnaround'],
  },
]

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = ITEMS[activeIdx]
  const Icon = current.icon

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['25px', '-25px'])

  return (
    <section className="svc-interactive" id="services" ref={ref}>
      <motion.div className="svc-container" style={{ y }}>
        <div className="svc-header">
          <div className="eyebrow">Our Transport Solutions</div>
          <h2>Precision Road Freight,<br />Engineered for Demanding Cargo.</h2>
          <p className="svc-sub">
            Click any service category below to view live vehicle capabilities, technical highlights, and instant quote booking.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="svc-tabs-bar" role="tablist">
          {ITEMS.map((item, idx) => (
            <button
              key={item.n}
              role="tab"
              aria-selected={activeIdx === idx}
              className={`svc-tab-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="svc-tab-num">{item.n}</span>
              <span className="svc-tab-text">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Animated Feature Stage */}
        <div className="svc-stage-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.n}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="svc-showcase-grid"
            >
              {/* Visual Side */}
              <div className="svc-img-wrapper">
                <img src={current.img} alt={current.title} className="svc-showcase-img" />
                <div className="svc-img-overlay" />
                <div className="svc-tag-chip">{current.tag}</div>
                <div className="svc-num-ghost">{current.n}</div>
              </div>

              {/* Information Side */}
              <div className="svc-info-pane">
                <div className="svc-title-row">
                  <div className="svc-icon-badge">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="svc-sub-title">{current.subtitle}</span>
                    <h3 className="svc-main-title">{current.title}</h3>
                  </div>
                </div>

                <p className="svc-main-desc">{current.desc}</p>

                <div className="svc-highlights-box">
                  <span className="highlights-label">Service Highlights</span>
                  <div className="highlights-grid">
                    {current.highlights.map((h, i) => (
                      <div key={i} className="highlight-item">
                        <Check size={16} className="h-ico" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  className="svc-quote-cta"
                  href={waLink(`Hello MPFC, I would like to book or inquire about: ${current.title}. Please provide rates.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Request Instant WhatsApp Quote</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}



