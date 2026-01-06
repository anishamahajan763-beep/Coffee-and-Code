export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Route {
  path: string;
  name: string;
  component: React.ComponentType;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  batches: Batch[];
}

export interface Batch {
  id: string;
  expiryDate: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
}
