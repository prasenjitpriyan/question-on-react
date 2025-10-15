'use client';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

const Face404 = () => {
  return (
    <main className="relative flex flex-col justify-center items-center min-h-screen p-6 space-y-12 overflow-hidden">
      {/* Animated SVG FACE */}
      <motion.svg
        className="w-56 h-auto text-white"
        viewBox="0 0 320 380"
        width="320"
        height="380"
        initial="hidden"
        animate="visible"
        aria-label="Animated 404 face">
        <motion.g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="25">
          {/* 👀 Eyes */}
          <motion.g
            variants={{
              hidden: { y: 112.5 },
              visible: {
                y: [112.5, 15, 112.5],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                },
              },
            }}>
            {/* Left Eye */}
            <g transform="translate(15, 0)">
              <motion.polyline
                points="37,0 0,120 75,120"
                animate={{ y: [0, 17.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
              <motion.polyline
                points="55,120 55,155"
                strokeDasharray="35 35"
                animate={{
                  y: [0, 17.5, 0],
                  x: [0, -35, 0],
                  strokeDashoffset: [0, 35, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
            </g>

            {/* Right Eye */}
            <g transform="translate(230, 0)">
              <motion.polyline
                points="37,0 0,120 75,120"
                animate={{ y: [0, 17.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
              <motion.polyline
                points="55,120 55,155"
                strokeDasharray="35 35"
                animate={{
                  y: [0, 17.5, 0],
                  x: [0, -35, 0],
                  strokeDashoffset: [0, 35, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
            </g>
          </motion.g>

          {/* 👃 Nose */}
          <motion.rect
            rx="4"
            ry="4"
            x="132.5"
            y="112.5"
            width="55"
            height="155"
            animate={{ y: [112.5, 135, 112.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
          />

          {/* 👄 Mouth */}
          <g strokeDasharray="102 102" transform="translate(65, 334)">
            <motion.path
              d="M 0 30 C 0 30 40 0 95 0"
              strokeDashoffset={-102}
              animate={{ strokeDashoffset: [-102, 0, -102] }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M 95 0 C 150 0 190 30 190 30"
              strokeDashoffset={102}
              animate={{ strokeDashoffset: [102, 0, 102] }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              }}
            />
          </g>
        </motion.g>
      </motion.svg>
      <Button href="/" text="Go Back Home" className="fixed top-20" />
    </main>
  );
};

export default Face404;
