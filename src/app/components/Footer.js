'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaArrowUp,
} from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1a1a2e] border-t border-white/5">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center">
                <FaBolt className="text-white text-xl" />
              </div>
              <div>
                <h3
                  className="text-xl font-bold gradient-text"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  V RIDE
                </h3>
                <p className="text-[10px] text-gray-500 tracking-widest">
                  EMOTORAD E-CYCLES
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your premier destination for EMotorad electric cycles and premium
              bicycles in Guntur, Andhra Pradesh.
            </p>
            <div className="flex gap-3">
              {[FaWhatsapp, FaInstagram, FaFacebook, FaYoutube].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-[#00d4ff] transition-colors"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-bold mb-6 text-lg"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/cycles', label: 'Our Cycles' },
                { href: '/about', label: 'About Us' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00d4ff] transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="text-white font-bold mb-6 text-lg"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                'Electric Cycles',
                'Mountain Bikes',
                'City Bikes',
                'Kids Cycles',
                'Accessories',
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]/50" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold mb-6 text-lg"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#00d4ff] mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  10/1, 16th Line, Arundelpet, Guntur, AP 522002
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#00d4ff] flex-shrink-0" />
                <a
                  href="tel:07386117144"
                  className="text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                >
                  073861 17144
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#00d4ff] flex-shrink-0" />
                <a
                  href="mailto:info@vrideguntur.com"
                  className="text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                >
                  info@vrideguntur.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 V Ride Cycle. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}