'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaStar, FaBolt, FaBatteryFull, FaTachometerAlt,
  FaWeight, FaCog, FaArrowLeft, FaPhone, FaWhatsapp,
  FaShieldAlt, FaTruck, FaTools, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import AnimatedSection from '../../components/AnimatedSection';

// ✅ Icon map for common spec keys
const SPEC_ICONS = {
  motor: FaBolt,
  battery: FaBatteryFull,
  range: FaTachometerAlt,
  speed: FaTachometerAlt,
  weight: FaWeight,
  brakes: FaCog,
  frame: FaCog,
  wheel: FaCog,
  gears: FaCog,
  suspension: FaCog,
  tyres: FaCog,
  fork: FaCog,
  chainset: FaCog,
};

// ✅ Safely convert MongoDB Map or plain object to entries array
function getSpecEntries(specs) {
  if (!specs) return [];
  if (specs instanceof Map) return [...specs.entries()];
  if (typeof specs === 'object') {
    return Object.entries(specs).filter(([, v]) => v && v.toString().trim() !== '');
  }
  return [];
}

export default function CycleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`/api/cycles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCycle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!cycle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😞</p>
          <h2 className="text-2xl font-bold text-white mb-4">Cycle Not Found</h2>
          <button onClick={() => router.back()} className="btn-primary px-6 py-3 rounded-xl text-white">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discount = cycle.originalPrice > cycle.price
    ? Math.round(((cycle.originalPrice - cycle.price) / cycle.originalPrice) * 100)
    : 0;

  const hasImages = cycle.images?.length > 0 &&
    cycle.images.some((img) => img.startsWith('http'));

  const specEntries = getSpecEntries(cycle.specs);

  const prevImage = () =>
    setActiveImage((prev) => (prev === 0 ? cycle.images.length - 1 : prev - 1));
  const nextImage = () =>
    setActiveImage((prev) => (prev === cycle.images.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <FaArrowLeft /> Back to Cycles
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <AnimatedSection direction="left">
            <div className="glass rounded-3xl overflow-hidden">

              <div className="relative h-[400px] sm:h-[500px] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] overflow-hidden">
                {hasImages ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={cycle.images[activeImage]}
                          alt={`${cycle.name} - image ${activeImage + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {cycle.images.length > 1 && (
                      <>
                        <button onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 text-white rounded-full p-2 transition-colors">
                          <FaChevronLeft />
                        </button>
                        <button onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 text-white rounded-full p-2 transition-colors">
                          <FaChevronRight />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                          {cycle.images.map((_, i) => (
                            <button key={i} onClick={() => setActiveImage(i)}
                              className={`h-2 rounded-full transition-all ${
                                i === activeImage ? 'bg-primary w-5' : 'bg-white/40 w-2'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div className="text-[150px]"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                      {cycle.isElectric ? '⚡🚲' : '🚲'}
                    </motion.div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  {cycle.isElectric && (
                    <span className="bg-primary/90 text-white text-sm px-4 py-2 rounded-full font-semibold flex items-center gap-1">
                      <FaBolt /> Electric
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-pink-500/90 text-white text-sm px-4 py-2 rounded-full font-semibold">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {hasImages && cycle.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
                  {cycle.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImage ? 'border-primary scale-105' : 'border-white/10 hover:border-white/30'
                      }`}>
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Details */}
          <AnimatedSection direction="right">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(cycle.rating) ? 'text-yellow-400' : 'text-gray-600'} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  {cycle.rating} ({cycle.reviews} reviews)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-orbitron font-bold text-white mb-4">
                {cycle.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-orbitron font-bold text-primary">
                  ₹{cycle.price.toLocaleString()}
                </span>
                {cycle.originalPrice > cycle.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{cycle.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-green-500/10 text-green-400 text-sm px-3 py-1 rounded-full font-semibold">
                    Save ₹{(cycle.originalPrice - cycle.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {cycle.description}
              </p>

              {/* Features */}
              {cycle.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-3 font-rajdhani">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {cycle.features.map((feature, i) => (
                      <span key={i} className="bg-primary/10 text-primary text-sm px-4 py-2 rounded-full border border-primary/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2 mb-8">
                <span className={`w-3 h-3 rounded-full ${cycle.inStock ? 'bg-green-400' : 'bg-red-500'}`} />
                <span className={cycle.inStock ? 'text-green-400' : 'text-red-500'}>
                  {cycle.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="tel:07386117144"
                  className="btn-primary px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2 text-lg">
                  <FaPhone /> Call to Order
                </a>
                <a href="https://wa.me/917386117144" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2 text-lg transition-colors">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: FaShieldAlt, label: 'Warranty' },
                  { icon: FaTruck, label: 'Free Delivery' },
                  { icon: FaTools, label: 'Free Service' },
                ].map((badge, i) => (
                  <div key={i} className="glass rounded-xl p-3 text-center">
                    <badge.icon className="text-primary mx-auto mb-1" />
                    <p className="text-xs text-gray-400">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ✅ Specifications — shown for ALL cycles, only filled specs */}
        {specEntries.length > 0 && (
          <AnimatedSection className="mt-16">
            <h2 className="text-3xl font-orbitron font-bold mb-8">
              <span className="gradient-text">Specifications</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specEntries.map(([key, value], i) => {
                const Icon = SPEC_ICONS[key] || FaCog;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-6 group hover:border-primary/30 transition-all"
                  >
                    <Icon className="text-primary text-2xl mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-500 text-sm capitalize mb-1">{key}</p>
                    <p className="text-white font-bold font-rajdhani text-lg">{value}</p>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        )}

      </div>
    </div>
  );
}
