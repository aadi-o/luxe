import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isMock } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Hardcoded Administrative Credentials
    const ADMIN_USER = 'ashu';
    const ADMIN_PASS = 'aayush99';

    setTimeout(() => {
      if (email === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem('luxe_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid Security Key or Access ID. Access Denied.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem]"
      >
        <div className="text-center mb-10 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50/50 text-blue-600 rounded-[1.25rem] md:rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 glass border-white/40">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2 md:mb-3">Admin Portal</h1>
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">LUXE Management Authentication</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-5 bg-red-50/50 text-red-600 rounded-2xl flex items-start space-x-4 text-xs font-bold glass"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2" htmlFor="access-id">Access ID</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="access-id"
                type="text"
                required={!isMock}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white/50 rounded-2xl focus:bg-white/80 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all outline-none font-medium placeholder:text-gray-300"
                placeholder="Secure ID"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2" htmlFor="security-key">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="security-key"
                type="password"
                required={!isMock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white/50 rounded-2xl focus:bg-white/80 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all outline-none font-medium placeholder:text-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-black text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center space-x-3 hover:bg-gray-800 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 active:shadow-none active:translate-y-0 disabled:opacity-50 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            ) : (
              <>
                <span>Establish Session</span>
                <LogIn className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

      </motion.div>
    </div>
  );
}

