import { motion } from 'framer-motion'
import { Star, Quote, Building2, UserCheck } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Vikramaditya Singhania',
    role: 'Logistics Head, Apex Steel Mills',
    location: 'Indore, MP',
    text: 'MPFC has been our primary heavy-haul partner for steel coils and structural girders. Zero transit damages across 300+ dispatches and transparent WhatsApp coordination.',
    rating: 5,
    tag: 'Steel & Heavy Cargo',
  },
  {
    name: 'Anand Shrivastava',
    role: 'Supply Chain VP, Central Paper Products',
    location: 'Bhopal, MP',
    text: 'Moving multi-tonne paper rolls requires specialized multi-axle trailers with reliable lashings. MPFC delivers on-time, every single time without excuses.',
    rating: 5,
    tag: 'Industrial Paper Rolls',
  },
  {
    name: 'Rajeshwar Patel',
    role: 'Operations Director, Patel Agri Feeds',
    location: 'Dewas, MP',
    text: 'Their WhatsApp rate quoting and express dispatch system saves us hours compared to traditional transport brokers. Drivers are verified and polite.',
    rating: 5,
    tag: 'Agricultural Commodities',
  },
  {
    name: 'Suresh Menon',
    role: 'Procurement Manager, Premier Engineering',
    location: 'Pithampur SEZ',
    text: 'Critical oversized manufacturing equipment moved from MP to Maharashtra smoothly with proper interstate permits and tracking. Highly recommended.',
    rating: 5,
    tag: 'ODC & Machinery',
  },
  {
    name: 'Manish Verma',
    role: 'Fleet Coordinator, Verma FMCG Corp',
    location: 'Ujjain, MP',
    text: 'High-cube containers kept weather-sensitive cargo completely safe during heavy monsoon highway transits. True professionals.',
    rating: 5,
    tag: 'Commercial Transit',
  },
]

// Duplicate list for infinite smooth rolling marquee
const ROLLER_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testi-header">
        <div className="eyebrow">Client Feedback & Trust</div>
        <h2>Trusted by Industrial Leaders<br />Across Highway Corridors.</h2>
        <p className="testi-sub">
          Real reviews from plant managers, procurement directors, and supply chain heads moving freight with MPFC.
        </p>
      </div>

      {/* Infinite Rolling Carousel Track */}
      <div className="testi-marquee-container">
        <div className="testi-fade-edge left" />
        <div className="testi-fade-edge right" />

        <div className="testi-track">
          {ROLLER_ITEMS.map((item, idx) => (
            <div className="testi-card" key={idx}>
              <div className="testi-top-row">
                <div className="testi-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="testi-tag-badge">{item.tag}</span>
              </div>

              <p className="testi-quote-text">"{item.text}"</p>

              <div className="testi-author-row">
                <div className="testi-avatar-circle">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h4 className="testi-author-name">{item.name}</h4>
                  <span className="testi-author-meta">{item.role} • {item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
