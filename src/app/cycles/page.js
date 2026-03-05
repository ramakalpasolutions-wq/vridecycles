'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CycleCard from '../components/CycleCard';
import AnimatedSection from '../components/AnimatedSection';
import {
  FaSearch,
  FaBolt,
  FaMountain,
  FaCity,
  FaBicycle,
  FaFilter,
  FaSortAmountDown,
} from 'react-icons/fa';

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

    // Category filter
    if (category !== 'all') {
      result = result.filter((c) => c.category === category);
    }

    // Search filter
    if (search) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((c) => c.price >= min && c.price <= max);
    }

    // Sort
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
        result.sort((a, b) => b.isFeatured - a.isFeatured);
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* Price Range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-25000">₹10K - ₹25K</option>
                <option value="25000-50000">₹25K - ₹50K</option>
                <option value="50000-100000">₹50K+</option>
              </select>
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
            <CycleCard key={cycle.id} cycle={cycle} index={index} />
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