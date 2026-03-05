'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CycleCard from '../components/CycleCard';
import AnimatedSection from '../components/AnimatedSection';
import {
  FaSearch, FaBolt, FaMountain, FaCity,
  FaBicycle, FaSortAmountDown, FaChevronDown,
} from 'react-icons/fa';

// ✅ Custom dark dropdown — no more white browser default
function CustomSelect({ value, onChange, options, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-primary/50 transition-colors min-w-[170px] justify-between"
      >
        <span className="flex items-center gap-2 text-sm">
          {Icon && <Icon className="text-gray-400" />}
          {selected?.label}
        </span>
        <FaChevronDown
          className={`text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-2 w-full min-w-[190px] z-50 rounded-xl overflow-hidden border border-white/10 shadow-xl"
          style={{ background: '#0f0f1a' }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-primary/10 hover:text-primary border-b border-white/5 last:border-0 ${
                value === opt.value
                  ? 'text-primary bg-primary/10 font-medium'
                  : 'text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function CyclesPage() {
  const [cycles, setCycles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: FaBicycle },
    { id: 'electric', label: 'Electric', icon: FaBolt },
    { id: 'mountain', label: 'Mountain', icon: FaMountain },
    { id: 'city', label: 'City', icon: FaCity },
  ];

  const sortOptions = [
    { value: 'featured', label: '⭐ Featured' },
    { value: 'price-low', label: '↑ Price: Low to High' },
    { value: 'price-high', label: '↓ Price: High to Low' },
    { value: 'rating', label: '★ Top Rated' },
    { value: 'name', label: 'A-Z Name' },
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-25000', label: '₹10K – ₹25K' },
    { value: '25000-50000', label: '₹25K – ₹50K' },
    { value: '50000-1000000', label: 'Above ₹50K' },
  ];

  useEffect(() => {
    fetch('/api/cycles')
      .then((res) => res.json())
      .then((data) => {
        setCycles(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = [...cycles];

    if (category !== 'all') {
      result = result.filter((c) => c.category === category);
    }

    if (search) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((c) => c.price >= min && c.price <= max);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFiltered(result);
  }, [search, category, sortBy, priceRange, cycles]);

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="relative py-16 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl font-orbitron font-bold mb-4">
              Our <span className="gradient-text">Cycles</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our complete range of electric and traditional cycles
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filters */}
        <AnimatedSection>
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">

              {/* Search */}
              <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search cycles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* ✅ Custom Sort Dropdown */}
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                icon={FaSortAmountDown}
              />

              {/* ✅ Custom Price Dropdown */}
              <CustomSelect
                value={priceRange}
                onChange={setPriceRange}
                options={priceOptions}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <cat.icon />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing {filtered.length} cycle{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Cycles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cycle, index) => (
            <CycleCard key={cycle._id} cycle={cycle} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🚲</p>
            <p className="text-gray-400 text-xl">No cycles found</p>
            <p className="text-gray-600 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
