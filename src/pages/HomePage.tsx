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
  const products = getProducts();
  const featuredProduct = products[0];
  
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#FBFBFB] selection:bg-black selection:text-white overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION - DYNAMIC PRODUCT TIE-IN */}
      <section className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 px-6 relative overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-black/10" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Featured Curation</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-tight leading-[1] uppercase text-black break-words hyphens-auto">
                {featuredProduct?.title || "Premium Essentials."}
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed max-w-lg">
                {featuredProduct?.short_description || "Discover a hand-picked curation of modern tools and lifestyle products, engineered to elevate your everyday life."}
              </p>
            </div>

            <div className="flex flex-col gap-5 py-4 border-l-2 border-black/5 pl-6 mt-4">
              <div className="flex items-center text-xs font-black tracking-widest uppercase text-gray-700">
                <CheckCircle2 className="w-5 h-5 mr-4 text-black" /> Secure Global Shipping
              </div>
              <div className="flex items-center text-xs font-black tracking-widest uppercase text-gray-700">
                <CheckCircle2 className="w-5 h-5 mr-4 text-black" /> 100% Authenticity Guaranteed
              </div>
              <div className="flex items-center text-xs font-black tracking-widest uppercase text-gray-700">
                <CheckCircle2 className="w-5 h-5 mr-4 text-black" /> Unparalleled Support Access
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                to={featuredProduct ? `/product/${featuredProduct.slug}` : "/shop"}
                className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl shadow-black/20 group flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
          >
             <div className="relative aspect-[4/5] w-full max-w-md md:max-w-lg glass rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 shadow-2xl reflective-surface gloss-highlight overflow-hidden">
                <img 
                  src={featuredProduct?.images?.[0] || "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={featuredProduct?.title || "Premium Workspace curation"} 
                  className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[1.5rem] md:rounded-[2.5rem]" />
                
                <div className="absolute bottom-10 left-10 text-white z-10 pointer-events-none">
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">Curated By Luxe</div>
                   <div className="text-xl md:text-2xl font-black uppercase tracking-tight">Est. 2026</div>
                </div>
             </div>
             
             {/* Floating Quality Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -top-6 md:-top-10 -right-6 md:-right-10 glass p-6 md:p-8 rounded-full shadow-2xl border-white/60 z-20 backdrop-blur-3xl"
             >
                <div className="text-center">
                   <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-600">Quality</div>
                   <div className="text-xl md:text-2xl font-black text-black">100%</div>
                </div>
             </motion.div>
          </motion.div>
        </div>

        {/* Abstract Backdrop Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden">
           <h2 className="text-[30vw] md:text-[40vw] font-black uppercase tracking-tighter mix-blend-multiply">LUXE</h2>
        </div>
      </section>

      {/* 2. FEATURED PRODUCT SHOWCASE */}
      <section className="py-32 md:py-64 bg-[#FBFBFB] px-6">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="text-center space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Best Seller</span>
             <h2 className="text-5xl md:text-[6.5rem] font-black tracking-tighter uppercase leading-none">The Best <br/> Gear.</h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative lg:aspect-[21/9] rounded-[3rem] md:rounded-[5rem] overflow-hidden glass p-4 shadow-2xl reflective-surface gloss-highlight group"
          >
            <div className="w-full h-full rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden relative">
              <img 
                src={featuredProduct?.images[0]} 
                alt="Featured Product" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
              
              <div className="absolute bottom-12 md:bottom-20 left-12 md:left-20 max-w-xl space-y-8">
                 <div className="glass px-6 py-2 rounded-full inline-block backdrop-blur-3xl border-white/30">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Best of 2026</span>
                 </div>
                 <h3 className="text-4xl md:text-7xl font-black text-white uppercase leading-none">{featuredProduct?.title}</h3>
                 <Link 
                   to={`/product/${featuredProduct?.slug}`}
                   className="inline-flex items-center px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all shadow-xl"
                 >
                   Shop Now <ArrowRight className="ml-3 w-4 h-4" />
                 </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CATEGORY NAV - CLEAN & SCANABLE */}
      <section className="py-24 border-y border-black/5 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
             {['Electronics', 'Accessories', 'Lifestyle', 'Fashion'].map((cat) => (
                <Link 
                  key={cat}
                  to={`/shop?category=${cat}`}
                  className="group relative px-4 py-2"
                >
                   <span className="text-sm md:text-xl font-black uppercase tracking-tight text-gray-400 group-hover:text-black transition-colors">{cat}</span>
                   <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500" />
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT GRID */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-[#FBFBFB]">
        <div className="max-w-[1400px] mx-auto space-y-20">
          <div className="flex justify-between items-end border-b border-black/5 pb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">New Products</h2>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center">
              View All <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {products.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS - APPLE STYLE GRID */}
      <section className="py-32 md:py-64 bg-black text-white px-6 overflow-hidden relative">
         <div className="max-w-[1400px] mx-auto space-y-32 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
               {[
                 { title: 'Global Shipping', desc: 'Fast delivery to over 140 countries world-wide.', icon: Globe },
                 { title: 'Safe Payments', desc: 'Secure encryption for every single purchase.', icon: Shield },
                 { title: 'Full Support', desc: 'Direct access to our specialists for all your needs.', icon: Zap }
               ].map((benefit, i) => (
                 <div key={i} className="space-y-8 group">
                    <div className="w-16 h-16 rounded-2xl glass-dark border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                       <benefit.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-2xl font-black uppercase tracking-tight">{benefit.title}</h3>
                       <p className="text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-12"
            >
               <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">Made for <br/> <span className="text-white/20">Everyone.</span></h2>
               <p className="text-xl md:text-3xl font-medium text-gray-400 leading-relaxed italic">
                 "Our mission is simple: To provide the world with products that work and look great."
               </p>
               <div className="flex justify-center pt-8">
                  <div className="h-[1px] w-40 bg-white/20" />
               </div>
            </motion.div>
         </div>
         
         {/* Backdrop pattern */}
         <div className="absolute inset-0 texture opacity-[0.03] pointer-events-none" />
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 md:py-64 bg-white px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Join Us</span>
            <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">Join the <br/> Club.</h2>
            <p className="text-xl text-gray-400 font-medium tracking-tight">Stay updated with our latest product drops and news.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link 
               to="/shop"
               className="px-16 py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl shadow-black/20"
             >
               Shop Now
             </Link>
             <button className="px-16 py-6 border border-black/10 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">
               Subscribe
             </button>
          </div>
        </div>
      </section>

      {/* Trust Badges - Horizontal Scroll / Grid */}
      <div className="py-12 bg-[#FBFBFB] border-t border-black/5 overflow-hidden">
         <div className="flex justify-center flex-wrap gap-12 md:gap-24 opacity-20 grayscale">
            {['VOGUE', 'WIRED', 'HYPEBEAST', 'GQ', 'LUXE'].map((brand) => (
              <span key={brand} className="text-2xl font-black tracking-widest uppercase italic">{brand}</span>
            ))}
         </div>
      </div>
    </div>
  );
}
