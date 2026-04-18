import { supabase, isMock } from './supabase';
import { Product, ProductInput } from '../types';

const TABLE_NAME = 'products';

// Fallback initial products if database is empty and in mock mode
const INITIAL_PRODUCTS : Product[] = [
  {
    id: '1',
    title: 'Minimalist Leather Carryall',
    slug: 'minimalist-leather-carryall',
    short_description: 'A handcrafted, full-grain leather bag designed for the modern professional seeking both style and utility.',
    description: 'Elevate your daily commute with our Minimalist Leather Carryall. Crafted from premium full-grain leather that develops a beautiful patina over time, this bag features a spacious main compartment, dedicated laptop sleeve, and multiple internal pockets for organization. The adjustable shoulder strap and reinforced handles ensure comfort and durability, making it the perfect companion for work or weekend travel. Simple aesthetics meet rugged construction for a timeless piece that complements any wardrobe.',
    category: 'Accessories',
    tags: ['leather', 'bag', 'travel', 'fashion', 'premium'],
    features: [
      'Genuine full-grain leather',
      '15-inch laptop compartment',
      'Water-resistant lining',
      'Adjustable leather shoulder strap'
    ],
    meta_title: 'Minimalist Leather Carryall | Premium Travel Bag',
    meta_description: 'Discover the ultimate minimalist leather bag. Handcrafted quality for the modern professional.',
    affiliate_link: 'https://example.com/leather-carryall',
    images: ['https://picsum.photos/seed/bag/800/600'],
    price: 450,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  }
];

export const getProducts = async (): Promise<Product[]> => {
  if (isMock) {
    const stored = localStorage.getItem('luxe_products_v1');
    if (!stored) {
      localStorage.setItem('luxe_products_v1', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  if (isMock) {
    return (await getProducts()).find(p => p.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data || undefined;
  } catch (error) {
    console.error("Error getting product by slug:", error);
    return undefined;
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  if (isMock) {
    return (await getProducts()).find(p => p.id === id);
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data || undefined;
  } catch (error) {
    console.error("Error getting product by id:", error);
    return undefined;
  }
};

export const addProduct = async (input: ProductInput): Promise<Product> => {
  if (isMock) {
    const products = await getProducts();
    const newProduct: Product = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('luxe_products_v1', JSON.stringify([newProduct, ...products]));
    return newProduct;
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{
        ...input,
        createdAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, input: Partial<ProductInput>): Promise<Product> => {
  if (isMock) {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    const updatedProduct = { ...products[index], ...input, updatedAt: new Date().toISOString() } as Product;
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    localStorage.setItem('luxe_products_v1', JSON.stringify(updatedProducts));
    return updatedProduct;
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (isMock) {
    const products = await getProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem('luxe_products_v1', JSON.stringify(updated));
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
