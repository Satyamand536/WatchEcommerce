const fs = require('fs');

const products = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const smartFixes = [
    // 500 - 1000
    {
        name: "Noise Fit Pulse Lite",
        brand: "Noise",
        price: 899,
        originalPrice: 1999,
        images: ["/images/S1.png"],
        description: "Affordable and feature-rich smartwatch for daily activity tracking.",
        category: "Smart",
        gender: "Men",
        suitableFor: ["Daily Wear"],
        styleTags: ["Smart", "Budget"],
        wristFit: { dialSize: 42, fitCategory: "Medium" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP67" },
        isLuxury: false,
        stock: 50,
        promo: "offers"
    },
    {
        name: "Fire-Boltt Ninja Slim",
        brand: "Fire-Boltt",
        price: 999,
        originalPrice: 2499,
        images: ["/images/S3.png"],
        description: "Sleek and stylish smartwatch for women with period tracking and SpO2.",
        category: "Smart",
        gender: "Women",
        suitableFor: ["Daily Wear"],
        styleTags: ["Smart", "Minimalist"],
        wristFit: { dialSize: 38, fitCategory: "Small" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP67" },
        isLuxury: false,
        stock: 45,
        promo: "offers"
    },
    // 1000 - 2000
    {
        name: "boAt Storm Pro Max",
        brand: "boAt",
        price: 1599,
        originalPrice: 3999,
        images: ["/images/TS1.png"],
        description: "Professional grade health monitoring with large HD display.",
        category: "Smart",
        gender: "Men",
        suitableFor: ["Sports", "Office"],
        styleTags: ["Smart", "Sporty"],
        wristFit: { dialSize: 44, fitCategory: "Large" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP68" },
        isLuxury: false,
        stock: 30,
        promo: "offers"
    },
    {
        name: "Ambrane Fit Pulse Heart",
        brand: "Ambrane",
        price: 1850,
        originalPrice: 3499,
        images: ["/images/S2.png"],
        description: "Elegant smartwatch with premium finish and accurate sensors.",
        category: "Smart",
        gender: "Women",
        suitableFor: ["Office", "Party"],
        styleTags: ["Smart", "Chic"],
        wristFit: { dialSize: 36, fitCategory: "Small" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP67" },
        isLuxury: false,
        stock: 40
    },
    // 2000 - 5000
    {
        name: "Titan Stellar Smart Horizon",
        brand: "Titan",
        price: 3495,
        originalPrice: 5995,
        images: ["/images/TS3.png"],
        description: "Titan's premium smart engineering with classic aesthetics.",
        category: "Smart",
        gender: "Men",
        suitableFor: ["Office", "Daily Wear"],
        styleTags: ["Smart", "Classic"],
        wristFit: { dialSize: 42, fitCategory: "Medium" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP68" },
        isLuxury: false,
        stock: 25
    },
    {
        name: "Fastrack Reflex Play Pro",
        brand: "Fastrack",
        price: 4200,
        originalPrice: 6500,
        images: ["/images/S1.png"],
        description: "Vibrant AMOLED display with youth-centric design and features.",
        category: "Smart",
        gender: "Women",
        suitableFor: ["Sports", "Party"],
        styleTags: ["Smart", "Fashion"],
        wristFit: { dialSize: 40, fitCategory: "Medium" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP68" },
        isLuxury: false,
        stock: 35
    }
];

// Append new items
const updatedProducts = [...products, ...smartFixes];

fs.writeFileSync('merged_products.json', JSON.stringify(updatedProducts, null, 2));
console.log(`Added ${smartFixes.length} Smart items. Total catalog: ${updatedProducts.length}.`);
