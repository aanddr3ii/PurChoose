export interface Product {
    id?: number; // Identificador único
    src?: string; // URL principal de la imagen (opcional)
    price?: number; // Precio del producto
    title?: string; // Título del producto
    state?: string; // Estado del producto (nuevo/usado)
    location?: string; // Ubicación del producto
    description?: string; // Descripción del producto
    images?: string[]; // Array de URLs de imágenes
    popularity?: number; // Popularidad del producto (opcional)
    dateAdded?: Date; // Fecha de publicación del producto (opcional)
  }