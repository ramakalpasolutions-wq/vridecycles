'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBolt,
  FaSearch,
} from 'react-icons/fa';

export default function AdminCyclesPage() {
  const [cycles, setCycles] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCycles = () => {
    fetch('/api/cycles')
      .then((res) => res.json())
      .then(setCycles);
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/cycles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success(`"${name}" deleted successfully!`);
        fetchCycles();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const filtered = cycles.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            All Cycles
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your cycle inventory ({cycles.length} total)
          </p>
        </div>
        <Link
          href="/admin/cycles/add"
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
        >
          <FaPlus />
          Add New Cycle
        </Link>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search cycles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />
        </div>
      </div>

      {/* Cycles Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">
                  Cycle
                </th>
                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">
                  Featured
                </th>
                <th className="text-center py-4 px-6 text-gray-400 text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cycle, i) => (
                <motion.tr
                  key={cycle.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {cycle.isElectric ? '⚡🚲' : '🚲'}
                      </span>
                      <div>
                        <p className="text-white font-medium">{cycle.name}</p>
                        <p className="text-gray-500 text-xs">
                          {cycle.isElectric && (
                            <span className="flex items-center gap-1">
                              <FaBolt className="text-primary" />
                              Electric
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                      {cycle.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-primary font-orbitron font-bold">
                      ₹{cycle.price.toLocaleString()}
                    </p>
                    {cycle.originalPrice > cycle.price && (
                      <p className="text-gray-500 text-xs line-through">
                        ₹{cycle.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        cycle.inStock
                          ? 'bg-neon-green/10 text-neon-green'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {cycle.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        cycle.isFeatured
                          ? 'bg-accent/10 text-accent'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {cycle.isFeatured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/cycles/edit/${cycle.id}`}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(cycle.id, cycle.name)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cycles found</p>
          </div>
        )}
      </div>
    </div>
  );
}