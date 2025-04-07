// src/app/interfaces/product.ts
export interface Product {
  id: number; // ID del producto
  nombre: string; // Nombre del producto
  descripcion: string; // Descripción del producto
  precio: number; // Precio del producto
  ubicacion?: string; // Ubicación del producto (opcional)
  estado?: string; // Estado del producto (por ejemplo, "Nuevo", "Como nuevo")
  oferta?: boolean; // Indica si el producto está en oferta
  user_id?: number; // ID del usuario que creó el producto
  categoryIds?: number[]; // IDs de las categorías asociadas al producto
  created_at?: Date; // Fecha de creación
  updated_at?: Date; // Fecha de actualización
  images?: string[]; // Array de URLs de imágenes del producto
  src?: string; // URL de la imagen principal (opcional)


}