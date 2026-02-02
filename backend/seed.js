const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Watch = require('./models/Watch');

dotenv.config();

const watches = [
  {
    name: "Precision Master 40",
    brand: "Pre-See-Jan",
    price: 150000,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    gender: "Men",
    category: "Luxury",
    suitableFor: ["Office", "Events"],
    styleTags: ["Minimal", "Modern"],
    wristFit: { dialSize: 40, fitCategory: "Medium" },
    technicalSpecs: { movement: "Automatic", waterResistance: "50m", caseMaterial: "Stainless Steel" },
    isLuxury: true,
    rating: 4.8
  },
  {
    name: "Clarity Sport 44",
    brand: "Pre-See-Jan",
    price: 85000,
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314"],
    gender: "Men",
    category: "Sport",
    suitableFor: ["Sports", "Daily Wear"],
    styleTags: ["Sporty"],
    wristFit: { dialSize: 44, fitCategory: "Large" },
    technicalSpecs: { movement: "Quartz", waterResistance: "200m", caseMaterial: "Titanium" },
    rating: 4.6
  },
  {
    name: "Lady Precision 36",
    brand: "Pre-See-Jan",
    price: 120000,
    images: ["https://images.unsplash.com/photo-1542496658-e33a6d0d50f6"],
    gender: "Women",
    category: "Luxury",
    suitableFor: ["Party", "Events"],
    styleTags: ["Minimal", "Luxury"],
    wristFit: { dialSize: 36, fitCategory: "Small" },
    technicalSpecs: { movement: "Automatic", waterResistance: "30m", caseMaterial: "Rose Gold" },
    isLuxury: true,
    rating: 4.9
  },
  {
    name: "Smart Precision V1",
    brand: "Pre-See-Jan",
    price: 45000,
    images: ["https://images.unsplash.com/photo-1508685096489-7aac29obf693"],
    gender: "Unisex",
    category: "Smart",
    suitableFor: ["Daily Wear", "Sports"],
    styleTags: ["Modern"],
    wristFit: { dialSize: 42, fitCategory: "Medium" },
    technicalSpecs: { movement: "Digital", waterResistance: "IP68", caseMaterial: "Aluminum" },
    rating: 4.5
  },
  {
      name: "Heritage Classic",
      brand: "Pre-See-Jan",
      price: 250000,
      images: ["https://images.unsplash.com/photo-1533139502658-0198f920d8e8"],
      gender: "Men",
      category: "Classic",
      suitableFor: ["Office", "Events"],
      styleTags: ["Vintage", "Luxury"],
      wristFit: { dialSize: 39, fitCategory: "Medium" },
      technicalSpecs: { movement: "manual", waterResistance: "30m", caseMaterial: "Gold" },
      isLuxury: true,
      rating: 5.0
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    await Watch.deleteMany();
    console.log('Cleared existing watches');
    
    await Watch.insertMany(watches);
    console.log('Database seeded with Pre-See-Jan collection');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
