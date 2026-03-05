'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data.filter((r) => r.approved)));
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#00d4ff] font-semibold text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 sm:p-12 text-center"
            >
              <FaQuoteLeft className="text-[#00d4ff]/30 text-5xl mx-auto mb-6" />
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                &ldquo;{reviews[current]?.comment}&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < reviews[current]?.rating
                        ? 'text-[#f59e0b]'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <h4
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {reviews[current]?.name}
              </h4>
              <p className="text-gray-500 text-sm">{reviews[current]?.date}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-[#00d4ff] w-8' : 'bg-gray-600 w-2.5'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}