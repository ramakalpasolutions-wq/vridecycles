'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaTachometerAlt,
  FaBicycle,
  FaPlus,
  FaStar,
  FaEnvelope,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
    { href: '/admin/cycles', label: 'All Cycles', icon: FaBicycle },
    { href: '/admin/cycles/add', label: 'Add Cycle', icon: FaPlus },
    { href: '/admin/reviews', label: 'Reviews', icon: FaStar },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-dark-light border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <FaBolt className="text-white" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-white text-sm">
              V RIDE
            </h2>
            <p className="text-[10px] text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
              pathname === link.href
                ? 'active bg-primary/10 text-primary border-l-3 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <link.icon />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
        >
          <FaHome />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}