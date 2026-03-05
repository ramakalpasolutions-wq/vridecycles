import mongoose from 'mongoose';

const CycleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'electric' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String },
    features: [String],
    specs: {
      motor: String,
      battery: String,
      range: String,
      speed: String,
      weight: String,
      brakes: String,
      frame: String,
      wheel: String,
    },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isElectric: { type: Boolean, default: true },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Cycle || mongoose.model('Cycle', CycleSchema);
