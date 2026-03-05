'use client';

import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaTools,
  FaTruck,
  FaHeadset,
  FaMoneyBillWave,
  FaCertificate,
} from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaCertificate,
      title: 'Authorized Dealer',
      description: 'Official EMotorad authorized dealer in Guntur, Andhra Pradesh',
      gradient: 'from-[#00d4ff] to-cyan-400',
    },
    {
      icon: FaShieldAlt,
      title: 'Warranty Support',
      description: 'Full manufacturer warranty on all electric cycles and batteries',
      gradient: 'from-[#7c3aed] to-purple-400',
    },
    {
      icon: FaTools,
      title: 'Expert Service',
      description: 'Professional servicing and maintenance by trained technicians',
      gradient: 'from-[#f59e0b] to-yellow-400',
    },
    {
      icon: FaTruck,
      title: 'Free Delivery',
      description: 'Free doorstep delivery within Guntur city limits',
      gradient: 'from-[#39ff14] to-green-400',
    },
    {
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Competitive pricing with easy EMI options available',
      gradient: 'from-[#ff1493] to-pink-400',
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Round the clock customer support for all your queries',
      gradient: 'from-orange-500 to-red-400',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#00d4ff] font-semibold text-sm tracking-widest uppercase">
            Why V Ride
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide the best cycling experience in Guntur with our premium
            products and services
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 group cursor-pointer h-full"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-[1px] mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full rounded-xl bg-[#0a0a0a] flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}