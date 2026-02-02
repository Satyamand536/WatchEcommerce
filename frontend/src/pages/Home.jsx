import React from 'react'
import BannerHome from '../components/BannerHome'
import CategoriesHome from '../components/CategoriesHome'
import RecommendationEngine from '../components/RecommendationEngine'
import OccasionShop from '../components/OccasionShop'
import WatchComparison from '../components/WatchComparison'
import ReviewsSection from '../components/ReviewsSection'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const Home = () => {
  // Mock data for initial comparison view
  const exampleWatchA = {
    name: "BHARATI SKELETON",
    brand: "Bharat Elite",
    price: 585000,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    suitableFor: ["Events", "Daily Wear"],
    technicalSpecs: { dialSize: 44, caseMaterial: "Grade 5 Titanium" }
  };

  const exampleWatchB = {
    name: "INDUS CHRONO",
    brand: "Bharat Heritage",
    price: 820000,
    images: ["https://images.unsplash.com/photo-1533139502658-0198f920d8e8"],
    suitableFor: ["Office", "Daily Wear"],
    technicalSpecs: { dialSize: 40, caseMaterial: "Mirror Polish Steel" }
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen transition-colors duration-500">
      <BannerHome/>
      
      {/* Feature 1: Recommendation Engine - Offset Background to reduce white space */}
      <section id="recommend" className="bg-[var(--bg-secondary)] py-20 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6">
          <RecommendationEngine />
        </div>
      </section>

      {/* Categories / Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <CategoriesHome/>
      </section>

      {/* Feature 2: Occasion Shop - Offset Background */}
      <section id="occasions" className="bg-[var(--bg-secondary)] py-20 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6">
          <OccasionShop />
        </div>
      </section>

      {/* Feature 3: Comparison Engine */}
      <section id="comparison" className="py-20 px-6 max-w-7xl mx-auto">
        <WatchComparison watchA={exampleWatchA} watchB={exampleWatchB} />
      </section>

      {/* Customer Feedback */}
      <ReviewsSection />

      <Footer/>
    </div>
  );
};

export default Home;
