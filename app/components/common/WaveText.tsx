import { motion } from 'framer-motion'
import { FC } from 'react'

const WaveText: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="w-full mx-auto text-center font-semibold py-3 text-2xl overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [5, -5, 5, 0] }} // Creates a wave effect
          transition={{
            duration: 0.8,
            delay: index * 0.03 // Delays each letter slightly
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char} {/* Preserves spaces */}
        </motion.span>
      ))}
    </div>
  )
}

export default WaveText
