import React from 'react';
import { getProducts } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const products = getProducts();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 md:space-y-24 texture pb-40 overflow-hidden">
      {/* Editorial Header */}
      <section className="pt-16 md:pt-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 border-b border-black/5 pb-10 md:pb-16">
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] text-gray-400"
            >
              The Full Curation • 2026
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(4rem,10vw,11rem)] font-black tracking-tighter leading-[0.85] uppercase pointer-events-none break-words"
            >
              Archive.
            </motion.h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:max-w-md xl:max-w-lg">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 md:left-7 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text"
                placeholder="Find in curation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 md:pl-16 pr-8 md:pr-10 py-5 md:py-6 bg-white/40 border border-white/60 glass rounded-full outline-none focus:bg-white focus:border-black transition-all font-medium text-[10px] md:text-xs placeholder:text-gray-400 uppercase tracking-widest shadow-xl reflective-surface gloss-highlight"
                aria-label="Search items"
              />
            </div>
            <button 
              className="px-8 md:px-10 py-5 md:py-6 glass rounded-full hover:bg-black hover:text-white transition-all flex items-center justify-center space-x-4 border-white/60 shadow-xl reflective-surface gloss-highlight group"
              aria-label="Filter items"
            >
               <SlidersHorizontal className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
               <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid - Asymmetrical Layout */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-24 gap-x-8 md:gap-x-12"
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ 
                  opacity: { duration: 0.4 },
                  layout: { type: 'spring', stiffness: 200, damping: 25 },
                  delay: idx * 0.05 
                }}
                className={idx % 2 === 0 ? "lg:mt-12" : ""}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-40 text-center space-y-8">
           <p className="text-4xl font-black text-black/5 uppercase tracking-tighter italic">No records matches criteria.</p>
           <button 
             onClick={() => setSearchQuery('')}
             className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-400 pb-1"
           >
             Clear Curation Filter
           </button>
        </div>
      )}
    </div>
  );
}
