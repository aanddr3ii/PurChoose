  export class ApiUrls {
    // Base URL de la API
    public static readonly BASE_URL = 'http://localhost:8000/api';

    // Endpoints de autenticación 
    public static readonly AUTH = {
        REGISTER: `${ApiUrls.BASE_URL}/register`,
        LOGIN: `${ApiUrls.BASE_URL}/login`,
        LOGOUT: `${ApiUrls.BASE_URL}/logout`,
        
        PERFIL: `${ApiUrls.BASE_URL}/perfil`,
        RESET_PASSWORD: `${ApiUrls.BASE_URL}/reset-password`, // Nuevo endpoint
    };

  // Archivo api-urls.ts
  public static readonly PRODUCTOS = {
    LIST: `${ApiUrls.BASE_URL}/productos`,
    STORE: `${ApiUrls.BASE_URL}/productos`,
    FILTRAR: `${ApiUrls.BASE_URL}/categorias/productos`,
    IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/imagenes`, // URL correcta
    UPLOAD_IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/upload-images`,
    WITH_CATEGORIES_AND_IMAGES: '/productos/with-categories-and-images',

  };
  public static readonly CARRITO = {
      GET: (userId: number) => `${ApiUrls.BASE_URL}/carrito/${userId}`, // Obtener productos del carrito
      ADD: `${ApiUrls.BASE_URL}/carrito`, // Añadir producto al carrito
      UPDATE: (userId: number) => `${ApiUrls.BASE_URL}/carrito/${userId}`, // Actualizar producto del carrito
      DELETE: (cartItemId: number) => `${ApiUrls.BASE_URL}/carrito/${cartItemId}`, // Eliminar producto del carrito
  };

    // Endpoints de categorías
    public static readonly CATEGORIAS = {
        LIST: `${ApiUrls.BASE_URL}/categorias`,
        STORE: `${ApiUrls.BASE_URL}/categorias`,
    };

    // Endpoints de perfil del usuario
    public static readonly USUARIO = {
        SHOW: (id: number) => `${ApiUrls.BASE_URL}/usuario/${id}`,
        UPDATE: (id: number) => `${ApiUrls.BASE_URL}/usuario/${id}`,
    };
    // Endpoints del historial
    public static readonly HISTORIAL = {
      LIST: (user_id: number) => `${ApiUrls.BASE_URL}/historial/${user_id}`, // Obtener historial de un usuario
      DELETE: (id: number) => `${ApiUrls.BASE_URL}/historial/${id}`, // Eliminar un registro del historial
      UPDATE: (id: number) => `${ApiUrls.BASE_URL}/historial/${id}`, // Actualizar un registro del historial
    };
  }