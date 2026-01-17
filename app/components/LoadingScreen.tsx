'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [shakePhase, setShakePhase] = useState(false);

  useEffect(() => {
    // Trigger shake effect at 4 seconds
    const timer = setTimeout(() => {
      setShakePhase(true);
    }, 500000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Perspective Container */}
      <div className="relative" style={{ perspective: '1000px' }}>
        {/* Logo with shake animation */}
        <motion.div
          className="relative z-10"
          animate={
            shakePhase
              ? {
                  x: [0, -15, 20, -10, 15, -20, 10, -5, 0],
                  y: [0, 10, -15, 20, -10, 15, -20, 10, 0],
                  rotateZ: [0, -2, 3, -2, 1, -1, 2, -1, 0],
                }
              : {}
          }
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="/logo.jpg"
              alt="Mahmoud Saeed Logo"
              width={400}
              height={400}
              priority
              className="rounded-lg shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(124, 122, 255, 0.3))',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Orbiting Dot with 3D effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: '800px', height: '800px' }}
        >
          {/* Orbit path visualization (optional) */}
          <div className="absolute inset-0 rounded-full border border-purple-500/10" />

          {/* The animated dot */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{
                scale: [1, 1.3, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              {/* Glowing dot with trail effect */}
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 6,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {/* Outer glow */}
                <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
                
                {/* Main dot */}
                <motion.div
                  className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"
                  style={{
                    boxShadow:
                      '0 0 20px rgba(124, 122, 255, 0.8), 0 0 40px rgba(124, 122, 255, 0.4)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />

                {/* Trail effect */}
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/50 blur-sm"
                  style={{ marginLeft: '-10px' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Speed up animation after 2 seconds */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 360, 720, 1080, 1440, 1800, 2160],
            }}
            transition={{
              duration: 4,
              times: [0, 0.3, 0.5, 0.65, 0.8, 0.9, 1],
              ease: 'easeIn',
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{
                scale: [1, 1.5, 1.8, 2],
                opacity: [1, 0.8, 0.6, 0],
              }}
              transition={{
                duration: 4,
                ease: 'easeIn',
              }}
            >
              <div
                className="w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/40 blur-sm"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.p
          className="text-purple-400 text-lg font-light tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LOADING
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
