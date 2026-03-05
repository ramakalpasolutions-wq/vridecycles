'use client';

import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaDirections,
  FaWhatsapp,
} from 'react-icons/fa';

export default function LocationMap() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#00d4ff] font-semibold text-sm tracking-widest uppercase">
            Find Us
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Visit Our <span className="gradient-text">Store</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedSection direction="left">
            <div className="glass rounded-2xl overflow-hidden h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.032!2d80.4365!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE4JzI0LjEiTiA4MMKwMjYnMTEuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="glass rounded-2xl p-8 h-full">
              <h3
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                V Ride Cycle / EMOTORAD
              </h3>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-[#00d4ff] text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Address</h4>
                    <p className="text-gray-400 mt-1">
                      10/1, 16th Line, opposite Indian Oil Petrol Bunk,
                      Arundelpet, Guntur, Andhra Pradesh 522002
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-[#00d4ff] text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <a
                      href="tel:07386117144"
                      className="text-[#00d4ff] mt-1 block hover:underline"
                    >
                      073861 17144
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-[#00d4ff] text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Working Hours</h4>
                    <p className="text-gray-400 mt-1">
                      Monday - Sunday: 9:00 AM - 9:00 PM
                    </p>
                    <span className="inline-block mt-1 text-[#39ff14] text-sm font-semibold">
                      ● Open Now
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 flex-1 justify-center"
                >
                  <FaDirections />
                  Get Directions
                </a>
                <a
                  href="https://wa.me/917386117144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2 flex-1 justify-center transition-colors"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}