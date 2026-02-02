const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Watch name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  originalPrice: {
    type: Number
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex', 'Boys', 'Girls'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // Feature 1: Semantic Tags for Recommendations
  suitableFor: [{
    type: String
  }],
  styleTags: [{
    type: String
  }],
  wristFit: {
    dialSize: { type: Number }, // in mm
    fitCategory: {
      type: String,
      enum: ['Small', 'Medium', 'Large']
    }
  },
  // Feature 3: Human-Language Comparison Helpers
  technicalSpecs: {
    movement: String,
    waterResistance: String,
    caseMaterial: String,
    strapMaterial: String,
    glassType: String
  },
  // Business Logic
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  isLuxury: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 10
  },
  promo: {
    type: String
  }
}, {
  timestamps: true
});

// Index for search optimization
watchSchema.index({ name: 'text', brand: 'text', styleTags: 'text' });

module.exports = mongoose.model('Watch', watchSchema);
