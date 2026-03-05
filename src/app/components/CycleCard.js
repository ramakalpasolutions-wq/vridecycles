'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaBolt, FaShoppingCart } from 'react-icons/fa';

export default function CycleCard({ cycle, index = 0 }) {
  const discount = Math.round(
    ((cycle.originalPrice - cycle.price) / cycle.originalPrice) * 100
  );

  const hasImage = cycle.images && cycle.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/cycles/${cycle.id}`}>
        <div className="cycle-card glass rounded-2xl overflow-hidden group cursor-pointer">
          
          {/* Image */}
          <div className="relative h-56 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] overflow-hidden">
            {hasImage ? (
              <Image
                src={cycle.images[0]}
                alt={cycle.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                {cycle.isElectric ? '⚡🚲' : '🚲'}
              </div>
            )}

            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {cycle.isElectric && (
                <span className="bg-[#00d4ff]/90 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                  <FaBolt /> Electric
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#ff1493]/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <span className="btn-primary px-6 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2">
                View Details <FaShoppingCart />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(cycle.rating) ? 'text-[#f59e0b]' : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">({cycle.reviews})</span>
            </div>

            <h3
              className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {cycle.name}
            </h3>

            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {cycle.description}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <span
                className="text-2xl font-bold text-[#00d4ff]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                ₹{cycle.price.toLocaleString()}
              </span>
              {cycle.originalPrice > cycle.price && (
                <span className="text-gray-500 line-through text-sm">
                  ₹{cycle.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {cycle.isElectric && (
              <div className="flex gap-3 mt-3">
                <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">
                  {cycle.specs?.range}
                </span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">
                  {cycle.specs?.speed}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
