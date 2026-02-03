const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Watch = require('./models/Watch');

dotenv.config();

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const luxuryWatches = await Watch.find({ 
      category: 'Luxury', 
      price: { $gte: 2000, $lte: 5000 } 
    });
    
    console.log(`Found ${luxuryWatches.length} luxury watches in the 2000-5000 range:`);
    luxuryWatches.forEach(w => {
      console.log(`- ${w.name} (Brand: ${w.brand}, Price: ₹${w.price}, Category: ${w.category}, isLuxury: ${w.isLuxury})`);
    });
    
    const allLuxury = await Watch.find({ category: 'Luxury' });
    console.log(`Total Luxury watches: ${allLuxury.length}`);
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

verify();
