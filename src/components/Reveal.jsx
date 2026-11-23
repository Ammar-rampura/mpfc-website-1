import { motion } from 'framer-motion'

// Fade/blur/slide-in once when scrolled into view.
export default function Reveal({ as = 'div', i = 0, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 46, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
