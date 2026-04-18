import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../lib/store';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<any>(null);
  const [related, setRelated] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await getProductBySlug(slug);
      setProduct(data);
      
      if (data) {
        const allProducts = await getProducts();
        const relatedItems = allProducts.filter(p => p.id !== data.id).slice(0, 2);
        setRelated(relatedItems);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-blue-600 mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12 md:space-y-16 max-w-[1600px] mx-auto px-6 md:px-12"
    >
      <Link 
        to="/" 
        className="inline-flex items-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start pb-8">
        {/* Product Images */}
        <div className="space-y-8 lg:sticky lg:top-32 h-fit">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-gray-50 glass border-white/60 p-2.5 relative group reflective-surface gloss-highlight smooth-shadow"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                src={product.images[activeImage]} 
                alt={product.title} 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover rounded-[2.2rem] md:rounded-[3.8rem]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
          
          {/* Gallery Thumbnails (if multiple images exist) */}
          {product.images.length > 1 && (
            <div className="flex flex-wrap gap-4 px-2">
               {product.images.map((img, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 + (idx * 0.1) }}
                   onClick={() => setActiveImage(idx)}
                   className={cn(
                     "w-20 h-20 rounded-2xl border transition-all cursor-pointer p-1 overflow-hidden reflective-surface gloss-highlight",
                     activeImage === idx ? "border-black bg-white shadow-2xl scale-110" : "border-white/40 bg-gray-100/50 opacity-40 hover:opacity-100"
                   )}
                 >
                   <img 
                     src={img} 
                     referrerPolicy="no-referrer" 
                     loading="lazy" 
                     decoding="async" 
                     className="w-full h-full object-cover rounded-xl" 
                   />
                 </motion.div>
               ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white/40 p-10 md:p-14 rounded-[3rem] md:rounded-[4.5rem] glass border-white/60 reflective-surface gloss-highlight smooth-shadow space-y-10 md:space-y-14 backdrop-blur-[60px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-5 py-2 glass text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8 rounded-full border-white/60 reflective-surface gloss-highlight">
              {product.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-[0.85] mb-8 uppercase">
              {product.title}
            </h1>
            <div className="flex items-center space-x-6 mt-4">
              <span className="text-4xl md:text-6xl font-black tracking-tighter text-black">
                {product.currency || 'USD'} {(product.price || 0).toLocaleString()}
              </span>
              <div className="h-0.5 flex-grow bg-black/5" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-10"
          >
            <div className="border-l-[1px] border-black/10 pl-8 md:pl-12">
              <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed italic max-w-2xl">
                {product.short_description}
              </p>
            </div>
            <p className="text-gray-600 leading-[1.8] text-base md:text-xl font-medium max-w-3xl">
              {product.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8 pt-4"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center">
              <Package className="w-5 h-5 mr-4" />
              Technical Specifications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {product.features.map(f => (
                <li key={f} className="flex items-center text-[11px] md:text-sm text-gray-700 font-bold bg-white/60 p-6 rounded-[2rem] glass border-white/60 reflective-surface gloss-highlight smooth-shadow">
                  <CheckCircle className="w-5 h-5 text-black mr-5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-10 flex flex-col sm:flex-row items-center gap-8"
          >
            <a 
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-12 md:px-16 py-6 border border-white/40 bg-black/95 text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all hover:bg-black hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-black glass-dark backdrop-blur-xl reflective-surface gloss-highlight"
            >
              SHOP NOW
              <ShoppingCart className="ml-5 w-5 h-5 md:w-6 md:h-6" />
            </a>
            
            <div className="flex gap-3 flex-wrap justify-center">
              {product.tags.map(tag => (
                <span key={tag} className="px-5 py-2.5 glass text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-full border-white/60 reflective-surface gloss-highlight">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pt-24 border-t border-white/20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Curation Favorites</h2>
            <Link to="/" className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center hover:translate-x-1 transition-transform">
              Explore All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map(p => (
              <Link to={`/product/${p.slug}`} key={p.id} className="group relative flex items-center space-x-8 glass p-6 rounded-[2.5rem] hover:shadow-2xl hover:shadow-black/10 transition-all hover:-translate-y-1">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                  <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{p.title}</h4>
                  <p className="text-sm text-gray-400 font-medium mt-2 line-clamp-1">{p.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
