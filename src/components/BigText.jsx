import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Truck, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'

export default function BigText() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(p, [0, 1], ['0%', '-35%'])
  const x2 = useTransform(p, [0, 1], ['-30%', '5%'])

  return (
    <section className="marquee-cinematic" aria-hidden="true" ref={ref}>
      {/* Top Banner Tag */}
      <div className="marquee-badge-row">
        <span className="marquee-pill">
          <Zap size={14} className="pill-ico" />
          <span>Interstate Highway Express</span>
        </span>
        <span className="marquee-pill">
          <Truck size={14} className="pill-ico" />
          <span>Heavy Load Logistics</span>
        </span>
        <span className="marquee-pill">
          <ShieldCheck size={14} className="pill-ico" />
          <span>100% Insured Fleet</span>
        </span>
      </div>

      {/* Row 1 - Leftward Stream */}
      <div className="stream-track stream-1">
        <motion.div className="stream-inner" style={{ x: x1 }}>
          <span>MADHYA PRADESH FREIGHT CARRIER</span>
          <span className="stream-star">★</span>
          <span>NATIONWIDE LOGISTICS</span>
          <span className="stream-star">★</span>
          <span>HEAVY TRUCKLOADS</span>
          <span className="stream-star">★</span>
          <span>MADHYA PRADESH FREIGHT CARRIER</span>
        </motion.div>
      </div>

      {/* Row 2 - Rightward Counter-Stream */}
      <div className="stream-track stream-2">
        <motion.div className="stream-inner stream-outline" style={{ x: x2 }}>
          <span>RELIABILITY • SPEED • SCALE</span>
          <span className="stream-dot">•</span>
          <span>DISPATCH ON WHATSAPP</span>
          <span className="stream-dot">•</span>
          <span>COMMITTED HIGHWAY FLEET</span>
          <span className="stream-dot">•</span>
          <span>RELIABILITY • SPEED • SCALE</span>
        </motion.div>
      </div>
    </section>
  )
}

