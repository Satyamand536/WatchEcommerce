const fs = require('fs');

const products = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const boysFixes = [
    {
        name: "G-Shock Gravitymaster Boy",
        brand: "Casio",
        price: 7500,
        originalPrice: 9999,
        images: ["/images/B5.png"],
        description: "Rugged and resilient. The Gravitymaster Boy is designed for young adventurers who demand durability.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Sports", "Adventure"],
        styleTags: ["Boys", "Rugged", "Aviation"],
        wristFit: { dialSize: 40, fitCategory: "Medium" },
        technicalSpecs: { movement: "Quartz", waterResistance: "100m" },
        isLuxury: false,
        stock: 25
    },
    {
        name: "Titan Regalia Junior",
        brand: "Titan",
        price: 12500,
        originalPrice: 15000,
        images: ["/images/W3.png"],
        description: "A mark of excellence. The Regalia Junior brings Titan's legendary craftsmanship to the next generation.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Formal", "Daily"],
        styleTags: ["Boys", "Luxury", "Gold"],
        wristFit: { dialSize: 38, fitCategory: "Medium" },
        technicalSpecs: { movement: "Quartz", waterResistance: "30m" },
        isLuxury: true,
        stock: 12
    },
    {
        name: "Seiko 5 Sport Boy Edition",
        brand: "Seiko",
        price: 18500,
        originalPrice: 22000,
        images: ["/images/O7.png"],
        description: "Automatic precision for the young enthusiast. Features a transparent case back and robust caliber.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Smart Casual"],
        styleTags: ["Boys", "Automatic", "Tough"],
        wristFit: { dialSize: 36, fitCategory: "Small" },
        technicalSpecs: { movement: "Automatic", waterResistance: "50m" },
        isLuxury: true,
        stock: 8
    },
    {
        name: "Garmin Forerunner JR Pro",
        brand: "Garmin",
        price: 24500,
        originalPrice: 28000,
        images: ["/images/TS1.png"],
        description: "Advanced fitness tracking for junior athletes. GPS enabled with custom health goals.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Sports", "Tracking"],
        styleTags: ["Boys", "Smart", "GPS"],
        wristFit: { dialSize: 40, fitCategory: "Medium" },
        technicalSpecs: { movement: "Digital", waterResistance: "IP68" },
        isLuxury: false,
        stock: 15
    },
    {
        name: "Patek Nautilus Mini Junior",
        brand: "Patek-Philippe",
        price: 45000,
        originalPrice: 55000,
        images: ["/images/P3.PNG"],
        description: "The ultimate childhood heirloom. A masterfully crafted nautilus-inspired timepiece for children.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Exclusive Wear"],
        styleTags: ["Boys", "Luxury", "Heirloom"],
        wristFit: { dialSize: 34, fitCategory: "Small" },
        technicalSpecs: { movement: "Automatic", waterResistance: "50m" },
        isLuxury: true,
        stock: 5
    },
    {
        name: "Tag Heuer Carrera Jr",
        brand: "Tag-Heuer",
        price: 32000,
        originalPrice: 38000,
        images: ["/images/TH2.png"],
        description: "Racing heritage scaled for young champions. High-precision chronograph with sapphire glass.",
        category: "Junior",
        gender: "Boys",
        suitableFor: ["Sports", "Luxury"],
        styleTags: ["Boys", "Chrono", "Racing"],
        wristFit: { dialSize: 38, fitCategory: "Medium" },
        technicalSpecs: { movement: "Quartz", waterResistance: "100m" },
        isLuxury: true,
        stock: 7
    }
];

// Combine and ensure NO duplicates
const updatedProducts = [...products, ...boysFixes].filter((p, index, self) => 
    index === self.findIndex((t) => t.name === p.name)
);

fs.writeFileSync('merged_products.json', JSON.stringify(updatedProducts, null, 2));
console.log(`Added ${boysFixes.length} Boys items. Total catalog: ${updatedProducts.length}.`);
