import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="block group h-full"
      style={{ willChange: 'transform' }}
    >
      <Link to={`/product/${product.slug}`} className="block h-full glass p-4 flex flex-col hover:border-black/5 transition-colors duration-300">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6 shadow-inner bg-gray-100 transform-gpu">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[800ms] ease-[0.16,1,0.3,1] grayscale-[0.2] group-hover:grayscale-0 will-change-transform"
            />
            {/* Soft gradient bottom for badge contrast */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Category Badge Floating */}
            <div className="absolute top-4 left-4">
              <span className="glass px-3 py-1 text-[10px] font-semibold text-black tracking-widest uppercase rounded flex items-center backdrop-blur-md">
                {product.category}
              </span>
            </div>

            {/* Hover Action Glow */}
            <div className="absolute inset-0 bg-[#AD1DEB]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex-grow flex flex-col justify-between space-y-4 px-2">
          <div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                {product.title}
              </h3>
              <div className="p-2 glass rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                <ArrowUpRight className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-2 line-clamp-2">
              {product.short_description}
            </p>
          </div>
          
          <div className="pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-lg font-bold text-black tracking-tight">
              ₹ {(product.price || 0).toLocaleString('en-IN')}/-
            </span>
            <span className="text-xs font-medium text-gray-400 group-hover:text-black transition-colors tracking-wide uppercase">
              View Info
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="block h-full glass p-4 flex flex-col pointer-events-none">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6 shadow-inner bg-gray-200/50 animate-pulse"></div>
      
      <div className="flex-grow flex flex-col justify-between space-y-4 px-2">
        <div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="w-3/4 h-6 md:h-8 bg-gray-200/60 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="w-full h-4 bg-gray-200/50 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-gray-200/50 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-black/5 flex items-center justify-between">
          <div className="w-1/3 h-6 md:h-7 bg-gray-200/60 rounded animate-pulse"></div>
          <div className="w-1/4 h-3 bg-gray-200/50 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
