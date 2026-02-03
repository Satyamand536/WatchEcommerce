const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Watch = require('./models/Watch');

dotenv.config();

const listCats = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const cats = await Watch.distinct('category');
    console.log('Unique Categories in DB:', cats);
    
    const luxuryCount = await Watch.countDocuments({ category: 'Luxury' });
    console.log('Count of category "Luxury":', luxuryCount);
    
    const luxuryLowCount = await Watch.countDocuments({ category: 'luxury' });
    console.log('Count of category "luxury" (lowercase):', luxuryLowCount);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listCats();
