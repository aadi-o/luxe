import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;
  
  return (
    <div className="block group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 glass border-white/60 p-2.5 reflective-surface gloss-highlight smooth-shadow">
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="w-full h-full rounded-[2.1rem] overflow-hidden relative shadow-sm"
          >
            <img 
              src={product.images[0]} 
              alt={product.title} 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute bottom-8 left-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] z-10">
               <div className="px-8 py-3 bg-white/95 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] glass-dark border-white/30 backdrop-blur-xl">
                 Shop Now
               </div>
            </div>
          </motion.div>
          
          {/* Badge */}
          <div className="absolute top-8 left-8">
            <span className="px-5 py-2 glass text-[9px] font-black uppercase tracking-[0.2em] text-black/80 rounded-full border-white/60 reflective-surface gloss-highlight">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="mt-8 px-4 space-y-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.slug}`} className="flex-grow">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors uppercase leading-[1.1] break-words line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-black transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-black tracking-tight text-gray-900">
            {product.currency || 'USD'} {(product.price || 0).toLocaleString()}
          </span>
          <div className="h-[1px] flex-grow bg-black/5" />
        </div>
        <p className="text-sm text-gray-400 font-medium leading-relaxed italic line-clamp-1 border-l-2 border-black/5 pl-4">
          {product.short_description}
        </p>
      </div>
    </div>
  );
}
