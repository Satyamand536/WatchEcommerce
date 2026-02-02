const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Watch = require('./models/Watch');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    // Load products from the generated JSON
    const products = require('./merged_products.json');

    await Watch.deleteMany({});
    await Watch.insertMany(products);

    console.log('✅ Data Imported with 100% Gaps Filled + Legacy Restoration!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
