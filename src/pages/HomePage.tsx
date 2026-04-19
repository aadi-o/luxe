import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Box, 
  Globe, 
  Heart, 
  CheckCircle2,
  ChevronRight,
  Shield,
  Zap,
  Cpu,
  Star,
  Package,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/store';

export default function HomePage() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const heroProducts = products.length > 0 ? products.slice(0, 5) : [];
  const featuredProduct = heroProducts[currentIndex] || products[0];

  const handleDragEnd = (event: any, info: any) => {
    if (heroProducts.length <= 1) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    } else if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
    }
  };

  const getRelativePosition = (idx: number) => {
    const length = heroProducts.length;
    if (length === 0) return 0;
    let diff = (idx - currentIndex) % length;
    if (diff < -Math.floor(length / 2)) diff += length;
    if (diff > Math.floor(length / 2)) diff -= length;
    return diff;
  };
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative selection:bg-black/10 selection:text-black min-h-screen">
      {loading ? (
        <div className="min-h-[100dvh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-black/10 border-t-black text-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Background Blobs for depth */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6E72FC] blob mix-blend-multiply pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#AD1DEB] blob mix-blend-multiply pointer-events-none" />
          
          {/* Abstract Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
             <h2 className="text-faded text-center leading-[0.8] font-bold">WELLBEING<br/>APPLICATION</h2>
          </div>

          {/* Hero Section */}
          <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-20 px-6 relative z-10 w-full overflow-hidden">
            
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700 bg-black/5 px-4 py-2 rounded-xl backdrop-blur-md border border-black/5">
                Featured Discoveries
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black max-w-4xl mx-auto leading-tight">
                {featuredProduct?.title || "Premium Essentials"}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {featuredProduct?.short_description || "A curated collection of digital and physical artifacts designed for human well-being."}
              </p>
            </div>

            {/* Interactive Swipeable Phone Carousel */}
            <div className="relative w-[100vw] max-w-[100vw] h-[600px] md:h-[700px] mt-12 mb-8 flex justify-center items-center overflow-hidden" style={{ perspective: 1200, contain: 'layout size' }}>
               {heroProducts.map((product, idx) => {
                 const diff = getRelativePosition(idx);
                 const isCenter = diff === 0;
                 const isVisible = Math.abs(diff) <= 1;

                 return (
                   <motion.div
                     key={product.id}
                     drag={isCenter ? "x" : false}
                     dragConstraints={{ left: 0, right: 0 }}
                     dragElastic={0.15}
                     onDragEnd={handleDragEnd}
                     animate={{
                       x: diff * (typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 360),
                       scale: isCenter ? 1 : 0.85,
                       opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                       zIndex: isCenter ? 20 : 10,
                       rotateZ: diff * 5,
                     }}
                     transition={{
                       type: "spring",
                       stiffness: 400,
                       damping: 35,
                       mass: 0.8
                     }}
                     className={`absolute w-[260px] h-[550px] md:w-[320px] md:h-[650px] rounded-[3rem] border-[8px] md:border-[12px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] glass bg-white/90 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing ${!isCenter ? "pointer-events-none" : ""}`}
                     style={{ touchAction: 'pan-y', willChange: 'transform, opacity, z-index' }}
                   >
                     {/* Notch */}
                     <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-20 md:w-28 h-5 md:h-7 bg-black rounded-full z-[100] flex items-center justify-end px-3">
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                     </div>
                     
                     {/* App UI */}
                     <div className="relative w-full h-[55%] bg-[#f5f5f7] flex items-center justify-center p-6 border-b border-black/5 mt-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover rounded-2xl drop-shadow-xl select-none" 
                          draggable="false"
                        />
                     </div>
                     
                     <div className="flex-grow p-4 md:p-6 flex flex-col justify-between bg-white text-center">
                        <div>
                           <div className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{product.category}</div>
                           <h3 className="text-xl md:text-2xl font-black mt-2 leading-[1.1] tracking-tight line-clamp-2 md:line-clamp-3">{product.title}</h3>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                           <div className="text-xl md:text-2xl font-black text-gray-900">₹ {(product.price || 0).toLocaleString('en-IN')}/-</div>
                           
                           {isCenter && (
                             <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest animate-pulse flex justify-center items-center space-x-2">
                               <span>←</span><span>Swipe to Explore</span><span>→</span>
                             </div>
                           )}

                           <div className="w-full h-[1px] bg-black/5" />
                           
                           <Link 
                             to={`/product/${product.slug}`} 
                             className="block w-full py-3 md:py-4 bg-black text-white rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
                             onPointerDown={(e) => e.stopPropagation()}
                             draggable="false"
                           >
                             View Artifact
                           </Link>
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
            </div>
            
          </section>

          {/* Rest of the page - simple minimal grid */}
          <section className="py-24 px-6 relative z-10">
            <div className="max-w-[1400px] mx-auto space-y-12">
              <div className="flex justify-between items-end border-b border-black/5 pb-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Recent Artifacts</h2>
                <Link to="/shop" className="btn-glass flex items-center text-sm font-medium hover:bg-black/5 transition-all active:scale-95 text-black">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(1, 7).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}