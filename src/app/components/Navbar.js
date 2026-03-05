'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars, FaTimes, FaPhone,
  FaMapMarkerAlt, FaClock, FaBolt,
} from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cycles', label: 'Cycles' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-[#050510] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaPhone className="text-[#00d4ff] text-xs" />
              073861 17144
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#00d4ff] text-xs" />
              Arundelpet, Guntur
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-[#00d4ff] text-xs" />
            Open Today: 9 AM – 9 PM
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#0a0a0a] border-white/10 shadow-lg shadow-black/50'
            : 'bg-[#0a0a0a] border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center">
                  <FaBolt className="text-white text-xl" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] opacity-0 blur-md group-hover:opacity-50 transition-opacity" />
              </motion.div>
              <div>
                <h1
                  className="text-2xl font-bold gradient-text"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  V RIDE
                </h1>
                <p
                  className="text-[10px] text-gray-500 tracking-widest -mt-1"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  EMOTORAD E-CYCLES
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    pathname === link.href
                      ? 'text-[#00d4ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="btn-primary px-6 py-2.5 rounded-full font-semibold text-sm text-white flex items-center gap-2"
              >
                <FaPhone className="text-xs" />
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0d0d0d] border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        pathname === link.href
                          ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block btn-primary text-center px-4 py-3 rounded-lg font-semibold text-white mt-4"
                  >
                    📞 Book Now — 073861 17144
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
