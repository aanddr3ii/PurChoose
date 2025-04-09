// Interfaz base para Product
export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    estado: string;
    ubicacion: string | null;
    oferta: number;
    individual: number;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
  
  // Interfaz extendida para productos con categorías
  export interface ProductWithCategories extends Product {
    categorias: Category[]; // Agregamos esta línea
  }
  
  // Interfaz para las categorías
  export interface Category {
    id: number;
    nombre: string;
    imagen: string;
  }