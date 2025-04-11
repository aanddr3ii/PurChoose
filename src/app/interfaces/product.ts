export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: string;
  oferta: boolean;
  ubicacion: string;
  user_id: number;
  imagenes?: { id: number; url: string }[]; // Imágenes relacionadas
  images?: { url: string }[];   // O usa esta línea si prefieres "images"
  src?: string; // URL de la imagen principal (opcional)
  categoryIds?: number[]; // IDs de las categorías asociadas (opcional)
  created_at?: Date; // Fecha de creación (opcional)
  categorias?: { id: number; nombre: string }[]; // Categorías relacionadas

}