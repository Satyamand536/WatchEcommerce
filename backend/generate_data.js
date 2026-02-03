const fs = require('fs');
const path = require('path');

const extensions = {
    'AP1': 'png', 'AP2': 'png', 'AP3': 'png', 'AP4': 'png', 'AP5': 'png', 'AP6': 'png', 'AP7': 'png', 'AP8': 'png',
    'B1': 'png', 'B2': 'png', 'B3': 'png', 'B4': 'PNG', 'B5': 'png', 'B6': 'png', 'B7': 'png', 'B8': 'png',
    'C1': 'png', 'C2': 'png', 'C3': 'png', 'C4': 'png', 'C5': 'png', 'C6': 'png', 'C7': 'png', 'C8': 'png',
    'IWC1': 'png', 'IWC2': 'png', 'IWC3': 'png', 'IWC4': 'png', 'IWC5': 'png', 'IWC6': 'png', 'IWC7': 'png', 'IWC8': 'png',
    'H1': 'png', 'H2': 'png', 'H3': 'png', 'H4': 'png', 'H5': 'png', 'H6': 'png', 'H7': 'png', 'H8': 'png',
    'JL1': 'png', 'JL2': 'png', 'JL3': 'png', 'JL4': 'png', 'JL5': 'png', 'JL6': 'png', 'JL7': 'png', 'JL8': 'png',
    'O1': 'png', 'O2': 'png', 'O3': 'png', 'O4': 'png', 'O5': 'png', 'O6': 'png', 'O7': 'png', 'O8': 'png',
    'P1': 'png', 'P2': 'png', 'P3': 'PNG', 'P4': 'png', 'P5': 'png', 'P6': 'png', 'P7': 'png', 'P8': 'png',
    'R1': 'png', 'R2': 'png', 'R3': 'png', 'R4': 'png', 'R5': 'png', 'R6': 'png', 'R7': 'png', 'R8': 'png',
    'S1': 'png', 'S2': 'png', 'S3': 'png',
    'TH1': 'png', 'TH2': 'png', 'TH3': 'png', 'TH4': 'png', 'TH5': 'png', 'TH6': 'png', 'TH7': 'png', 'TH8': 'png',
    'TS1': 'png', 'TS2': 'png', 'TS3': 'png',
    'W1': 'png', 'W2': 'png', 'W3': 'png', 'W4': 'png', 'W5': 'png', 'W6': 'png', 'W7': 'png', 'W8': 'png', 'W9': 'png', 'W10': 'png', 'W11': 'png', 'W12': 'png',
};

const getImageUrl = (varName) => {
    const ext = extensions[varName] || 'png';
    return `/images/${varName}.${ext}`;
};

const dummyPath = path.join(__dirname, '../frontend/src/assets/dummywdata.js');
const content = fs.readFileSync(dummyPath, 'utf8');

