'use client';

import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="text-center space-y-8 px-6">
        {/* Welcome heading */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold"
          style={{ 
            background: 'linear-gradient(135deg, #A8A9FF 0%, #5B5FED 50%, #4845D2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ y: 50, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Welcome
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl font-light tracking-wide"
          style={{ color: '#94A3B8' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          to Mahmoud Saeed's Portfolio
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-1 mx-auto rounded-full"
          style={{ backgroundColor: '#5B5FED' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Additional text */}
        <motion.p
          className="text-sm md:text-base max-w-md mx-auto"
          style={{ color: '#94A3B8' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Crafting digital experiences with passion and precision
        </motion.p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: 'rgba(91, 95, 237, 0.3)',
              left: typeof window !== 'undefined' ? `${Math.random() * 100}%` : '50%',
              top: typeof window !== 'undefined' ? `${Math.random() * 100}%` : '50%',
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? Math.random() * -200 : -100, 0],
              x: [0, typeof window !== 'undefined' ? (Math.random() - 0.5) * 100 : 0, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
