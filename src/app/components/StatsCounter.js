'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { FaBicycle, FaStar, FaUsers, FaAward } from 'react-icons/fa';

export default function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { icon: FaBicycle, value: 500, suffix: '+', label: 'Cycles Sold', gradient: 'from-[#00d4ff] to-cyan-400' },
    { icon: FaStar, value: 5.0, decimals: 1, label: 'Google Rating', gradient: 'from-[#f59e0b] to-yellow-400' },
    { icon: FaUsers, value: 107, suffix: '+', label: 'Happy Reviews', gradient: 'from-[#7c3aed] to-purple-400' },
    { icon: FaAward, value: 3, suffix: '+', label: 'Years Experience', gradient: 'from-[#39ff14] to-green-400' },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#0a0a0a] to-[#1a1a2e]" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 50%, rgba(0,212,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(124,58,237,0.3) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center group"
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} p-[1px] group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center">
                  <stat.icon className="text-2xl text-white" />
                </div>
              </div>
              <h3
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ''}
                  />
                )}
              </h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}