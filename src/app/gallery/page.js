'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { FaTimes, FaExpand } from 'react-icons/fa';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { id: 1, emoji: '⚡🚲', title: 'EMotorad T-Rex+', category: 'Electric' },
    { id: 2, emoji: '🚴‍♂️', title: 'Mountain Adventure', category: 'Rides' },
    { id: 3, emoji: '🏪', title: 'Our Store', category: 'Store' },
    { id: 4, emoji: '🔧', title: 'Service Center', category: 'Service' },
    { id: 5, emoji: '🚲', title: 'City Cruiser', category: 'Cycles' },
    { id: 6, emoji: '⚡🏔️', title: 'Off-Road Electric', category: 'Electric' },
    { id: 7, emoji: '👨‍👩‍👧‍👦', title: 'Happy Customers', category: 'People' },
    { id: 8, emoji: '🏆', title: 'Awards & Recognition', category: 'Achievement' },
    { id: 9, emoji: '🌆', title: 'Evening Rides', category: 'Rides' },
    { id: 10, emoji: '🔋', title: 'Battery Tech', category: 'Electric' },
    { id: 11, emoji: '🛤️', title: 'Trail Riding', category: 'Rides' },
    { id: 12, emoji: '🎉', title: 'Grand Opening', category: 'Events' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Gallery
            </span>
            <h1 className="text-5xl sm:text-6xl font-orbitron font-bold mt-3 mb-6">
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-gray-400 text-lg">
              A glimpse into the V Ride experience
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="glass rounded-2xl overflow-hidden cursor-pointer group aspect-square flex flex-col items-center justify-center p-6"
                >
                  <motion.span
                    className="text-6xl mb-3 group-hover:scale-125 transition-transform"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    {item.emoji}
                  </motion.span>
                  <h3 className="text-white font-semibold text-center text-sm">
                    {item.title}
                  </h3>
                  <span className="text-primary text-xs mt-1">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaExpand className="text-primary text-xl" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="glass rounded-3xl p-12 max-w-lg w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
              >
                <FaTimes />
              </button>
              <span className="text-[100px] block mb-4">
                {selectedImage.emoji}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <span className="text-primary">{selectedImage.category}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}