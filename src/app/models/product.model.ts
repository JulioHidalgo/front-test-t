export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
}
export interface Image {
  id: number;
  url: string;
}