'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBolt, FaArrowRight, FaPlay } from 'react-icons/fa';
import { useEffect, useState, useMemo } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ✅ Hydration-safe particles
  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        left: `${((i * 47.3 + i * i * 3.7 + 11.7) % 100).toFixed(2)}%`,
        animationDelay: `${((i * 1.3 + 0.5) % 10).toFixed(2)}s`,
        animationDuration: `${(((i * 2.7 + 10) % 10) + 10).toFixed(2)}s`,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-bg">

      {/* Particles */}
      <div className="particles">
        {particles.map((style, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full px-4 py-2 mb-6"
            >
              <FaBolt className="text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium">
                Cycles for Every Age — 1 to 60 Years 🚴
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="text-white">CYCLES FOR</span>
              <br />
              <span className="gradient-text">EVERYONE</span>
              <br />
              <span className="text-white">EVERY AGE</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
            >
              From kids&apos; first bikes to adult electric cycles —{' '}
              <span className="text-[#00d4ff] font-semibold">V Ride</span> is
              Guntur&apos;s one-stop destination for all types of cycles, for
              every age group from{' '}
              <span className="text-[#00d4ff] font-semibold">1 to 60 years</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/cycles"
                className="btn-primary px-8 py-4 rounded-full font-bold text-white flex items-center gap-3 text-lg"
              >
                Explore Cycles
                <FaArrowRight />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-3 text-lg"
              >
                <FaPlay className="text-[#00d4ff]" />
                Visit Store
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-8 mt-12"
            >
              {[
                { value: '500+', label: 'Cycles Sold' },
                { value: 'All Ages', label: '1 to 60 Years' },
                { value: '5.0 ⭐', label: 'Google Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3
                    className="text-3xl font-bold text-[#00d4ff]"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Cycle Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">

              {/* Glow */}
              <motion.div
                className="absolute inset-0 m-auto w-[400px] h-[400px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Rotating Rings */}
              <motion.div
                className="absolute inset-0 m-auto w-[350px] h-[350px] rounded-full border border-[#00d4ff]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full border border-[#7c3aed]/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />

              {/* Main Cycle Icon */}
              <motion.div
                className="relative z-10 float-animation"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                }}
              >
                <div className="w-[450px] h-[450px] mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="text-[120px] mb-4"
                      animate={{ rotateY: [0, 360] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      🚴
                    </motion.div>
                    <div className="glass rounded-2xl p-4 mt-4">
                      <p
                        className="text-[#00d4ff] text-sm font-semibold"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        All Types of Cycles
                      </p>
                      <p className="text-2xl font-bold text-white mt-1">
                        Starting ₹2,999
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Kids • Adults • Electric • Mountain
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1 — Kids */}
              <motion.div
                className="absolute top-10 right-10 glass rounded-xl p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs text-gray-400">Kids Cycles</p>
                <p
                  className="text-lg font-bold text-[#00d4ff]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  1–10 Yrs
                </p>
              </motion.div>

              {/* Floating Badge 2 — Electric */}
              <motion.div
                className="absolute bottom-20 left-0 glass rounded-xl p-3"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-xs text-gray-400">Electric Cycles</p>
                <p
                  className="text-lg font-bold text-[#39ff14]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  ⚡ E-Bikes
                </p>
              </motion.div>

              {/* Floating Badge 3 — Adults */}
              <motion.div
                className="absolute top-1/2 left-10 glass rounded-xl p-3"
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <p className="text-xs text-gray-400">Adults</p>
                <p
                  className="text-lg font-bold text-[#f59e0b]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  MTB & City
                </p>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#00d4ff]/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

    </section>
  );
}
