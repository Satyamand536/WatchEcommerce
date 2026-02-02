const fs = require('fs');

const products = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const finalFixes = [
    {
        name: "Luxury Velvet Display Case",
        brand: "Heritage",
        price: 850,
        originalPrice: 1200,
        images: ["/images/JL3.png"], // Reuse a luxury-looking asset
        description: "Hand-crafted velvet display case for your finest timepieces. Adds a layer of protection and elegance to your collection.",
        category: "Luxury",
        gender: "Unisex",
        suitableFor: ["Collection"],
        styleTags: ["Luxury", "Accessory"],
        wristFit: { dialSize: 0, fitCategory: "Universal" },
        technicalSpecs: { movement: "None", waterResistance: "N/A" },
        isLuxury: true,
        stock: 50
    },
    {
        name: "Vintage Heirloom Edition",
        brand: "HMT",
        price: 4200,
        originalPrice: 5500,
        images: ["/images/O5.png"],
        description: "A tribute to classic horology. This vintage heirloom edition offers a sophisticated silver dial and mechanical soul.",
        category: "Luxury",
        gender: "Men",
        suitableFor: ["Formal"],
        styleTags: ["Luxury", "Vintage"],
        wristFit: { dialSize: 36, fitCategory: "Small" },
        technicalSpecs: { movement: "Mechanical", waterResistance: "Splash" },
        isLuxury: true,
        stock: 10
    },
    {
        name: "Suunto Performance Pro",
        brand: "Suunto",
        price: 18500,
        originalPrice: 22000,
        images: ["/images/P7.png"],
        description: "Built for endurance. Suunto Performance Pro offers advanced GPS tracking and rugged durability for extreme athletes.",
        category: "Sport",
        gender: "Men",
        suitableFor: ["Extreme Sports"],
        styleTags: ["Sport", "Rugged", "GPS"],
        wristFit: { dialSize: 45, fitCategory: "Large" },
        technicalSpecs: { movement: "Digital", waterResistance: "100m" },
        isLuxury: false,
        stock: 15
    },
    {
        name: "Garmin Fenix Absolute",
        brand: "Garmin",
        price: 68000,
        originalPrice: 75000,
        images: ["/images/S1.png"], // Using a smart/sporty image
        description: "The peak of performance. Garmin Fenix Absolute represents the ultimate fusion of sports science and luxury engineering.",
        category: "Sport",
        gender: "Unisex",
        suitableFor: ["Professional Sports"],
        styleTags: ["Sport", "Luxury", "Smart"],
        wristFit: { dialSize: 47, fitCategory: "Large" },
        technicalSpecs: { movement: "Digital", waterResistance: "100m" },
        isLuxury: true,
        stock: 5
    }
];

// Append new items
const updatedProducts = [...products, ...finalFixes];

fs.writeFileSync('merged_products.json', JSON.stringify(updatedProducts, null, 2));
console.log(`Added ${finalFixes.length} items. Total catalog: ${updatedProducts.length}.`);
