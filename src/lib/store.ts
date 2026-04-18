import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db, isMock } from './firebase';
import { Product, ProductInput } from '../types';

const COLLECTION_NAME = 'products';

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
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(document => {
      const data = document.data();
      return {
        ...data,
        id: document.id,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
      } as Product;
    });
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
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return undefined;
    const document = querySnapshot.docs[0];
    const data = document.data();
    return {
      ...data,
      id: document.id,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
    } as Product;
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
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return undefined;
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
    } as Product;
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
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...input,
      createdAt: serverTimestamp()
    });
    const newDoc = await getDoc(docRef);
    const data = newDoc.data()!;
    return {
      ...data,
      id: newDoc.id,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString()
    } as Product;
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
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp()
    });
    const updated = await getProductById(id);
    if (!updated) throw new Error('Product not found after update');
    return updated;
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
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
