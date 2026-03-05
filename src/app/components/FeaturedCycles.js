'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import CycleCard from './CycleCard';
import { FaBolt, FaMountain, FaCity, FaBicycle } from 'react-icons/fa';

export default function FeaturedCycles() {
  const [cycles, setCycles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filtered, setFiltered] = useState([]);

  const categories = [
    { id: 'all', label: 'All Cycles', icon: FaBicycle },
    { id: 'electric', label: 'Electric', icon: FaBolt },
    { id: 'mountain', label: 'Mountain', icon: FaMountain },
    { id: 'city', label: 'City', icon: FaCity },
  ];

  useEffect(() => {
    fetch('/api/cycles')
      .then((res) => res.json())
      .then((data) => {
        setCycles(data);
        setFiltered(data.filter((c) => c.isFeatured));
      });
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFiltered(cycles.filter((c) => c.isFeatured));
    } else {
      setFiltered(
        cycles.filter((c) => c.category === activeCategory && c.isFeatured)
      );
    }
  }, [activeCategory, cycles]);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#00d4ff] font-semibold text-sm tracking-widest uppercase">
            Our Collection
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="gradient-text">Featured</span>{' '}
            <span className="text-white">Cycles</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our handpicked selection of premium electric and traditional
            cycles
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'btn-primary text-white shadow-lg shadow-[#00d4ff]/30'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <cat.icon />
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cycle, index) => (
            <CycleCard key={cycle._id} cycle={cycle} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No cycles found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}