const objectRegex = /\{ id: [\s\S]+?(?=\{ id: |\];)/g;
const matches = content.match(objectRegex);

const products = [];
const seenNames = new Set();

if (matches) {
    matches.forEach(m => {
        const namePart = m.match(/name:\s*["'](.*?)["']/);
        const pricePart = m.match(/price:\s*([\d.]+)/);
        const originalPricePart = m.match(/originalPrice:\s*([\d.]+)/);
        const brandPart = m.match(/brand:\s*["'](.*?)["']/);
        const genderPart = m.match(/gender:\s*["'](.*?)["']/);
        const categoryPart = m.match(/category:\s*["'](.*?)["']/);
        const imgPart = m.match(/img:\s*([^,}\s]+)/);
        const promoPart = m.match(/promo:\s*["'](.*?)["']/);

        if (namePart && pricePart) {
            const name = namePart[1];
            if (seenNames.has(name)) return;
            seenNames.add(name);

            const imgVar = imgPart ? imgPart[1].trim() : 'W1';
            const imgUrl = getImageUrl(imgVar);

            products.push({
                name,
                brand: brandPart ? brandPart[1].charAt(0).toUpperCase() + brandPart[1].slice(1) : "Generic",
                price: parseFloat(pricePart[1]),
                originalPrice: originalPricePart ? parseFloat(originalPricePart[1]) : undefined,
                images: [imgUrl],
                description: `Premium ${name} providing style and precision.`,
                category: categoryPart ? categoryPart[1].charAt(0).toUpperCase() + categoryPart[1].slice(1) : "Classic",
                gender: genderPart ? (genderPart[1].charAt(0).toUpperCase() + genderPart[1].slice(1)) : "Unisex",
                suitableFor: ["Daily Wear"],
                styleTags: [categoryPart ? categoryPart[1] : "Modern"],
                wristFit: { dialSize: 40, fitCategory: "Medium" },
                technicalSpecs: { movement: "Quartz", waterResistance: "30m" },
                isLuxury: categoryPart && categoryPart[1].toLowerCase() === "luxury",
                stock: 20,
                promo: promoPart ? promoPart[1] : undefined
            });
        }
    });
}

// =========================================================================
// 100% GAP FILLERS V2 (Logic based on Audit)
// =========================================================================
const v2Gaps = [
    // Luxury - Mid Range (10k-20k)
    { name: "Seiko Presage Cocktail", brand: "Seiko", price: 18500, category: "Luxury", gender: "Men", imgVar: 'O1' },
    { name: "Tissot Le Locle", brand: "Tissot", price: 19500, category: "Luxury", gender: "Women", imgVar: 'H1' },
    
    // Smart - High Range (10k-20k)
    { name: "Samsung Galaxy Watch 6", brand: "Samsung", price: 18999, category: "Smart", gender: "Men", imgVar: 'TS1' },
    { name: "Fitbit Sense 2", brand: "Fitbit", price: 14500, category: "Smart", gender: "Women", imgVar: 'S1' },
    { name: "Noise Origin Premier", brand: "Noise", price: 12500, category: "Smart", gender: "Unisex", imgVar: 'S2' },

    // Sport - High Range (10k-20k and 20k+)
    { name: "G-Shock Mudmaster Elite", brand: "Casio", price: 16500, category: "Sport", gender: "Men", imgVar: 'P1' },
    { name: "Garmin Fenix 7X Pro", brand: "Garmin", price: 65000, category: "Sport", gender: "Men", imgVar: 'P7' },
    { name: "Suunto 9 Peak", brand: "Suunto", price: 42000, category: "Sport", gender: "Women", imgVar: 'P2' },

    // Junior - Premium (5k-10k)
    { name: "Garmin Vivofit Jr 3", brand: "Garmin", price: 8500, category: "Junior", gender: "Boys", imgVar: 'IWC5' },
    { name: "Fitbit Ace 3 Elite", brand: "Fitbit", price: 7499, category: "Junior", gender: "Girls", imgVar: 'JL5' },
    { name: "Zoop Smart Junior", brand: "Zoop", price: 6500, category: "Junior", gender: "Unisex", imgVar: 'JL6' },

    // Gifting - Premium (20k+)
    { name: "Titan Wedding Heritage Set", brand: "Titan", price: 35000, category: "Gifting", gender: "Unisex", imgVar: 'AP4' },
    { name: "Fossil His & Her Luxury", brand: "Fossil", price: 28000, category: "Gifting", gender: "Unisex", imgVar: 'BM1' },

    // Classic - Mid/High Range
    { name: "Noise Fit Pulse V2", brand: "Noise", price: 899, category: "Smart", gender: "Men", imgVar: 'S1' },
    { name: "Fire-Boltt Ninja Bloom", brand: "Fire-Boltt", price: 950, category: "Smart", gender: "Women", imgVar: 'S3' },
    { name: "boAt Wave Style", brand: "boAt", price: 1450, category: "Smart", gender: "Men", imgVar: 'TS2' },
    { name: "Ambrane Fit Pulse Pro", brand: "Ambrane", price: 1850, category: "Smart", gender: "Women", imgVar: 'S2' },
    { name: "Noise ColorFit Ultra 3", brand: "Noise", price: 3495, category: "Smart", gender: "Men", imgVar: 'TS3' },
    { name: "Titan Talk Rose Gold", brand: "Titan", price: 4200, category: "Smart", gender: "Women", imgVar: 'TS3' },
];

v2Gaps.forEach(g => {
    if (!seenNames.has(g.name)) {
        products.push({
            name: g.name,
            brand: g.brand,
            price: g.price,
            images: [getImageUrl(g.imgVar)],
            category: g.category,
            gender: g.gender,
            description: "Strategically selected to ensure no selection gap exists in our hallmarked collection.",
            suitableFor: ["Daily Wear", "Office"],
            styleTags: [g.category, "Premium"],
            wristFit: { dialSize: 40, fitCategory: "Medium" },
            technicalSpecs: { movement: "Automatic", waterResistance: "50m" },
            isLuxury: g.category.toLowerCase() === "luxury",
            stock: 10
        });
        seenNames.add(g.name);
    }
});

const finalProducts = products.filter((p, index, self) => 
    index === self.findIndex((t) => t.name === p.name)
);

const outputPath = path.join(__dirname, 'merged_products.json');
fs.writeFileSync(outputPath, JSON.stringify(finalProducts, null, 2));
console.log(`Generated ${finalProducts.length} products with 100% gap coverage V2.`);
