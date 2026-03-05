'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { FaSave, FaArrowLeft, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';

// ✅ All possible spec fields
const ALL_SPECS = [
  'motor', 'battery', 'range', 'speed', 'weight',
  'brakes', 'frame', 'wheel', 'gears', 'suspension',
  'saddle', 'handlebar', 'chainset', 'pedals', 'fork',
  'tyres', 'colour', 'warranty',
];

export default function AddCyclePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [uploading, setUploading] = useState(false);

  // ✅ Specs stored as { key, value } pairs — only filled ones saved
  const [specRows, setSpecRows] = useState([{ key: '', value: '' }]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'electric',
    price: '',
    originalPrice: '',
    description: '',
    features: [],
    rating: 4.5,
    reviews: 0,
    inStock: true,
    isFeatured: false,
    isElectric: true,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Spec row handlers
  const handleSpecRowChange = (index, field, value) => {
    setSpecRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addSpecRow = () => {
    setSpecRows((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeSpecRow = (index) => {
    setSpecRows((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: data }
        );
        const result = await res.json();
        if (result.secure_url) uploadedUrls.push(result.secure_url);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
    if (uploadedUrls.length) toast.success(`${uploadedUrls.length} image(s) uploaded!`);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // ✅ Only save specs that have both key and value filled
    const specs = {};
    specRows.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) {
        specs[key.trim().toLowerCase()] = value.trim();
      }
    });

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        specs,
      };

      const res = await fetch('/api/cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Cycle added successfully!');
        router.push('/admin/cycles');
      } else {
        toast.error('Failed to add cycle');
      }
    } catch {
      toast.error('Something went wrong!');
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors">
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">Add New Cycle</h1>
          <p className="text-gray-500 mt-1">Fill in the details to add a new cycle</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Basic Info */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 font-rajdhani">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Cycle Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="e.g., Hero Sprint 26T" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    <option value="electric">Electric</option>
                    <option value="mountain">Mountain</option>
                    <option value="city">City</option>
                    <option value="kids">Kids</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="road">Road</option>
                    <option value="bmx">BMX</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Rating</label>
                  <input type="number" name="rating" step="0.1" min="0" max="5" value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Selling Price (₹) *</label>
                  <input type="number" name="price" required value={formData.price} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                    placeholder="29999" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Original Price (₹)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                    placeholder="34999" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description *</label>
                <textarea name="description" required rows={4} value={formData.description} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white resize-none"
                  placeholder="Describe the cycle..." />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-gray-400 text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-gray-400 text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isElectric" checked={formData.isElectric} onChange={handleChange} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-gray-400 text-sm">Electric</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">

            {/* Image Upload */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-6 font-rajdhani">Cycle Images</h2>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                <FaUpload className="text-2xl text-gray-400 mb-2" />
                <span className="text-gray-400 text-sm">
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                </span>
                <span className="text-gray-600 text-xs mt-1">PNG, JPG, WEBP supported</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {formData.images.map((url, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden aspect-square">
                      <Image src={url} alt={`Cycle image ${i + 1}`} fill className="object-cover" sizes="120px" />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-6 font-rajdhani">Features</h2>
              <div className="flex gap-2 mb-4">
                <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="e.g., Shimano 21-speed gears" />
                <button type="button" onClick={addFeature}
                  className="px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <FaPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, i) => (
                  <span key={i} className="bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    {feature}
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300">
                      <FaTimes size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ✅ Dynamic Specifications */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-2 font-rajdhani">Specifications</h2>
              <p className="text-gray-500 text-xs mb-6">Only filled specs will be shown to customers</p>

              <div className="space-y-3">
                {specRows.map((row, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    {/* Key — dropdown or custom */}
                    <select
                      value={row.key}
                      onChange={(e) => handleSpecRowChange(i, 'key', e.target.value)}
                      className="w-2/5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm capitalize"
                    >
                      <option value="">Select spec</option>
                      {ALL_SPECS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                      <option value="custom">+ Custom</option>
                    </select>

                    {/* If custom, show text input for key */}
                    {row.key === 'custom' ? (
                      <input
                        type="text"
                        placeholder="Spec name"
                        onChange={(e) => handleSpecRowChange(i, 'key', e.target.value)}
                        className="w-2/5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                      />
                    ) : (
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => handleSpecRowChange(i, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                      />
                    )}

                    {/* Value for custom key */}
                    {row.key === 'custom' && (
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => handleSpecRowChange(i, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                      />
                    )}

                    <button type="button" onClick={() => removeSpecRow(i)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0">
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <button type="button" onClick={addSpecRow}
                className="mt-4 flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors">
                <FaPlus size={12} /> Add Specification
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex gap-4">
          <motion.button type="submit" disabled={saving || uploading}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn-primary px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2 disabled:opacity-50">
            {saving ? 'Saving...' : <><FaSave /> Save Cycle</>}
          </motion.button>
          <button type="button" onClick={() => router.back()}
            className="px-8 py-4 rounded-xl glass text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
