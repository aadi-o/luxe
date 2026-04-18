import React from 'react';
import Navbar from './Navbar';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <div className="max-w-[1550px] mx-auto px-6 md:px-16 py-8 md:py-12">
          {children}
        </div>
      </main>
      <footer className="py-20 md:py-24 border-t border-black/5">
        <div className="max-w-[1550px] mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start space-y-4">
              <span className="text-sm font-black tracking-[0.4em] uppercase">LUXE • 2026</span>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                Studio Authorized Premium Curation
              </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
             {['Journal', 'Archive', 'Terms'].map(link => (
               <span key={link} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black cursor-pointer transition-colors px-2 py-1">
                 {link}
               </span>
             ))}
          </div>

          <div className="text-[9px] font-black uppercase tracking-widest text-gray-300">
            © CURATED BY LUXE INC.
          </div>
        </div>
      </footer>
    </div>
  );
}
