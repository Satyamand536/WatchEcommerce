const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Watch = require('./models/Watch');

dotenv.config();

const finalCheck = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check OccasionShop 'Luxury' section matching
    const curatedLuxury = await Watch.find({ 
      isLuxury: true, 
      suitableFor: 'Events' 
    });
    
    console.log(`Curated Luxury matches (Events): ${curatedLuxury.length}`);
    const newWatchesCount = curatedLuxury.filter(w => [1009, 1010, 1011, 1012, 1013, 1014].includes(w.id)).length;
    // Wait, DB watches don't have 'id', they have 'name'.
    const newNames = ["Rolex Oyster Lite Edition", "Omega De Ville Mini", "Cartier Ballon Entry", "Tag Heuer Formula Lite", "IWC Pilot Minimalist", "Patek Philippe Elegance"];
    const foundNew = curatedLuxury.filter(w => newNames.includes(w.name));
    
    console.log(`New Luxury watches found in 'Events' section: ${foundNew.length}`);
    
    // Check Price Range in Global Search
    const priceRangeWatches = await Watch.find({
      category: 'Luxury',
      price: { $gte: 2000, $lte: 5000 }
    });
    console.log(`Luxury watches in 2000-5000 range: ${priceRangeWatches.length}`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

finalCheck();
