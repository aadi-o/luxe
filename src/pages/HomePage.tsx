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

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const featuredProduct = products[0];
  
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

            {/* Floating Glassmorphism Hero Stack */}
            <div className="relative w-full max-w-4xl aspect-video md:aspect-[21/9] mt-8 flex justify-center items-center">
               
               {/* Background Left Card */}
               <motion.div 
                 animate={{ y: [0, -10, 0], rotate: [-8, -8, -8], x: [-100, -100, -100] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                 className="absolute glass w-[50%] md:w-[35%] aspect-[3/4] shadow-xl opacity-60 z-0 origin-bottom flex flex-col p-4 glow-purple backdrop-blur-3xl"
               >
                  <div className="w-full h-3/5 rounded-xl overflow-hidden opacity-70 grayscale bg-black/5">
                     {products[1]?.images?.[0] ? <img src={products[1].images[0]} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="mt-4 flex flex-col items-center opacity-70">
                    <div className="h-4 w-1/2 bg-black/10 rounded-full mb-2"></div>
                    <div className="h-4 w-1/3 bg-black/10 rounded-full"></div>
                  </div>
               </motion.div>

               {/* Background Right Card */}
               <motion.div 
                 animate={{ y: [0, -15, 0], rotate: [8, 8, 8], x: [100, 100, 100] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 className="absolute glass w-[50%] md:w-[35%] aspect-[3/4] shadow-xl opacity-60 z-0 origin-bottom flex flex-col p-4 glow-purple backdrop-blur-3xl"
               >
                  <div className="w-full h-3/5 rounded-xl overflow-hidden opacity-70 grayscale bg-black/5">
                     {products[2]?.images?.[0] ? <img src={products[2].images[0]} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="mt-4 flex flex-col items-center opacity-70">
                    <div className="h-4 w-1/2 bg-black/10 rounded-full mb-2"></div>
                    <div className="h-4 w-1/3 bg-black/10 rounded-full"></div>
                  </div>
               </motion.div>

               {/* Center Main Card */}
               <motion.div 
                 animate={{ y: [0, -20, 0], scale: [1.05, 1.05, 1.05] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute glass w-[60%] md:w-[40%] aspect-[3/4] z-10 glow-purple flex flex-col p-4 md:p-6 backdrop-blur-3xl"
               >
                  <div className="w-full h-2/3 rounded-[18px] flex-shrink-0 overflow-hidden relative mb-4 shadow-sm bg-black/5">
                    <img 
                      src={featuredProduct?.images?.[0] || "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"} 
                      alt="Featured" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4">
                      <div className="text-black bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">{featuredProduct?.category || "Lifestyle"}</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between items-center text-center px-2">
                     <h3 className="text-xl md:text-2xl font-bold text-black leading-tight line-clamp-2">{featuredProduct?.title || "Product Title"}</h3>
                     <Link to={featuredProduct ? `/product/${featuredProduct.slug}` : "/shop"} className="btn-accent px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform w-[90%] md:w-auto mt-4 active:scale-95">
                        {featuredProduct?.currency || "USD"} {featuredProduct?.price || "199"}
                     </Link>
                  </div>
               </motion.div>
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