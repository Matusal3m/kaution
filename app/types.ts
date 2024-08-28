export interface ProductProps {
  name: string;
  description?: string;
  quantity: number;
  categoryId: string;
}

export interface CategoryProps {
  name: string;
  products: ProductProps[];
}

export type Product = {
  id?: string;
  name: string;
  description?: string;
  quantity?: number;
  category?: Category;
  categoryId?: string;
  created?: Date;
  uptadeAt?: Date;
};
 
export type Category = {
  id?: string;
  name: string;
  description?: string;
  user?: User;
  userId?: string;
  products?: Product[];
  created?: Date;
  uptadeAt?: Date;
}
export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  isVerified?: boolean;
  verificationCode?: string;
  verificationExpire: Date;
  categories?: Category[];
  created?: Date;
  uptadeAt?: Date;
  AuthCode?: AuthCode;
};

export type AuthCode = {
  id: string;
  userId: string;
  code: string;
  expire: Date;
  created: Date;
  user: User;
};
