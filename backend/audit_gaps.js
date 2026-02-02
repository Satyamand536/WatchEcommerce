const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const CATEGORIES = ['Luxury', 'Smart', 'Classic', 'Sport', 'Junior', 'Gifting'];
const GENDERS = ['Men', 'Women', 'Boys', 'Girls', 'Unisex'];
const PRICE_RANGES = [
    { label: "Under ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
    { label: "Over ₹20,000", min: 20000, max: 10000000 }
];

console.log("--- STARTING FILTER GAP AUDIT ---");
const gaps = [];

CATEGORIES.forEach(cat => {
    GENDERS.forEach(gen => {
        PRICE_RANGES.forEach(range => {
            const matches = products.filter(p => 
                p.category.toLowerCase() === cat.toLowerCase() &&
                (p.gender.toLowerCase() === gen.toLowerCase() || p.gender.toLowerCase() === 'unisex') &&
                p.price >= range.min && p.price < range.max
            );

            if (matches.length === 0) {
                // Filter out combinations that might naturally be empty like Gifting < 1000? 
                // But user wants NO empty gaps, so we fulfill everything.
                gaps.push({ cat, gen, range: range.label });
            }
        });
    });
});

console.log(`Found ${gaps.length} empty filter combinations.`);
if (gaps.length > 0) {
    console.log("Sample Gaps:");
    gaps.slice(0, 10).forEach(g => console.log(` - ${g.cat} | ${g.gen} | ${g.range}`));
    fs.writeFileSync('filter_gaps.json', JSON.stringify(gaps, null, 2));
}
