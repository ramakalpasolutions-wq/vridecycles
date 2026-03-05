'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import LocationMap from '../components/LocationMap';
import toast from 'react-hot-toast';
import {
  FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaChevronDown,
} from 'react-icons/fa';

// ✅ Custom dark dropdown
function CustomSelect({ value, onChange, options, placeholder }) {
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
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
      >
        <span className={`text-sm ${!selected ? 'text-gray-500' : 'text-white'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <FaChevronDown
          className={`text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl overflow-hidden border border-white/10 shadow-xl"
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

const subjectOptions = [
  { value: 'inquiry', label: '🛒 Product Inquiry' },
  { value: 'test-ride', label: '🚴 Book Test Ride' },
  { value: 'service', label: '🔧 Service Request' },
  { value: 'emi', label: '💳 EMI Enquiry' },
  { value: 'complaint', label: '⚠️ Complaint' },
  { value: 'other', label: '💬 Other' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Message sent successfully! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong!');
    }

    setSending(false);
  };

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Get In Touch
            </span>
            <h1 className="text-5xl sm:text-6xl font-orbitron font-bold mt-3 mb-6">
              <span className="gradient-text">Contact</span> Us
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? Want to test ride? Visit our store or drop us a message!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaPhone,
                title: 'Call Us',
                value: '073861 17144',
                link: 'tel:07386117144',
                color: 'from-primary to-cyan-400',
              },
              {
                icon: FaWhatsapp,
                title: 'WhatsApp',
                value: 'Chat with us',
                link: 'https://wa.me/917386117144',
                color: 'from-green-500 to-green-400',
              },
              {
                icon: FaMapMarkerAlt,
                title: 'Visit Us',
                value: 'Arundelpet, Guntur',
                link: '#',
                color: 'from-secondary to-purple-400',
              },
              {
                icon: FaClock,
                title: 'Working Hours',
                value: '9 AM - 9 PM Daily',
                link: '#',
                color: 'from-accent to-yellow-400',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 text-center block"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="text-xl text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.value}</p>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-rajdhani">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* ✅ Custom dark subject dropdown */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                  <CustomSelect
                    value={formData.subject}
                    onChange={(val) => setFormData({ ...formData, subject: val })}
                    placeholder="Select a subject"
                    options={subjectOptions}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white resize-none focus:border-primary focus:outline-none transition-colors"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <LocationMap />
    </div>
  );
}
