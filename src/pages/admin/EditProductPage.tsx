import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Save, 
  X, 
  Image as ImageIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  Trash2,
  Upload
} from 'lucide-react';
import { generateProductContent } from '../../lib/gemini';
import { ProductInput, Product } from '../../types';
import { cn } from '../../lib/utils';
import { getProductById, updateProduct, deleteProduct } from '../../lib/store';

const CATEGORIES = [
  'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Fitness', 'Gadgets', 'Accessories', 'Lifestyle'
];

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [formData, setFormData] = React.useState<Partial<Product>>({});

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setIsLoading(true);
        const product = await getProductById(id);
        if (product) {
          setFormData(product);
          setIsLoading(false);
        } else {
          alert('Product not found');
          navigate('/admin/dashboard');
        }
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleGenerate = async () => {
    if (!formData.title || !formData.affiliate_link) {
      alert('Please enter a title and affiliate link first.');
      return;
    }

    setIsGenerating(true);
    try {
      const generated = await generateProductContent(formData.title, formData.affiliate_link);
      setFormData(prev => ({
        ...prev,
        ...generated,
        affiliate_link: formData.affiliate_link 
      }));
    } catch (error) {
      console.error(error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData.title || !formData.affiliate_link || !formData.description) {
      alert('Missing required fields. Please ensure Title, Link, and Description are present.');
      return;
    }
    
    setIsGenerating(true);
    try {
      await updateProduct(id, formData as ProductInput);
      alert('Product updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error updating product.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      await deleteProduct(id);
      alert('Product deleted.');
      navigate('/admin/dashboard');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 1000;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setFormData(prev => ({
              ...prev,
              images: [...(prev.images || []), dataUrl]
            }));
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      // Clear input
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="flex items-center justify-between mb-12">
        <button onClick={() => navigate('/admin/dashboard')} className="group flex items-center text-sm font-semibold text-gray-500 hover:text-black">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Dashboard
        </button>
        <div className="flex space-x-4">
           <button 
             onClick={handleDelete}
             className="px-6 py-2 bg-red-50 text-red-600 rounded-xl font-bold flex items-center hover:bg-red-100 transition-all"
           >
             <Trash2 className="w-4 h-4 mr-2" />
             Delete
           </button>
           <button 
             onClick={handleSave}
             className="px-6 py-2 bg-black text-white rounded-xl font-bold flex items-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/10"
           >
             <Save className="w-4 h-4 mr-2" />
             Save Changes
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Main Controls */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-xl font-bold flex items-center uppercase tracking-tight">
              Edit Information
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Product Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Affiliate Link</label>
                <input
                  type="url"
                  value={formData.affiliate_link}
                  onChange={e => setFormData({ ...formData, affiliate_link: e.target.value })}
                  placeholder="https://amazon.com/dp/..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Currency</label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={e => setFormData({ ...formData, currency: e.target.value })}
                    placeholder="USD"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all",
                    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
                    isGenerating && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span className="uppercase tracking-widest text-xs font-black">{isGenerating ? 'Gemini is rewriting...' : 'Refresh with AI'}</span>
                </button>
              </div>
            </div>
          </section>

          <AnimatePresence>
            {formData.description && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold uppercase tracking-tight">Content Details</h2>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={formData.short_description}
                      onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all resize-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Main Description</label>
                    <textarea
                      rows={6}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Category</label>
                        <div className="relative">
                          <select 
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all appearance-none font-medium"
                          >
                            <option value="">Select...</option>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Slug</label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={e => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                     </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center uppercase tracking-tight text-sm">
                  <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
                  Product Media
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {formData.images?.length || 0} Images
                </span>
              </div>
              
              <div className="space-y-4">
                <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-2xl hover:border-black/10 hover:bg-gray-50/50 transition-all cursor-pointer overflow-hidden">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 mb-2 text-gray-300 group-hover:text-black transition-colors" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                        Upload Artifacts
                      </p>
                   </div>
                   <input 
                     type="file" 
                     className="hidden" 
                     accept="image/*" 
                     multiple 
                     onChange={handleFileUpload}
                   />
                </label>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
                    <span className="bg-white px-3 text-gray-300">or link</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="url"
                    id="image-url-input-edit"
                    placeholder="URL..."
                    className="flex-grow text-[10px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black transition-all font-medium uppercase tracking-widest placeholder:text-gray-300"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (val) {
                          setFormData({ ...formData, images: [...(formData.images || []), val] });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('image-url-input-edit') as HTMLInputElement;
                      if (input.value) {
                        setFormData({ ...formData, images: [...(formData.images || []), input.value] });
                        input.value = '';
                      }
                    }}
                    className="px-3 py-2 bg-black text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                 {formData.images?.map((img, i) => (
                   <div key={i} className="aspect-square rounded-xl overflow-hidden relative group border border-gray-100">
                      <img src={img} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <div className="flex items-center space-x-2">
                           <button 
                             onClick={(e) => {
                               e.preventDefault();
                               if (i > 0) {
                                 const newImages = [...(formData.images || [])];
                                 [newImages[i - 1], newImages[i]] = [newImages[i], newImages[i - 1]];
                                 setFormData({ ...formData, images: newImages });
                               }
                             }}
                             disabled={i === 0}
                             className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30"
                           >
                             <ChevronLeft className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={(e) => {
                               e.preventDefault();
                               setFormData({ ...formData, images: formData.images?.filter((_, index) => index !== i) });
                             }}
                             className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={(e) => {
                               e.preventDefault();
                               if ((formData.images || []).length - 1 > i) {
                                 const newImages = [...(formData.images || [])];
                                 [newImages[i + 1], newImages[i]] = [newImages[i], newImages[i + 1]];
                                 setFormData({ ...formData, images: newImages });
                               }
                             }}
                             disabled={i === (formData.images?.length || 0) - 1}
                             className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30"
                           >
                             <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                        {i === 0 && <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Primary</span>}
                      </div>
                   </div>
                 ))}
                 {(formData.images?.length || 0) === 0 && (
                   <div className="col-span-2 py-12 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-10" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Awaiting<br/>Visual Evidence</span>
                   </div>
                 )}
              </div>
           </section>

           <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold uppercase tracking-tight text-sm">Optimization</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Tags (CSV)</label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ')}
                    onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
