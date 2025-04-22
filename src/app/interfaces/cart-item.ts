import { Product } from './product';
import { CartItemStatus } from '../models/cart-status'; // Importa el tipo seguro

export interface CartItem {
  id: number;
  product?: Product;
  price: number;
  quantity: number;
  status: CartItemStatus; // Usa el tipo seguro
}