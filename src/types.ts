export interface Product {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: 'Electronics' | 'Fashion' | 'Home & Kitchen' | 'Beauty' | 'Fitness' | 'Gadgets' | 'Accessories' | 'Lifestyle';
  tags: string[];
  features: string[];
  meta_title: string;
  meta_description: string;
  affiliate_link: string;
  images: string[];
  price: number;
  currency: string;
  createdAt: any;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt'>;
