const fs = require('fs');

// Simulate the filtering logic from WatchPage.jsx
const watches = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const category = "Luxury";
const priceRange = { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 };
const filter = "all";

const filtered = watches.filter((w) => {
    let matches = true;

    // Line 250 in WatchPage.jsx
    if (category && (w.category || "").trim().toLowerCase() !== category.trim().toLowerCase()) matches = false;
    
    // Line 254 in WatchPage.jsx
    if (w.price < priceRange.min || (priceRange.max !== Infinity && w.price > priceRange.max)) matches = false;

    // Line 320 in WatchPage.jsx
    if (matches && filter !== "all") {
        const targetFilter = filter.toLowerCase();
        const currentGender = (w.gender || "").toLowerCase() || "unisex";
        if (currentGender !== targetFilter && currentGender !== "unisex") matches = false;
    }
    
    return matches;
});

console.log(`Found ${filtered.length} watches matching Category: ${category} and Price: ${priceRange.label}`);
filtered.forEach(w => console.log(`- ${w.name}: ₹${w.price}`));
