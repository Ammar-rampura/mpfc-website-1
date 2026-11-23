import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, ArrowRight, ShieldCheck, Gauge, Ruler } from 'lucide-react'
import { waLink } from '../config'

const FLEET_VEHICLES = [
  {
    id: 'heavy-trailer',
    n: '01',
    title: 'Multi-Axle Flatbed Trailer',
    type: 'Heavy Industrial Hauler',
    capacity: '25 – 40 Tonnes',
    dimensions: '40 ft × 8.5 ft',
    bestFor: 'Steel coils, industrial machinery, long pipes, and structural freight.',
    features: ['High-tensile lashing points', 'Air suspension for sensitive cargo', 'GPS & real-time monitoring'],
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'container-body',
    n: '02',
    title: 'Closed High-Cube Container',
    type: 'Weatherproof Transit',
    capacity: '15 – 25 Tonnes',
    dimensions: '32 ft × 8 ft × 9 ft',
    bestFor: 'FMCG goods, high-value electronics, boxed consumer goods, and weather-sensitive cargo.',
    features: ['Water-tight sealed body', 'Tamper-evident locking seals', 'Quick dock-level unloading'],
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'open-body',
    n: '03',
    title: 'Open Body Heavy Truck',
    type: 'Bulk & Agri Freight',
    capacity: '18 – 28 Tonnes',
    dimensions: '28 ft Heavy Chassis',
    bestFor: 'Agricultural commodities, bagged fertilizers, cement, and regional redistribution.',
    features: ['Heavy-duty side railings', 'Double heavy-gauge tarpaulins', 'All-weather road readiness'],
    img: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1200&q=85',
  },
]

export default function Fleet() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['20px', '-20px'])

  return (
    <section className="fleet-grid-section" id="fleet" ref={ref}>
      <motion.div className="flt-grid-container" style={{ y }}>
        <div className="flt-header-centered">
          <div className="eyebrow">Our Commercial Fleet</div>
          <h2>Specialized Highway Vehicles,<br />Engineered for Max Payload.</h2>
          <p className="flt-subtitle">
            Every vehicle in the MPFC fleet is GPS-monitored, fully permitted, and operated by seasoned interstate drivers.
          </p>
        </div>

        {/* 3-Column Luxury Commercial Vehicle Cards */}
        <div className="fleet-cards-3col">
          {FLEET_VEHICLES.map((v) => (
            <motion.div
              key={v.id}
              className="fleet-card-col"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {/* Image & Badge Header */}
              <div className="fleet-card-media">
                <img src={v.img} alt={v.title} className="fleet-card-photo" />
                <div className="fleet-media-gradient" />
                <span className="fleet-type-pill">{v.type}</span>
                <span className="fleet-index-chip">{v.n}</span>
              </div>

              {/* Body Content */}
              <div className="fleet-card-body">
                <h3 className="fleet-title-text">{v.title}</h3>
                <p className="fleet-ideal-text">{v.bestFor}</p>

                {/* Technical Specs Bar */}
                <div className="fleet-metrics-row">
                  <div className="fleet-metric-box">
                    <span className="f-metric-label">
                      <Gauge size={13} style={{ marginRight: 4, verticalAlign: '-1px' }} />
                      Capacity
                    </span>
                    <strong className="f-metric-value">{v.capacity}</strong>
                  </div>
                  <div className="fleet-metric-box">
                    <span className="f-metric-label">
                      <Ruler size={13} style={{ marginRight: 4, verticalAlign: '-1px' }} />
                      Dimensions
                    </span>
                    <strong className="f-metric-value">{v.dimensions}</strong>
                  </div>
                </div>

                {/* Features List */}
                <ul className="fleet-features-checklist">
                  {v.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} className="f-check-ico" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct Action Link */}
                <a
                  className="fleet-book-link"
                  href={waLink(`Hi MPFC, I want to book or get rates for: ${v.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Book This Vehicle</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}


