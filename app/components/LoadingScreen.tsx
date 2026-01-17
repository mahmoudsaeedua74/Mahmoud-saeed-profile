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
    }, 4000);

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
                  x: [0, -20, 25, -15, 20, -25, 15, -10, 0],
                  y: [0, 15, -20, 25, -15, 20, -25, 15, 0],
                  rotateZ: [0, -3, 4, -3, 2, -2, 3, -2, 0],
                  scale: [1, 1.05, 0.95, 1.05, 0.95, 1.05, 0.95, 1],
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
              src="/logo2.png"
              alt="Mahmoud Saeed Logo"
              width={400}
              height={400}
              priority
              className="rounded-lg "
            
            />
          </motion.div>
        </motion.div>

        {/* Orbiting Dot with 3D effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: '500px', height: '500px' }}
        >
          {/* Orbit path visualization */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-indigo-500/20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* The animated dot - accelerating orbit */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{
                scale: [1, 1.4, 1],
                y: [0, -25, 0],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              {/* Glowing dot container */}
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 3,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {/* Outer glow - brand color */}
                <motion.div 
                  className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
                  style={{ backgroundColor: '#4F46E5' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Middle glow */}
                <motion.div 
                  className="absolute inset-0 w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                  style={{ backgroundColor: '#4F46E5' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Main dot - solid brand color */}
                <motion.div
                  className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    backgroundColor: '#4F46E5',
                    boxShadow: `
                      0 0 15px #4F46E5,
                      0 0 30px rgba(79, 70, 229, 0.7),
                      0 0 45px rgba(79, 70, 229, 0.4)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                >
                
                </motion.div>

                {/* Trail effect */}
                <motion.div
                  className="absolute top-0 left-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm"
                  style={{ 
                    marginLeft: '-15px',
                    backgroundColor: '#4F46E5',
                  }}
                  animate={{
                    opacity: [0.4, 0.2, 0.4],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Speed up animation - faster spinning */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 360, 1080, 2160, 3600],
            }}
            transition={{
              duration: 5,
              times: [0, 0.2, 0.5, 0.75, 1],
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{
                scale: [1, 1.6, 2, 2.5],
                opacity: [0.8, 0.6, 0.4, 0],
              }}
              transition={{
                duration: 5,
                ease: 'easeIn',
              }}
            >
              <div
                className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                style={{ backgroundColor: 'rgba(79, 70, 229, 0.4)' }}
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
          className="text-lg font-light tracking-widest"
          style={{ color: '#4F46E5' }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LOADING
        </motion.p>
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: '#4F46E5',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
