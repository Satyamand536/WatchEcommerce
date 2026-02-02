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
    { label: "Over ₹20,000", min: 20000, max: 1000000 }
];

const results = [];

// Audit Men
PRICE_RANGES.forEach(range => {
    const matches = products.filter(p => 
        (p.gender.toLowerCase() === 'men' || p.gender.toLowerCase() === 'unisex') &&
        p.price >= range.min && p.price < range.max
    );
    if (matches.length === 0) results.push({ context: 'Men Menu', range: range.label });
});

// Audit Women
PRICE_RANGES.forEach(range => {
    const matches = products.filter(p => 
        (p.gender.toLowerCase() === 'women' || p.gender.toLowerCase() === 'unisex') &&
        p.price >= range.min && p.price < range.max
    );
    if (matches.length === 0) results.push({ context: 'Women Menu', range: range.label });
});

// Audit Boys (Junior + Boys)
PRICE_RANGES.forEach(range => {
    const matches = products.filter(p => 
        (p.category.toLowerCase() === 'junior' || p.gender.toLowerCase() === 'boys') &&
        p.price >= range.min && p.price < range.max
    );
    if (matches.length === 0) results.push({ context: 'Boys/Junior Menu', range: range.label });
});

// Audit Girls (Junior + Girls)
PRICE_RANGES.forEach(range => {
    const matches = products.filter(p => 
        (p.category.toLowerCase() === 'junior' || p.gender.toLowerCase() === 'girls') &&
        p.price >= range.min && p.price < range.max
    );
    if (matches.length === 0) results.push({ context: 'Girls/Junior Menu', range: range.label });
});

// Audit Categories
['Luxury', 'Smart', 'Gifting', 'Sport'].forEach(cat => {
    PRICE_RANGES.forEach(range => {
        const matches = products.filter(p => 
            p.category.toLowerCase() === cat.toLowerCase() &&
            p.price >= range.min && p.price < range.max
        );
        if (matches.length === 0) results.push({ context: `${cat} Category`, range: range.label });
    });
});

// Audit Special Offers
PRICE_RANGES.forEach(range => {
    const matches = products.filter(p => 
        p.promo?.toLowerCase() === 'offers' &&
        p.price >= range.min && p.price < range.max
    );
    if (matches.length === 0) results.push({ context: 'Special Offers', range: range.label });
});

fs.writeFileSync('critical_gaps.json', JSON.stringify(results, null, 2));
console.log(`Identified ${results.length} critical gaps in the primary user journey.`);
results.forEach(r => console.log(`[EMPTY] ${r.context}: ${r.range}`));
