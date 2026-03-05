'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaBolt, FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      toast.error('Login failed!');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 sm:p-12 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
            <FaBolt className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-orbitron font-bold gradient-text">
            V RIDE ADMIN
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Username</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                placeholder="Enter password"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <FaSignInAlt />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-500 text-xs text-center">
            Demo Credentials: <span className="text-primary">admin</span> /{' '}
            <span className="text-primary">vride@2024</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}