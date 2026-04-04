export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  colors: string[];
  availableSizes: string[];
  price: number;
  rating: number;
  salesCount: number;
  createdAt: string;
  images: { url: string; order: number; primary: string; type: string }[];
  tags: string[];
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  tags: string[];
  brand: string;
  category: string;
  audience: string[];
  colors: string[];
  sizes: string[];
  images: ProductImage[];
  price: Price;
  inventory: Inventory;
  createdAt: string; // ISO string (can use Date if you parse it)
}

export interface ProductImage {
  url: string;
  type: 'FRONT' | 'BACK' | string; // extendable
  order: number;
  primary: boolean;
}

export interface Price {
  amount: number;
  currency: string;
  discountPrice?: number; // optional
}

export interface Inventory {
  stockBySize: Record<string, number>; // Map<String, Integer>
  inStock: boolean;
  availableSizes: string[];
}
