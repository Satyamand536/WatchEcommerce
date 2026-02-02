const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Watch = require('../models/Watch');

/**
 * @route GET /api/watches
 * @desc  Get all watches with advanced filtering
 */
router.get('/', async (req, res) => {
  try {
    const { keyword, category, gender, minPrice, maxPrice, sort } = req.query;
    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (category) query.category = category;
    if (gender && gender !== 'Unisex') query.gender = gender;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let watchesQuery = Watch.find(query);

    if (sort === 'price_asc') watchesQuery = watchesQuery.sort('price');
    if (sort === 'price_desc') watchesQuery = watchesQuery.sort('-price');
    if (sort === 'newest') watchesQuery = watchesQuery.sort('-createdAt');

    const watches = await watchesQuery;
    res.json(watches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /api/watches/:id
 * @desc  Get single watch by ID
 */
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Invalid Piece Identifier' });
    }
    const watch = await Watch.findById(req.params.id);
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' });
    }
    res.json(watch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /api/watches/recommend
 * @desc  Rule-based recommendation engine for Wrist-Fit & Lifestyle
 */
router.post('/recommend', async (req, res) => {
  try {
    const { wristSize, usage, style, budget } = req.body;
    
    // 1. Fetch relevant watches within budget
    const watches = await Watch.find({
      price: { $lte: budget || 10000000 }
    });

    const recommendations = watches.map(watch => {
      let score = 0;
      const reasons = [];

      // Wrist Fit Scoring
      // Small: < 38mm, Medium: 38-42mm, Large: > 42mm
      const dial = watch.wristFit.dialSize;
      if (wristSize === 'Small' && dial < 38) {
        score += 30;
        reasons.push(`Perfect dial size (${dial}mm) for a slimmer wrist.`);
      } else if (wristSize === 'Medium' && dial >= 38 && dial <= 42) {
        score += 30;
        reasons.push(`Standard ${dial}mm dial offers a balanced presence.`);
      } else if (wristSize === 'Large' && dial > 42) {
        score += 30;
        reasons.push(`Bold ${dial}mm case matches a larger wrist profile.`);
      } else {
        score += 15; // Partial match if not perfect size but wearable
      }

      // Usage Match
      if (watch.suitableFor.includes(usage)) {
        score += 40;
        reasons.push(`Engineered for ${usage.toLowerCase()} with durable materials.`);
      }

      // Style Match
      if (watch.styleTags.includes(style)) {
        score += 30;
        reasons.push(`Matches your ${style.toLowerCase()} aesthetic preference.`);
      }

      return {
        ...watch.toObject(),
        matchScore: score,
        recommendationReason: reasons.join(' ')
      };
    });

    // Sort by score and filter out low confidence (optional)
    const topMatches = recommendations
      .filter(r => r.matchScore >= 60)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(topMatches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /api/watches/occasion/:occasion
 * @desc  Occasion-first shopping curated collections
 */
router.get('/occasion/:occasion', async (req, res) => {
  try {
    const { occasion } = req.params;
    let query = {};

    switch(occasion.toLowerCase()) {
      case 'office':
        query = { suitableFor: 'Office', styleTags: 'Minimal' };
        break;
      case 'luxury':
        query = { isLuxury: true, suitableFor: 'Events' };
        break;
      case 'gifting':
        query = { rating: { $gte: 4.7 } }; // Highly rated items make best gifts
        break;
      case 'sport':
        query = { category: 'Sport', suitableFor: 'Sports' };
        break;
      default:
        query = { suitableFor: occasion };
    }

    const watches = await Watch.find(query).limit(10);
    res.json(watches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
