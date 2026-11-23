import { motion } from 'framer-motion'
import logo from '../assets/logo.jpg'

export default function SplashScreen({ onFinish }) {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onFinish}
    >
      <div className="splash-bg-glow" />
      <div className="splash-content">
        <motion.div
          className="splash-logo-circle splash-logo-official"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img src={logo} alt="MPFC Logo" className="splash-official-logo-img" />
          <motion.div
            className="splash-pulse-ring"
            animate={{ scale: [1, 1.25, 1.5], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>

        <div className="splash-loader-bar">
          <motion.div
            className="splash-loader-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          className="splash-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.8 }}
        >
          Reliable Highway Freight Logistics Across India
        </motion.p>
      </div>
    </motion.div>
  )
}

