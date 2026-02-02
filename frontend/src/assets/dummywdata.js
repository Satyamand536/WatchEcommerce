import W1 from "../assets/W1.png"
import W2 from "../assets/W2.png"
import W3 from "../assets/W3.png"
import W4 from "../assets/W4.png"
import W5 from "../assets/W5.png"
import W6 from "../assets/W6.png"
import W7 from "../assets/W7.png"
import W8 from "../assets/W8.png"
import W9 from "../assets/W9.png"
import W10 from "../assets/W10.png"
import W11 from "../assets/W11.png"
import W12 from "../assets/W12.png"

// Brand Imports
import R1 from "../assets/R1.png"
import R2 from "../assets/R2.png"
import R3 from "../assets/R3.png"
import R4 from "../assets/R4.png"
import R5 from "../assets/R5.png"
import R6 from "../assets/R6.png"
import R7 from "../assets/R7.png"
import R8 from "../assets/R8.png"
import O1 from "../assets/O1.png"
import O2 from "../assets/O2.png"
import O3 from "../assets/O3.png"
import O4 from "../assets/O4.png"
import O5 from "../assets/O5.png"
import O6 from "../assets/O6.png"
import O7 from "../assets/O7.png"
import O8 from "../assets/O8.png"
import P1 from "../assets/P1.png"
import P2 from "../assets/P2.png"
import P3 from "../assets/P3.PNG"
import P4 from "../assets/P4.png"
import P5 from "../assets/P5.png"
import P6 from "../assets/P6.png"
import P7 from "../assets/P7.png"
import P8 from "../assets/P8.png"
import AP1 from "../assets/AP1.png"
import AP2 from "../assets/AP2.png"
import AP3 from "../assets/AP3.png"
import AP4 from "../assets/AP4.png"
import AP5 from "../assets/AP5.png"
import AP6 from "../assets/AP6.png"
import AP7 from "../assets/AP7.png"
import AP8 from "../assets/AP8.png"
import C1 from "../assets/C1.png"
import C2 from "../assets/C2.png"
import C3 from "../assets/C3.png"
import C4 from "../assets/C4.png"
import C5 from "../assets/C5.png"
import C6 from "../assets/C6.png"
import C7 from "../assets/C7.png"
import C8 from "../assets/C8.png"
import B1 from "../assets/B1.png"
import B2 from "../assets/B2.png"
import B3 from "../assets/B3.png"
import B4 from "../assets/B4.PNG"
import B5 from "../assets/B5.png"
import B6 from "../assets/B6.png"
import B7 from "../assets/B7.png"
import B8 from "../assets/B8.png"
import IWC1 from "../assets/IWC1.png"
import IWC2 from "../assets/IWC2.png"
import IWC3 from "../assets/IWC3.png"
import IWC4 from "../assets/IWC4.png"
import IWC5 from "../assets/IWC5.png"
import IWC6 from "../assets/IWC6.png"
import IWC7 from "../assets/IWC7.png"
import IWC8 from "../assets/IWC8.png"
import H1 from "../assets/H1.png"
import H2 from "../assets/H2.png"
import H3 from "../assets/H3.png"
import H4 from "../assets/H4.png"
import H5 from "../assets/H5.png"
import H6 from "../assets/H6.png"
import H7 from "../assets/H7.png"
import H8 from "../assets/H8.png"
import TH1 from "../assets/TH1.png"
import TH2 from "../assets/TH2.png"
import TH3 from "../assets/TH3.png"
import TH4 from "../assets/TH4.png"
import TH5 from "../assets/TH5.png"
import TH6 from "../assets/TH6.png"
import TH7 from "../assets/TH7.png"
import TH8 from "../assets/TH8.png"
import JL1 from "../assets/JL1.png"
import JL2 from "../assets/JL2.png"
import JL3 from "../assets/JL3.png"
import JL4 from "../assets/JL4.png"
import JL5 from "../assets/JL5.png"
import JL6 from "../assets/JL6.png"
import JL7 from "../assets/JL7.png"
import JL8 from "../assets/JL8.png"

// Tactical / Sport Imports
import TS1 from "./TS1.png"
import TS2 from "./TS2.png"
import TS3 from "./TS3.png"
import S1 from "./S1.png"
import S2 from "./S2.png"
import S3 from "./S3.png"

