'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import StatsCounter from '../components/StatsCounter';
import {
  FaBolt,
  FaHandshake,
  FaLeaf,
  FaHeart,
  FaRoad,
  FaMedal,
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              About Us
            </span>
            <h1 className="text-5xl sm:text-6xl font-orbitron font-bold mt-3 mb-6">
              The <span className="gradient-text">V Ride</span> Story
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Founded in Guntur, Andhra Pradesh, V Ride is the region&apos;s
              leading destination for premium electric cycles and bicycles. As
              an authorized EMotorad dealer, we bring cutting-edge electric
              mobility to the heart of Andhra Pradesh.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="glass rounded-2xl p-8 h-full">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center mb-6">
                  <FaRoad className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-rajdhani">
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To make electric mobility accessible to everyone in Guntur and
                  beyond. We believe in a greener future where cycling is not
                  just exercise but a lifestyle. Our mission is to provide the
                  best electric cycles at the best prices with exceptional
                  after-sales service.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="glass rounded-2xl p-8 h-full">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-secondary to-purple-400 flex items-center justify-center mb-6">
                  <FaLeaf className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-rajdhani">
                  Our Vision
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To become the #1 electric cycle destination in Andhra Pradesh.
                  We envision a future where every household in Guntur owns an
                  electric cycle, contributing to a cleaner and healthier city
                  for generations to come.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold">
              Our <span className="gradient-text">Values</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaHeart,
                title: 'Customer First',
                desc: 'Every decision we make starts with our customers. Your satisfaction is our priority.',
                color: 'from-red-500 to-pink-500',
              },
              {
                icon: FaMedal,
                title: 'Quality Assured',
                desc: 'We only sell products we believe in. Every cycle is tested and certified.',
                color: 'from-accent to-yellow-400',
              },
              {
                icon: FaHandshake,
                title: 'Trust & Transparency',
                desc: 'No hidden costs, no misleading claims. What you see is what you get.',
                color: 'from-primary to-cyan-400',
              },
              {
                icon: FaLeaf,
                title: 'Eco Friendly',
                desc: 'We are committed to promoting green transportation solutions.',
                color: 'from-neon-green to-green-400',
              },
              {
                icon: FaBolt,
                title: 'Innovation',
                desc: 'We stay updated with the latest in electric cycle technology.',
                color: 'from-secondary to-purple-400',
              },
              {
                icon: FaRoad,
                title: 'Community',
                desc: 'Building a cycling community in Guntur through events and rides.',
                color: 'from-orange-500 to-red-400',
              },
            ].map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-8 text-center h-full"
                >
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
                  >
                    <value.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />
    </div>
  );
}