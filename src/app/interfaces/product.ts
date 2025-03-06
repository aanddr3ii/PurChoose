export interface Product {
    id?: number;
    src?: string;
    price?: number;
    title?: string;
    state?: string;
    location?: string;
    description?: string;
    images?: string[];
    popularity?: number; // Agregar si es necesario
    dateAdded?: Date;    // Agregar si es necesario
}