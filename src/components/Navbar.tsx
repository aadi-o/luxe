import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, LogIn, Menu, X, Lock, Box, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Box },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 overflow-hidden",
        scrolled 
          ? "m-0 rounded-none bg-white/70 backdrop-blur-[40px] border-b border-black/5" 
          : "m-4 md:m-8 lg:m-10 mt-6 md:mt-8 rounded-[1.25rem] md:rounded-[2rem] glass gloss-highlight reflective-surface"
      )}
    >
      <div className={cn(
        "max-w-[1600px] mx-auto px-6 md:px-8 transition-all duration-700 h-full",
        scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
      )}>
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 md:space-x-8 lg:space-x-10 group" aria-label="LUXE Home">
              <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-[0.3em] uppercase">LUXE</span>
              <div className="hidden md:block w-[1px] h-4 md:h-6 bg-black/10" />
              <div className="hidden xl:flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Curated Intelligence</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-black/20">Institutional Archive</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6 md:space-x-12">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-black focus-visible:ring-1 focus-visible:ring-black rounded px-2 py-1",
                    location.pathname === link.href ? "text-black opacity-100" : "text-gray-400 opacity-60 hover:opacity-100"
                  )}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="hidden md:block w-[1px] h-4 bg-black/10" />

            {/* Admin Lock - Desktop Only */}
            <Link 
              to={isAdminPath ? "/admin/dashboard" : "/admin/login"}
              className="hidden md:flex items-center space-x-2 group p-2.5 hover:bg-black hover:text-white rounded-full transition-all focus-visible:ring-2 focus-visible:ring-black outline-none"
              aria-label={isAdminPath ? "Admin Dashboard" : "Admin Login"}
            >
              <Lock className="w-4.5 h-4.5 text-gray-500 group-hover:text-white transition-colors" />
            </Link>

            {/* Mobile Shop Button */}
            <Link 
              to="/shop"
              className="md:hidden flex items-center px-4 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-black/20"
            >
              Shop Now
            </Link>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-black focus:outline-none p-2 rounded-xl active:bg-black/5"
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-6 py-10 space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] text-gray-600 bg-black/5 active:bg-black active:text-white transition-all shadow-sm active:shadow-none"
                  >
                    <div className="flex items-center space-x-6">
                      <link.icon className="w-6 h-6" />
                      <span>{link.name}</span>
                    </div>
                    <Plus className="w-5 h-5 opacity-20" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Link
                  to={isAdminPath ? "/admin/dashboard" : "/admin/login"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-6 p-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border border-black/5 active:bg-gray-50 transition-colors"
                >
                  <Lock className="w-6 h-6" />
                  <span>Administrative Login</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
