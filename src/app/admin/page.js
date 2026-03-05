'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBicycle,
  FaStar,
  FaEnvelope,
  FaBolt,
  FaPlus,
  FaEye,
  FaArrowUp,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCycles: 0,
    electricCycles: 0,
    totalReviews: 0,
    totalContacts: 0,
  });
  const [recentCycles, setRecentCycles] = useState([]);

  useEffect(() => {
    // Fetch cycles
    fetch('/api/cycles')
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          totalCycles: data.length,
          electricCycles: data.filter((c) => c.isElectric).length,
        }));
        setRecentCycles(data.slice(-5).reverse());
      });

    // Fetch reviews
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, totalReviews: data.length }));
      });

    // Fetch contacts
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({ ...prev, totalContacts: data.length }));
      });
  }, []);

  const statCards = [
    {
      icon: FaBicycle,
      label: 'Total Cycles',
      value: stats.totalCycles,
      color: 'from-primary to-cyan-400',
      link: '/admin/cycles',
    },
    {
      icon: FaBolt,
      label: 'Electric Cycles',
      value: stats.electricCycles,
      color: 'from-secondary to-purple-400',
      link: '/admin/cycles',
    },
    {
      icon: FaStar,
      label: 'Reviews',
      value: stats.totalReviews,
      color: 'from-accent to-yellow-400',
      link: '/admin/reviews',
    },
    {
      icon: FaEnvelope,
      label: 'Inquiries',
      value: stats.totalContacts,
      color: 'from-neon-green to-green-400',
      link: '/admin',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
        </div>
        <Link
          href="/admin/cycles/add"
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
        >
          <FaPlus />
          Add New Cycle
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.link}>
              <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <FaArrowUp className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-3xl font-orbitron font-bold text-white">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Cycles */}
      <div className="glass rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white font-rajdhani">
            Recent Cycles
          </h2>
          <Link
            href="/admin/cycles"
            className="text-primary text-sm hover:underline flex items-center gap-1"
          >
            <FaEye /> View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                  Price
                </th>
                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCycles.map((cycle) => (
                <tr
                  key={cycle.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">
                    {cycle.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                      {cycle.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-primary font-orbitron font-bold">
                    ₹{cycle.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}