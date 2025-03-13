import { Product } from './product';

export interface CartItem {
  product?: Product; // Producto añadido al carrito (opcional)
  price: number;     // Precio del producto
  quantity: number;  // Cantidad del producto
  status: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'; // Estado del producto
}