export const WATCHES = [
  // --- LUXURY FLAGSHIPS (ONLY 2 ABOVE 10k) ---
  { id: 1001, name: "Rolex Pearl Elite", img: R1, price: 85000, originalPrice: 95000, category: "Luxury", brand: "rolex", gender: "men", dialSize: 40, promo: "offers", specs: { warranty: "5 Years", waterproof: "100m", origin: "Swiss" }, styleTags: ["luxury", "classic", "steel"] },
  { id: 1002, name: "Omega Seamaster Neo", img: O1, price: 45000, originalPrice: 52000, category: "Luxury", brand: "omega", gender: "men", dialSize: 42, promo: "offers", specs: { warranty: "5 Years", waterproof: "150m", origin: "Swiss" }, styleTags: ["luxury", "diver", "blue"] },

  // --- LUXURY (UNDER 10K) ---
  { id: 1003, name: "Cartier Tank Solo", img: C3, price: 9500, originalPrice: 12500, category: "Luxury", brand: "cartier", gender: "women", dialSize: 36, promo: "offers", specs: { warranty: "2 Years", waterproof: "30m", origin: "Swiss" }, styleTags: ["luxury", "minimalist", "leather"] },
  { id: 1004, name: "Patek Calatrava Lite", img: P3, price: 8999, originalPrice: 11000, category: "Luxury", brand: "patek-philippe", gender: "women", dialSize: 34, promo: "offers", specs: { warranty: "2 Years", waterproof: "30m", origin: "Swiss" }, styleTags: ["luxury", "elegant", "gold"] },
  { id: 1005, name: "IWC Portofino Slim", img: IWC1, price: 7800, originalPrice: 9200, category: "Luxury", brand: "iwc", gender: "men", dialSize: 40, promo: "offers", specs: { warranty: "2 Years", origin: "Swiss" }, styleTags: ["luxury", "formal", "white"] },
  { id: 1006, name: "Tag Heuer Carrera", img: TH1, price: 9800, originalPrice: 14500, category: "Luxury", brand: "tag-heuer", gender: "men", dialSize: 44, promo: "offers", specs: { warranty: "2 Years", origin: "Swiss" }, styleTags: ["sport", "chrono", "luxury"] },
  { id: 1007, name: "Hermes Arceau Paris", img: H1, price: 8500, originalPrice: 11000, category: "Luxury", brand: "hermes", gender: "women", dialSize: 34, promo: "offers", specs: { warranty: "2 Years", origin: "France" }, styleTags: ["fashion", "minimalist", "leather"] },
  { id: 1008, name: "Zenith El Primero", img: JL3, price: 9400, originalPrice: 12500, category: "Luxury", brand: "zenith", gender: "men", dialSize: 42, promo: "offers", specs: { warranty: "2 Years", origin: "Swiss" }, styleTags: ["chrono", "precision", "blue"] },

  // --- TITAN & FASTTRACK (BHARAT ELITE) ---
  { id: 3001, name: "Titan Stellar Smart", img: TS3, price: 9995, originalPrice: 13995, category: "Smart", brand: "titan", gender: "unisex", dialSize: 44, promo: "offers", specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "premium", "titan"] },
  { id: 3002, name: "Titan Regalia Gold", img: W2, price: 7495, originalPrice: 9500, category: "Classic", brand: "titan", gender: "men", dialSize: 40, promo: "offers", specs: { warranty: "2 Years", origin: "Bharat" }, styleTags: ["classic", "gold", "formal"] },
  { id: 3003, name: "Fastrack Vibes Chrono", img: W10, price: 2450, originalPrice: 3850, category: "Classic", brand: "fastrack", gender: "women", dialSize: 38, promo: "offers", specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["fashion", "color", "chic"] },
  { id: 3004, name: "Titan Karishma Steel", img: W3, price: 1850, originalPrice: 2450, category: "Classic", brand: "titan", gender: "men", dialSize: 39, promo: "offers", specs: { warranty: "2 Years", origin: "Bharat" }, styleTags: ["budget", "classic", "silver"] },
  { id: 3005, name: "Fastrack Revolt X", img: AP3, price: 3495, originalPrice: 4500, category: "Sport", brand: "fastrack", gender: "men", dialSize: 45, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["rugged", "army", "green"] },
  { id: 3006, name: "Titan Raga Aura", img: W11, price: 5850, originalPrice: 7200, category: "Classic", brand: "titan", gender: "women", dialSize: 32, specs: { warranty: "2 Years", origin: "Bharat" }, styleTags: ["elegant", "women", "jewelry"] },
  { id: 3007, name: "Titan Neo Elite", img: W1, price: 4200, originalPrice: 5500, category: "Classic", brand: "titan", gender: "men", dialSize: 42, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["casual", "minimalist", "black"] },
  { id: 3008, name: "Fastrack Game Face", img: AP1, price: 1450, originalPrice: 2100, category: "Classic", brand: "fastrack", gender: "men", dialSize: 43, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["casual", "daily", "black"] },
  { id: 3009, name: "Titan Entry Plus", img: W9, price: 850, originalPrice: 1200, category: "Classic", brand: "titan", gender: "women", dialSize: 34, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["budget", "pink", "ladies"] },
  { id: 3010, name: "Fastrack Reflex Slim", img: S1, price: 4995, originalPrice: 7999, category: "Smart", brand: "fastrack", gender: "unisex", dialSize: 42, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "fitness", "youth"] },
  { id: 3011, name: "Noise Fit Crew", img: S2, price: 999, originalPrice: 1599, category: "Smart", brand: "noise", gender: "unisex", dialSize: 44, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "budget", "fitness"] },
  { id: 3012, name: "boAt Storm Call", img: TS2, price: 899, originalPrice: 1299, category: "Smart", brand: "boat", gender: "unisex", dialSize: 45, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "budget", "calling"] },
  { id: 3013, name: "Ambrane Fit Beam", img: S3, price: 1850, originalPrice: 2450, category: "Smart", brand: "ambrane", gender: "unisex", dialSize: 42, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "entry", "classic"] },

  // --- CASIO (JAPANESE CLASSICS) ---
  { id: 4001, name: "G-Shock Carbon Mud", img: P1, price: 9995, originalPrice: 12995, category: "Sport", brand: "casio", gender: "men", dialSize: 48, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["rugged", "sport", "shock"] },
  { id: 4002, name: "Casio Edifice Black", img: R6, price: 8495, originalPrice: 10500, category: "Classic", brand: "casio", gender: "men", dialSize: 44, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["chrono", "steel", "professional"] },
  { id: 4003, name: "Casio Vintage Gold", img: W7, price: 1695, originalPrice: 2295, category: "Classic", brand: "casio", gender: "unisex", dialSize: 36, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["retro", "digital", "gold"] },
  { id: 4004, name: "Baby-G Floral Pink", img: P2, price: 7450, originalPrice: 8999, category: "Sport", brand: "casio", gender: "women", dialSize: 40, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["sport", "tough", "pink"] },
  { id: 4005, name: "Casio Enticer Blue", img: P8, price: 3495, originalPrice: 4500, category: "Classic", brand: "casio", gender: "men", dialSize: 41, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["elegant", "blue", "leather"] },
  { id: 4006, name: "Casio Youth Sport", img: O7, price: 850, originalPrice: 1250, category: "Classic", brand: "casio", gender: "unisex", dialSize: 38, specs: { warranty: "1 Year", origin: "Japan" }, styleTags: ["budget", "sporty", "digital"] },
  { id: 4007, name: "Casio Basic Silver", img: O5, price: 550, originalPrice: 850, category: "Classic", brand: "casio", gender: "men", dialSize: 38, specs: { warranty: "1 Year", origin: "Japan" }, styleTags: ["cheap", "casio", "daily"] },
  { id: 4008, name: "Casio Lady Quartz", img: W5, price: 650, originalPrice: 950, category: "Classic", brand: "casio", gender: "women", dialSize: 32, specs: { warranty: "1 Year", origin: "Japan" }, styleTags: ["cheap", "silver", "minimal"] },

  // --- SEIKO & CITIZEN ---
  { id: 9001, name: "Seiko 5 Sport Neo", img: O2, price: 9500, originalPrice: 12000, category: "Sport", brand: "seiko", gender: "men", dialSize: 42, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["rugged", "automatic", "diver"] },
  { id: 9002, name: "Seiko Dress Brown", img: W6, price: 8200, originalPrice: 9900, category: "Classic", brand: "seiko", gender: "men", dialSize: 40, specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["vintage", "automatic", "leather"] },
  { id: 9003, name: "Citizen Eco-Drive XL", img: IWC3, price: 8900, originalPrice: 11000, category: "Classic", brand: "citizen", gender: "men", dialSize: 43, specs: { warranty: "3 Years", origin: "Japan" }, styleTags: ["solar", "minimalist", "eco"] },
  { id: 9004, name: "Citizen Luxury Lady", img: JL1, price: 9400, originalPrice: 12500, category: "Luxury", brand: "citizen", gender: "women", dialSize: 34, specs: { warranty: "3 Years", origin: "Japan" }, styleTags: ["elegant", "luxury", "gold"] },
  { id: 9005, name: "Seiko Quartz Basic", img: R4, price: 1850, originalPrice: 2800, category: "Classic", brand: "seiko", gender: "men", dialSize: 39, specs: { warranty: "1 Year", origin: "Japan" }, styleTags: ["budget", "seiko", "quartz"] },
  { id: 9006, name: "Citizen Lady Luxe", img: JL8, price: 5450, originalPrice: 7200, category: "Classic", brand: "citizen", gender: "women", dialSize: 33, specs: { warranty: "1 Year", origin: "Japan" }, styleTags: ["budget", "citizen", "silver"] },

  // --- FOSSIL & OTHERS ---
  { id: 5001, name: "Fossil Gen 6 Smart", img: TH5, price: 9995, originalPrice: 19995, category: "Smart", brand: "fossil", gender: "men", dialSize: 44, specs: { warranty: "1 Year", origin: "Global" }, styleTags: ["smart", "classic", "fossil"] },
  { id: 5002, name: "Fossil Townsman Auto", img: TH2, price: 8995, originalPrice: 11500, category: "Classic", brand: "fossil", gender: "men", dialSize: 44, specs: { warranty: "2 Years", origin: "Global" }, styleTags: ["vintage", "leather", "mechanical"] },
  { id: 5003, name: "Fossil Jacqueline Mini", img: W9, price: 6495, originalPrice: 8500, category: "Classic", brand: "fossil", gender: "women", dialSize: 36, specs: { warranty: "1 Year", origin: "Global" }, styleTags: ["elegant", "pink", "ladies"] },
  { id: 5004, name: "Fossil machine black", img: W4, price: 4250, originalPrice: 5800, category: "Classic", brand: "fossil", gender: "men", dialSize: 45, specs: { warranty: "2 Years", origin: "Global" }, styleTags: ["black", "rugged", "formal"] },
  { id: 5005, name: "Fossil Entry Unisex", img: W5, price: 950, originalPrice: 1550, category: "Classic", brand: "fossil", gender: "unisex", dialSize: 38, specs: { warranty: "6 Months", origin: "Global" }, styleTags: ["budget", "fossil", "clean"] },

  // --- JUNIOR (BOYS / GIRLS) ---
  { id: 7001, name: "G-Shock Junior Mud", img: B5, price: 1499, originalPrice: 2499, category: "Junior", brand: "casio", gender: "boys", dialSize: 38, styleTags: ["boys", "rugged", "adventure"] },
  { id: 7002, name: "Pink Sparkle Watch", img: C5, price: 799, originalPrice: 1299, category: "Junior", brand: "sparkle", gender: "girls", dialSize: 32, styleTags: ["girls", "cute", "glitter"] },
  { id: 7003, name: "Matrix Boy Hero", img: O7, price: 599, originalPrice: 999, category: "Junior", brand: "matrix", gender: "boys", dialSize: 36, styleTags: ["boys", "adventure", "digital"] },
  { id: 7004, name: "Fastrack Girl Chic", img: C2, price: 1899, originalPrice: 2499, category: "Junior", brand: "fastrack", gender: "girls", dialSize: 34, styleTags: ["girls", "star", "elegant"] },
  { id: 7005, name: "Titan Kid Blue", img: IWC5, price: 2450, originalPrice: 3500, category: "Junior", brand: "titan", gender: "boys", dialSize: 35, styleTags: ["boys", "camo", "outdoor"] },
  { id: 7006, name: "Sonata Girl Gem", img: JL5, price: 1200, originalPrice: 1800, category: "Junior", brand: "sonata", gender: "girls", dialSize: 30, styleTags: ["girls", "character", "pink"] },
  { id: 7007, name: "Junior Entry Boy", img: W2, price: 550, originalPrice: 850, category: "Junior", brand: "bharat", gender: "boys", dialSize: 34, styleTags: ["boys", "daily"] },
  { id: 7008, name: "Junior Entry Girl", img: W11, price: 550, originalPrice: 850, category: "Junior", brand: "bharat", gender: "girls", dialSize: 30, styleTags: ["girls", "daily"] },
  { id: 7009, name: "Titan Raga Junior", img: W11, price: 3450, originalPrice: 4200, category: "Junior", brand: "titan", gender: "girls", dialSize: 33, styleTags: ["girls", "elegant", "jewelry"] },
  { id: 7010, name: "Baby-G Lite", img: P2, price: 5800, originalPrice: 7500, category: "Junior", brand: "casio", gender: "girls", dialSize: 38, styleTags: ["girls", "sport", "tough"] },
  { id: 7011, name: "Fossil Bloom Junior", img: W9, price: 4200, originalPrice: 5500, category: "Junior", brand: "fossil", gender: "girls", dialSize: 34, styleTags: ["girls", "pink", "fashion"] },
  { id: 7012, name: "Fastrack Smarty Girl", img: S1, price: 2999, originalPrice: 3850, category: "Junior", brand: "fastrack", gender: "girls", dialSize: 40, styleTags: ["girls", "smart", "tech"] },
  { id: 7013, name: "Elite Princess Gold", img: W7, price: 8500, originalPrice: 11000, category: "Junior", brand: "titan", gender: "girls", dialSize: 32, styleTags: ["girls", "luxury", "gold"] },
  { id: 7014, name: "Cartier Panthère Jr", img: C3, price: 24500, originalPrice: 28500, category: "Junior", brand: "cartier", gender: "girls", dialSize: 28, styleTags: ["girls", "luxury", "premium"] },
  { id: 7015, name: "Patek Nautilus Mini", img: P3, price: 32000, originalPrice: 38000, category: "Junior", brand: "patek-philippe", gender: "girls", dialSize: 32, styleTags: ["girls", "luxury", "sport"] },
  { id: 7016, name: "Rolex Datejust Pink", img: R3, price: 18500, originalPrice: 22500, category: "Junior", brand: "rolex", gender: "girls", dialSize: 31, styleTags: ["girls", "luxury", "pink"] },

  // --- GIFTING ---
  { id: 6001, name: "Couple Gold Set", img: JL6, price: 9999, originalPrice: 15000, category: "Gifting", brand: "titan", gender: "unisex", dialSize: 40, styleTags: ["couple_set", "gold"] },
  { id: 6002, name: "Elegance Box Set", img: TH7, price: 8500, originalPrice: 12000, category: "Gifting", brand: "titan", gender: "women", dialSize: 36, styleTags: ["gift_set", "women"] },
  { id: 6003, name: "Executive Pen Set", img: B1, price: 7450, originalPrice: 9999, category: "Gifting", brand: "elite", gender: "men", dialSize: 42, styleTags: ["gift", "executive"] },
  { id: 6004, name: "Rose Gold Delight", img: IWC6, price: 4500, originalPrice: 6500, category: "Gifting", brand: "sonata", gender: "women", dialSize: 34, styleTags: ["gift", "pink"] },
  { id: 6005, name: "Budget Buddy Box", img: H5, price: 950, originalPrice: 1500, category: "Gifting", brand: "daily", gender: "unisex", dialSize: 38, styleTags: ["gift", "budget"] },
  { id: 6006, name: "Silver shine Pack", img: AP8, price: 1850, originalPrice: 2800, category: "Gifting", brand: "silver", gender: "women", dialSize: 36, styleTags: ["gift", "silver"] },
  
  // --- PREMIUM GIFTING (10k+) ---
  { id: 6007, name: "Collector's Chrono Set", img: IWC4, price: 24500, originalPrice: 32000, category: "Gifting", brand: "iwc", gender: "men", dialSize: 43, styleTags: ["premium_gift", "luxury"] },
  { id: 6008, name: "Diamond Jubilee Box", img: JL7, price: 45000, originalPrice: 55000, category: "Gifting", brand: "zenith", gender: "women", dialSize: 38, styleTags: ["premium_gift", "diamond"] },
  { id: 6009, name: "Presidential Duo Pack", img: B2, price: 12499, originalPrice: 18000, category: "Gifting", brand: "elite", gender: "unisex", dialSize: 41, styleTags: ["premium_gift", "exclusive"] },

  // --- MATRIX (BUDGET) ---
  { id: 8001, name: "Matrix Azure Steel", img: P8, price: 999, originalPrice: 1999, category: "Classic", brand: "matrix", gender: "men", dialSize: 42, promo: "offers", styleTags: ["budget", "steel", "blue"] },
  { id: 8002, name: "Matrix Rose Luxe", img: W11, price: 1450, originalPrice: 2450, category: "Classic", brand: "matrix", gender: "women", dialSize: 36, promo: "offers", styleTags: ["budget", "rose-gold"] },
  { id: 8003, name: "Matrix Sport 500", img: TS1, price: 550, originalPrice: 999, category: "Sport", brand: "matrix", gender: "unisex", dialSize: 40, promo: "offers", styleTags: ["cheap", "rugged"] },

  // --- MORE REPETITIONS FOR FULL DENSITY (80+) ---
  { id: 1100, name: "Rolex Precision Blue", img: R1, price: 9900, originalPrice: 14500, brand: "rolex", gender: "men", category: "Luxury", dialSize: 41, promo: "offers" },
  { id: 1101, name: "Omega Aqua Terra Lite", img: O1, price: 8200, originalPrice: 11000, brand: "omega", gender: "women", category: "Luxury", dialSize: 34, promo: "offers" },
  { id: 1102, name: "Omega Speedmaster 1.0", img: O2, price: 7800, brand: "omega", gender: "men", category: "Luxury", dialSize: 42 },
  { id: 1103, name: "Rolex Oyster Lady", img: R4, price: 9100, brand: "rolex", gender: "women", category: "Luxury", dialSize: 31 },
  { id: 1104, name: "Rolex Entry Men", img: R2, price: 1450, brand: "rolex", gender: "men", category: "Classic", dialSize: 39 },
  { id: 1105, name: "Rolex Entry Women", img: R3, price: 1200, brand: "rolex", gender: "women", category: "Classic", dialSize: 28 },
  { id: 4100, name: "Casio Edifice Neo", img: R6, price: 9400, originalPrice: 12500, brand: "casio", gender: "men", category: "Classic", dialSize: 44, promo: "offers" },
  { id: 4101, name: "G-Shock Mudmaster V2", img: P1, price: 8800, originalPrice: 11500, brand: "casio", gender: "men", category: "Sport", dialSize: 50, promo: "offers" },
  { id: 4102, name: "Casio Entry Gold II", img: W7, price: 650, brand: "casio", gender: "unisex", category: "Classic", dialSize: 36 },
  { id: 4103, name: "Casio Enticer Blue II", img: P8, price: 1850, brand: "casio", gender: "men", category: "Classic", dialSize: 41 },
  { id: 3100, name: "Titan Regalia Plus", img: W2, price: 5500, originalPrice: 7500, brand: "titan", gender: "men", category: "Classic", dialSize: 40, promo: "offers" },
  { id: 3101, name: "Titan Raga Pearl", img: W11, price: 4200, originalPrice: 6200, brand: "titan", gender: "women", category: "Classic", dialSize: 32, promo: "offers" },
  { id: 3102, name: "Titan Edge Slim II", img: W3, price: 1100, brand: "titan", gender: "men", category: "Classic", dialSize: 38 },
  { id: 3103, name: "Titan Entry Women II", img: W9, price: 550, brand: "titan", gender: "women", category: "Classic", dialSize: 34 },
  { id: 5100, name: "Fossil Gen 6 Hybrid", img: TH5, price: 9200, originalPrice: 14500, brand: "fossil", gender: "unisex", category: "Smart", dialSize: 44, promo: "offers" },
  { id: 5101, name: "Fossil Jacqueline II", img: W9, price: 4800, originalPrice: 7200, brand: "fossil", gender: "women", category: "Classic", dialSize: 36, promo: "offers" },
  { id: 5102, name: "Fossil townsman Lite", img: TH2, price: 1450, brand: "fossil", gender: "men", category: "Classic", dialSize: 42 },
  { id: 5103, name: "Fossil Budget Case", img: W5, price: 650, brand: "fossil", gender: "unisex", category: "Classic", dialSize: 40 },
  { id: 2100, name: "Fastrack Revolver II", img: AP3, price: 2999, originalPrice: 4250, brand: "fastrack", gender: "men", category: "Sport", dialSize: 45, promo: "offers" },
  { id: 2101, name: "Fastrack Vibes Chic", img: W10, price: 950, brand: "fastrack", gender: "women", category: "Classic", dialSize: 36 },
  { id: 2102, name: "Fastrack reflex XL", img: TS2, price: 7500, brand: "fastrack", gender: "unisex", category: "Smart", dialSize: 46 },
  { id: 9100, name: "Seiko 5 Sport Blue", img: O2, price: 8100, originalPrice: 11000, brand: "seiko", gender: "men", category: "Sport", dialSize: 42, promo: "offers" },
  { id: 9101, name: "Citizen Eco Lady II", img: JL1, price: 5800, originalPrice: 8500, brand: "citizen", gender: "women", category: "Classic", dialSize: 32, promo: "offers" },
  { id: 9102, name: "Seiko Dress Neo", img: W6, price: 4500, brand: "seiko", gender: "men", category: "Classic", dialSize: 40 },
  { id: 9103, name: "Citizen eco entry", img: IWC3, price: 1100, brand: "citizen", gender: "unisex", category: "Classic", dialSize: 38 },
  { id: 8100, name: "Matrix Azure V2", img: P8, price: 1450, originalPrice: 2450, brand: "matrix", gender: "men", category: "Classic", dialSize: 42, promo: "offers" },
  { id: 8101, name: "Matrix Rose II", img: W11, price: 950, originalPrice: 1850, brand: "matrix", gender: "women", category: "Classic", dialSize: 34, promo: "offers" },
  { id: 8102, name: "Matrix Smart Lite II", img: TS2, price: 2200, brand: "matrix", gender: "unisex", category: "Smart", dialSize: 44 },
  
  // --- ELITE PARTNERSHIPS EXPANSION ---
  
  // BREITLING
  { id: 12001, name: "Breitling Navitimer B01", img: B1, price: 58000, originalPrice: 65000, category: "Luxury", brand: "breitling", gender: "men", dialSize: 43, specs: { warranty: "5 Years", origin: "Swiss" }, styleTags: ["luxury", "pilot", "chrono"] },
  { id: 12002, name: "Breitling Superocean Heritage", img: B2, price: 32000, originalPrice: 38000, category: "Luxury", brand: "breitling", gender: "women", dialSize: 38, specs: { warranty: "5 Years", origin: "Swiss" }, styleTags: ["luxury", "diver", "blue"] },
  { id: 12003, name: "Breitling Avenger Chrono", img: B3, price: 38000, category: "Luxury", brand: "breitling", gender: "men", dialSize: 45, styleTags: ["luxury", "rugged"] },

  // HUBLOT
  { id: 13001, name: "Hublot Big Bang Unico", img: H2, price: 95000, originalPrice: 110000, category: "Luxury", brand: "hublot", gender: "men", dialSize: 44, specs: { warranty: "2 Years", origin: "Swiss" }, styleTags: ["luxury", "fusion", "bold"] },
  { id: 13002, name: "Hublot Classic Fusion Gold", img: H3, price: 55000, originalPrice: 62000, category: "Luxury", brand: "hublot", gender: "women", dialSize: 38, specs: { warranty: "2 Years", origin: "Swiss" }, styleTags: ["luxury", "minimalist", "gold"] },
  { id: 13003, name: "Hublot Spirit of Big Bang", img: H4, price: 78000, category: "Luxury", brand: "hublot", gender: "men", dialSize: 42, styleTags: ["luxury", "exclusive"] },

  // JAEGER-LECOULTRE
  { id: 14001, name: "JLC Reverso Tribute", img: JL1, price: 42000, originalPrice: 48000, category: "Luxury", brand: "jaeger-lecoultre", gender: "men", dialSize: 42, specs: { warranty: "8 Years", origin: "Swiss" }, styleTags: ["luxury", "classic", "art-deco"] },
  { id: 14002, name: "JLC Rendez-Vous Night & Day", img: JL2, price: 38000, originalPrice: 44000, category: "Luxury", brand: "jaeger-lecoultre", gender: "women", dialSize: 34, specs: { warranty: "8 Years", origin: "Swiss" }, styleTags: ["luxury", "elegant", "diamond"] },
  { id: 14003, name: "JLC Master Ultra Thin", img: JL4, price: 52000, category: "Luxury", brand: "jaeger-lecoultre", gender: "unisex", dialSize: 39, styleTags: ["luxury", "slim"] },

  // AUDEMARS PIGUET
  { id: 15001, name: "AP Royal Oak Selfwinding", img: AP1, price: 92000, originalPrice: 105000, category: "Luxury", brand: "audemars-piguet", gender: "men", dialSize: 41, specs: { warranty: "5 Years", origin: "Swiss" }, styleTags: ["luxury", "iconic", "steel"] },
  { id: 15002, name: "AP Royal Oak Lady Rose", img: AP2, price: 85000, originalPrice: 92000, category: "Luxury", brand: "audemars-piguet", gender: "women", dialSize: 37, specs: { warranty: "5 Years", origin: "Swiss" }, styleTags: ["luxury", "elegant", "gold"] },

  // FILLING GAPS FOR IWC, TAG HEUER, ZENITH
  { id: 16001, name: "IWC Portugieser Chrono", img: IWC2, price: 45000, brand: "iwc", gender: "men", category: "Luxury", dialSize: 41 },
  { id: 16002, name: "IWC Da Vinci Automatic", img: IWC4, price: 38000, brand: "iwc", gender: "women", category: "Luxury", dialSize: 36 },
  { id: 17001, name: "Tag Heuer Monaco Gulf", img: TH2, price: 42000, brand: "tag-heuer", gender: "men", category: "Luxury", dialSize: 39 },
  { id: 17002, name: "Tag Heuer Aquaracer Lady", img: TH3, price: 18500, brand: "tag-heuer", gender: "women", category: "Luxury", dialSize: 30 },
  { id: 18001, name: "Zenith Defy Skyline", img: JL3, price: 52000, brand: "zenith", gender: "men", category: "Luxury", dialSize: 41 },
  { id: 18002, name: "Zenith Elite Moonphase", img: JL8, price: 32000, brand: "zenith", gender: "women", category: "Luxury", dialSize: 36 },

  { id: 10001, name: "Elite Gift Pair", img: W7, price: 7500, originalPrice: 9999, brand: "titan", gender: "unisex", category: "Gifting", dialSize: 40, promo: "offers" },
  { id: 10002, name: "Budget Gift Box II", img: W4, price: 550, brand: "daily", gender: "unisex", category: "Gifting", dialSize: 38 },
  
  // --- LUXURY SMART BRACKET (10k+) ---
  { id: 11001, name: "Apple Watch Ultra II", img: TS3, price: 89900, originalPrice: 95000, category: "Smart", brand: "apple", gender: "unisex", dialSize: 49, specs: { warranty: "1 Year", origin: "USA" }, styleTags: ["smart", "luxury", "rugged"] },
  { id: 11002, name: "Samsung Galaxy Watch 6", img: S1, price: 34999, originalPrice: 42000, category: "Smart", brand: "samsung", gender: "unisex", dialSize: 44, specs: { warranty: "1 Year", origin: "Korea" }, styleTags: ["smart", "luxury", "android"] },
  { id: 11003, name: "Garmin Epix Pro", img: S2, price: 65000, originalPrice: 72000, category: "Smart", brand: "garmin", gender: "men", dialSize: 47, specs: { warranty: "2 Years", origin: "USA" }, styleTags: ["smart", "luxury", "sports"] },
  { id: 11004, name: "Noise Halo Plus", img: S3, price: 12500, originalPrice: 15999, category: "Smart", brand: "noise", gender: "women", dialSize: 41, specs: { warranty: "1 Year", origin: "Bharat" }, styleTags: ["smart", "premium", "gold"] },

  // --- DATA FILL FOR MISSING FILTERS (USER REQUEST) ---
  
  // 1. BOYS (5k-10k and 10k+)
  { id: 20001, name: "G-Shock Gravitymaster Jr", img: B5, price: 7500, originalPrice: 9999, category: "Junior", brand: "casio", gender: "boys", dialSize: 40, styleTags: ["boys", "rugged", "aviation"] },
  { id: 20002, name: "Titan Regalia Boy", img: W3, price: 12500, originalPrice: 15000, category: "Junior", brand: "titan", gender: "boys", dialSize: 38, styleTags: ["boys", "luxury", "gold"] },
  { id: 20003, name: "Seiko 5 Boy Scout", img: O7, price: 18500, originalPrice: 22000, category: "Junior", brand: "seiko", gender: "boys", dialSize: 36, styleTags: ["boys", "automatic", "premium"] },

  // 2. SMART (Filling Density 500-10k)
  { id: 21001, name: "Fastrack Reflex Beat", img: TS2, price: 850, originalPrice: 1499, category: "Smart", brand: "fastrack", gender: "unisex", dialSize: 40, styleTags: ["smart", "budget", "fitness"], promo: "offers" },
  { id: 21002, name: "Noise ColorFit Pulse", img: S2, price: 1500, originalPrice: 2499, category: "Smart", brand: "noise", gender: "unisex", dialSize: 42, styleTags: ["smart", "budget", "touch"], promo: "offers" },
  { id: 21003, name: "boAt Wave Lite", img: TS1, price: 1800, originalPrice: 3999, category: "Smart", brand: "boat", gender: "unisex", dialSize: 44, styleTags: ["smart", "sport", "black"], promo: "offers" },
  { id: 21004, name: "Fire-Boltt Ninja", img: S1, price: 3500, originalPrice: 5999, category: "Smart", brand: "fire-boltt", gender: "men", dialSize: 45, styleTags: ["smart", "calling", "metal"], promo: "offers" },
  { id: 21005, name: "Noise Pro 4 Alpha", img: S3, price: 4200, originalPrice: 6500, category: "Smart", brand: "noise", gender: "unisex", dialSize: 43, styleTags: ["smart", "amoled", "premium"], promo: "offers" },
  { id: 21006, name: "Titan Talk S", img: TS3, price: 8500, originalPrice: 11999, category: "Smart", brand: "titan", gender: "women", dialSize: 40, styleTags: ["smart", "calling", "rose-gold"], promo: "offers" },

  // 3. WOMEN OFFERS (PREMIUM 10k+)
  { id: 22001, name: "Michael Kors Ritz", img: W11, price: 18500, originalPrice: 24000, category: "Luxury", brand: "michael-kors", gender: "women", dialSize: 37, promo: "offers", specs: { warranty: "2 Years", origin: "USA" }, styleTags: ["luxury", "gold", "chrono"] },
  { id: 22002, name: "Emporio Armani Gianna", img: R3, price: 28000, originalPrice: 35000, category: "Luxury", brand: "emporio-armani", gender: "women", dialSize: 32, promo: "offers", specs: { warranty: "2 Years", origin: "Italy" }, styleTags: ["luxury", "elegant", "diamond"] },
  { id: 22003, name: "Seiko Lukia Automatic", img: JL2, price: 45000, originalPrice: 52000, category: "Luxury", brand: "seiko", gender: "women", dialSize: 34, promo: "offers", specs: { warranty: "2 Years", origin: "Japan" }, styleTags: ["luxury", "automatic", "premium"] },

  // --- SMART GAPS FILL (500-5000) ---
  { id: 23001, name: "Noise Fit Pulse V2", img: S1, price: 899, originalPrice: 1999, category: "Smart", brand: "noise", gender: "men", dialSize: 42, styleTags: ["smart", "budget", "men"] },
  { id: 23002, name: "Fire-Boltt Ninja Bloom", img: S3, price: 950, originalPrice: 2499, category: "Smart", brand: "fire-boltt", gender: "women", dialSize: 38, styleTags: ["smart", "chic", "women"] },
  { id: 23003, name: "boAt Wave Style", img: TS2, price: 1450, originalPrice: 3499, category: "Smart", brand: "boat", gender: "men", dialSize: 44, styleTags: ["smart", "sport", "men"] },
  { id: 23004, name: "Ambrane Fit Beam Pro", img: S2, price: 1850, originalPrice: 3200, category: "Smart", brand: "ambrane", gender: "women", dialSize: 40, styleTags: ["smart", "elegant", "women"] },
  { id: 23005, name: "Noise ColorFit Ultra 3", img: TS3, price: 3495, originalPrice: 5995, category: "Smart", brand: "noise", gender: "men", dialSize: 45, styleTags: ["smart", "amoled", "men"] },
  { id: 23006, name: "Titan Talk Rose Gold", img: TS3, price: 4200, originalPrice: 7500, category: "Smart", brand: "titan", gender: "women", dialSize: 38, styleTags: ["smart", "premium", "women"] },

  // --- FINAL GIFTING GAPS (MEN 1k-5k) ---
  { id: 24001, name: "Titan Men's Gifting Combo", img: W1, price: 1850, originalPrice: 2999, category: "Gifting", brand: "titan", gender: "men", dialSize: 42, styleTags: ["gifting", "classic", "combo"] },
  { id: 24002, name: "Fastrack Urban Gift Set", img: AP3, price: 1450, originalPrice: 2200, category: "Gifting", brand: "fastrack", gender: "men", dialSize: 44, styleTags: ["gifting", "sporty", "combo"] },
  { id: 24003, name: "Premium Brass Duo Pack", img: O5, price: 3800, originalPrice: 5500, category: "Gifting", brand: "heritage", gender: "men", dialSize: 40, styleTags: ["gifting", "luxury", "brass"] },
  { id: 24004, name: "Fossil Signature Gift Case", img: TH2, price: 4500, originalPrice: 6999, category: "Gifting", brand: "fossil", gender: "men", dialSize: 44, styleTags: ["gifting", "premium", "leather"] },

  // --- FINAL BOYS GAPS (5k-40k+) ---
  { id: 25001, name: "G-Shock Gravitymaster Boy", img: B5, price: 7500, originalPrice: 9999, category: "Junior", brand: "casio", gender: "boys", dialSize: 40, styleTags: ["boys", "rugged", "digital"] },
  { id: 25002, name: "Titan Regalia Junior", img: W3, price: 12500, originalPrice: 15000, category: "Junior", brand: "titan", gender: "boys", dialSize: 38, styleTags: ["boys", "luxury", "gold"] },
  { id: 25003, name: "Seiko 5 Sport Boy Edition", img: O7, price: 18500, originalPrice: 22000, category: "Junior", brand: "seiko", gender: "boys", dialSize: 36, styleTags: ["boys", "automatic", "silver"] },
  { id: 25004, name: "Garmin Forerunner JR Pro", img: TS1, price: 24500, originalPrice: 28000, category: "Junior", brand: "garmin", gender: "boys", dialSize: 40, styleTags: ["boys", "smart", "pro"] },
  { id: 25005, name: "Patek Nautilus Mini Junior", img: P3, price: 45000, originalPrice: 55000, category: "Junior", brand: "patek-philippe", gender: "boys", dialSize: 34, styleTags: ["boys", "luxury", "elite"] },
  { id: 25006, name: "Tag Heuer Carrera Jr", img: TH2, price: 32000, originalPrice: 38000, category: "Junior", brand: "tag-heuer", gender: "boys", dialSize: 38, styleTags: ["boys", "chrono", "racing"] },
];

export const FILTERS = [
  { key: "all", label: "All", iconName: "Grid" },
  { key: "men", label: "Men", iconName: "User" },
  { key: "women", label: "Women", iconName: "Users" },
];
