import { Product } from './product';
import { CartItemStatus } from '../models/cart-status'; // Importa el tipo seguro

export interface CartItem {
  id: number;
  productDetails?: Product; // Cambia 'product' por 'productDetails'
  price: number;
  quantity: number;
  status: CartItemStatus; // Usa el tipo seguro
}