import { Product, ProductInput } from '../types';

const STORAGE_KEY = 'luxe_products_v1';

const INITIAL_PRODUCTS: Product[] = [
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

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return getProducts().find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const addProduct = (input: ProductInput): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newProduct, ...products];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newProduct;
};

export const updateProduct = (id: string, input: Partial<ProductInput>): Product => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');
  
  const updatedProduct = {
    ...products[index],
    ...input,
    updatedAt: new Date().toISOString(),
  } as Product;
  
  const updatedProducts = [...products];
  updatedProducts[index] = updatedProduct;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  return updatedProduct;
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
