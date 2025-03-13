import { Product } from './product';

export interface CartItem {
  product: Product; // Producto añadido al carrito
  quantity: number; // Cantidad del producto
  status: 'Pagado' | 'Enviado' | 'Recibido'; // Estado del producto
}