import React, { useState } from 'react';
import brands from '../assets/CategoriesHomedata';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesHome = () => {
    const [hoveredBrand, setHoveredBrand] = useState(null);

    return (
        <section className="py-24 bg-transparent transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-16">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 block">The Curation</span>
                    <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none mb-6">ELITE WATCHMAKING <br/><span className="text-gray-500 uppercase">Partnerships.</span></h2>
                    <p className="text-[var(--text-secondary)] text-sm font-medium tracking-wide max-w-lg">
                        We collaborate with the world's most prestigious horological houses to bring you precision that spans generations.
                    </p>
                </header>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {brands.map((brand, i) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link 
                                to={brand.link} 
                                className="group block relative aspect-[3/4] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                                onMouseEnter={() => setHoveredBrand(brand.id)}
                                onMouseLeave={() => setHoveredBrand(null)}
                            >
                                <div className="absolute inset-0">
                                    <img 
                                        src={brand.image} 
                                        alt={brand.name} 
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                </div>
                                
                                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-[var(--text-primary)] opacity-40 mb-2">{brand.location || 'Heritage House'}</span>
                                    <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase leading-none mb-2">
                                        {brand.name}
                                    </h3>
                                    {brand.tagline && (
                                        <p className="text-xs text-[var(--text-secondary)] font-medium group-hover:text-[var(--text-primary)] transition-colors">
                                            {brand.tagline}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesHome;
