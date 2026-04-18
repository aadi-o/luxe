import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  Package, 
  Tag, 
  LayoutGrid, 
  TrendingUp, 
  Users, 
  ExternalLink,
  MoreVertical,
  Edit,
  Trash,
  Search,
  ShoppingCart,
  LineChart,
  Info
} from 'lucide-react';
import { getProducts, deleteProduct } from '../../lib/store';

export default function DashboardPage() {
  const [products, setProducts] = React.useState(getProducts());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'overview' | 'shop'>('overview');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    // Iframe environment blocks native confirm dialogs, using direct deletion.
    deleteProduct(id);
    setProducts(getProducts());
  };

  const stats = [
    { name: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { name: 'Categories', value: '8', icon: LayoutGrid, color: 'bg-orange-50 text-orange-600' },
    { name: 'Monthly Views', value: '2.4k', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { name: 'Unique Trailing', value: '184', icon: Users, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-2">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black tracking-tighter text-gray-900 uppercase"
          >
            Management
          </motion.h1>
          <div className="flex items-center mt-4 space-x-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-black text-white shadow-lg' : 'bg-white/50 text-gray-400 hover:bg-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('shop')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'shop' ? 'bg-black text-white shadow-lg' : 'bg-white/50 text-gray-400 hover:bg-white'}`}
            >
              Inventory
            </button>
          </div>
        </div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
        >
          <Link
            to="/admin/add-product"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 group"
          >
            <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            Add New Product
          </Link>
        </motion.div>
      </header>

      {activeTab === 'overview' ? (
        <motion.div 
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="glass p-8 rounded-[2.5rem] flex items-center space-x-6 group hover:translate-y-[-4px] transition-all duration-500"
              >
                <div className={`p-4 rounded-2xl ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.name}</p>
                  <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Website Info / Brief */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass p-12 rounded-[3rem] space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">Platform Status</h2>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">
                Your luxury affiliate storefront is currently operating at optimal efficiency. 
                Recent design upgrades have increased user engagement by 24% across mobile devices. 
                The "Glassmorphism" theme is now fully deployed across all primary routes.
              </p>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white/40 rounded-3xl border border-white/40 hover:bg-white/60 transition-colors">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Build Version</p>
                  <p className="font-bold text-gray-900">v2.4.0 (Aero)</p>
                </div>
                <div className="p-6 bg-white/40 rounded-3xl border border-white/40 hover:bg-white/60 transition-colors">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Design System</p>
                  <p className="font-bold text-gray-900">iOS Glossy</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-12 rounded-[3rem] flex flex-col justify-between group">
              <div>
                <LineChart className="w-12 h-12 text-gray-900 mb-8 mt-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black tracking-tight mb-4 uppercase">System Insights</h3>
                <p className="text-sm text-gray-500 font-medium leading-loose">
                  Product visibility is currently high. Continue adding premium imagery to maintain brand authority.
                </p>
              </div>
              <div className="mt-8">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-3">Health Score: 85%</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Inventory / Shop Section */
        <motion.section 
          key="inventory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2.5rem] overflow-hidden"
        >
          <div className="px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/30">
            <div>
              <h3 className="font-extrabold text-xl tracking-tight">Active Inventory</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-grow max-w-2xl">
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text"
                  placeholder="Filter listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-white/50 border border-white/50 rounded-2xl outline-none focus:bg-white/80 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-medium placeholder:text-gray-400"
                />
              </div>
              <div className="flex space-x-3">
                 <button className="px-5 py-3 text-sm font-bold bg-white/50 border border-white/50 rounded-2xl hover:bg-white/80 transition-colors">Filters</button>
                 <button className="px-5 py-3 text-sm font-bold bg-white/50 border border-white/50 rounded-2xl hover:bg-white/80 transition-colors">Export</button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[700px] overscroll-contain hidden md:block hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-black/5">
                <tr>
                  <th className="px-10 py-6">Product & Details</th>
                  <th className="px-6 py-6 text-center">Category</th>
                  <th className="px-6 py-6 text-center">Visibility</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredProducts.map((product, idx) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                    className="group hover:bg-white/60 active:bg-white/80 transition-all duration-200 cursor-default"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-gray-100/50 p-1 shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                          <img src={product.images[0]} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-[1.2rem]" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900 leading-tight">{product.title}</p>
                          <div className="flex items-center mt-1.5 space-x-3">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                              {product.tags[0]}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold flex items-center">
                              <Tag className="w-3 h-3 mr-1" />
                              {product.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-sm font-semibold text-gray-500">{product.category}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-green-100/50 text-green-700 border border-green-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                        Live
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right w-40">
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Link 
                          to={`/admin/edit-product/${product.id}`}
                          title="Edit" 
                          className="p-3 bg-white/50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-white/50 rounded-2xl transition-all hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          title="Delete" 
                          className="p-3 bg-white/50 text-gray-500 hover:text-red-600 hover:bg-red-50 border border-white/50 rounded-2xl transition-all hover:scale-110"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Inventory View */}
          <div className="md:hidden divide-y divide-white/10 px-6 py-4">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="py-6 space-y-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100/50 p-1 flex-shrink-0">
                    <img src={product.images[0]} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-gray-900 truncate uppercase tracking-tight">{product.title}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200/50">
                        Live
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <Link 
                    to={`/admin/edit-product/${product.id}`}
                    className="flex-grow flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-white/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 active:bg-black active:text-white transition-all shadow-sm"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Manage</span>
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-3 bg-red-50/50 text-red-600 border border-red-100/50 rounded-xl active:bg-red-600 active:text-white transition-all shadow-sm"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
