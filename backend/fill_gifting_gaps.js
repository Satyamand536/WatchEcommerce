const fs = require('fs');

const products = JSON.parse(fs.readFileSync('merged_products.json', 'utf8'));

const finalGiftingFixes = [
    {
        name: "Titan Men's Gifting Combo",
        brand: "Titan",
        price: 1850,
        originalPrice: 2999,
        images: ["/images/W1.png"],
        description: "Elegant gifting combo featuring a classic stainless steel watch and a premium wallet.",
        category: "Gifting",
        gender: "Men",
        suitableFor: ["Gifting"],
        styleTags: ["Gifting", "Classic", "Combo"],
        wristFit: { dialSize: 42, fitCategory: "Medium" },
        technicalSpecs: { movement: "Quartz", waterResistance: "30m" },
        isLuxury: false,
        stock: 40
    },
    {
        name: "Fastrack Urban Gift Set",
        brand: "Fastrack",
        price: 1450,
        originalPrice: 2200,
        images: ["/images/AP3.png"],
        description: "Sporty gift set for the modern man. Includes an athletic watch and a signature band.",
        category: "Gifting",
        gender: "Men",
        suitableFor: ["Gifting"],
        styleTags: ["Gifting", "Sporty", "Young"],
        wristFit: { dialSize: 44, fitCategory: "Large" },
        technicalSpecs: { movement: "Quartz", waterResistance: "50m" },
        isLuxury: false,
        stock: 50
    },
    {
        name: "Premium Brass Duo Pack",
        brand: "Heritage",
        price: 3800,
        originalPrice: 5500,
        images: ["/images/O5.png"],
        description: "Sophisticated duo featuring a mechanical timepiece and a matching brass bracelet.",
        category: "Gifting",
        gender: "Men",
        suitableFor: ["Gifting", "Formal"],
        styleTags: ["Gifting", "Luxury", "Brass"],
        wristFit: { dialSize: 40, fitCategory: "Medium" },
        technicalSpecs: { movement: "Mechanical", waterResistance: "30m" },
        isLuxury: true,
        stock: 15
    },
    {
        name: "Fossil Signature Gift Case",
        brand: "Fossil",
        price: 4500,
        originalPrice: 6999,
        images: ["/images/TH2.png"],
        description: "The ultimate gift of time. A premium leather-strap watch presented in a limited edition collector's case.",
        category: "Gifting",
        gender: "Men",
        suitableFor: ["Gifting", "Party"],
        styleTags: ["Gifting", "Leather", "Premium"],
        wristFit: { dialSize: 44, fitCategory: "Large" },
        technicalSpecs: { movement: "Quartz", waterResistance: "50m" },
        isLuxury: false,
        stock: 20
    }
];

// Combine and ensure NO duplicates
const updatedProducts = [...products, ...finalGiftingFixes].filter((p, index, self) => 
    index === self.findIndex((t) => t.name === p.name)
);

fs.writeFileSync('merged_products.json', JSON.stringify(updatedProducts, null, 2));
console.log(`Added ${finalGiftingFixes.length} Gifting items. Total catalog: ${updatedProducts.length}.`);
