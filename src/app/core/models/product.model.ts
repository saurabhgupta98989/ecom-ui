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
