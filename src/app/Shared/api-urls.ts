  export class ApiUrls {
    // Base URL de la API
    public static readonly BASE_URL = 'http://localhost:8000/api';
    public static readonly PRODUCTOSUSER = {
      LIST: `${ApiUrls.BASE_URL}/productos`,
      STORE: `${ApiUrls.BASE_URL}/productos`,
      FILTRAR: `${ApiUrls.BASE_URL}/categorias/productos`,
      IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/imagenes`,
      UPLOAD_IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/upload-images`,
      WITH_CATEGORIES_AND_IMAGES: '/productos/with-categories-and-images',
    
      // ✅ AÑADE ESTA LÍNEA:
      MIS_PRODUCTOS: `${ApiUrls.BASE_URL}/productos/mis-productos`
    };
    
  
    // Endpoints de autenticación 
    public static readonly AUTH = {
        REGISTER: `${ApiUrls.BASE_URL}/register`,
        REGISTER_SELLER: `${ApiUrls.BASE_URL}/registersegaroamigo`,
        LOGIN: `${ApiUrls.BASE_URL}/login`,
        LOGOUT: `${ApiUrls.BASE_URL}/logout`,
        
        PERFIL: `${ApiUrls.BASE_URL}/perfil`,
        RESET_PASSWORD: `${ApiUrls.BASE_URL}/reset-password`, // Nuevo endpoint
    };

  // Archivo api-urls.ts
  public static readonly PRODUCTOS = {
    LIST: `${ApiUrls.BASE_URL}/productos`,
    STORE: `${ApiUrls.BASE_URL}/productos`,
    STORE_EMPRESAURIO: `${ApiUrls.BASE_URL}/productos-empresauriales`,
    FILTRAR: `${ApiUrls.BASE_URL}/categorias/productos`,
    IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/imagenes`, // URL correcta
    UPLOAD_IMAGES: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/upload-images`,
    WITH_CATEGORIES_AND_IMAGES: '/productos/with-categories-and-images',
    INCREMENT_VIEWS: (productId: number) => `${ApiUrls.BASE_URL}/productos/${productId}/incrementViews`

  };
  public static readonly CARRITO = {
      GET: (userId: number) => `${ApiUrls.BASE_URL}/carrito/${userId}`, // Obtener productos del carrito
      ADD: `${ApiUrls.BASE_URL}/carrito`, // Añadir producto al carrito
      UPDATE: (userId: number) => `${ApiUrls.BASE_URL}/carrito/${userId}`, // Actualizar producto del carrito
      DELETE: (cartItemId: number) => `${ApiUrls.BASE_URL}/carrito/${cartItemId}`, // Eliminar producto del carrito
  };
  public static readonly METODOS_PAGO = {
    GET_ALL: (userId: number) => `${this.BASE_URL}/metodos-pago?user_id=${userId}`,
    CREATE: `${this.BASE_URL}/metodos-pago`,
    UPDATE: (id: number) => `${this.BASE_URL}/metodos-pago/${id}`,
    DELETE: (id: number) => `${this.BASE_URL}/metodos-pago/${id}`,
  };
    // Endpoints de categorías
    public static readonly CATEGORIAS = {
        LIST: `${ApiUrls.BASE_URL}/categorias`,
        STORE: `${ApiUrls.BASE_URL}/categorias`,
        FILTER: `${ApiUrls.BASE_URL}/categorias/filter` // <-- debe estar definida

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

     // RUTAS DEL CHAT 🔥
 public static readonly CHAT = {
    CREATE_CHAT: `${ApiUrls.BASE_URL}/chat`,
    GET_OR_CREATE_CHAT: (productoId: number, otroUsuarioId: number) => 
      `${ApiUrls.BASE_URL}/producto/${productoId}/chat/${otroUsuarioId}`,
    GET_ALL_CHATS_BY_USER: (usuarioId: number) => 
      `${ApiUrls.BASE_URL}/chats/${usuarioId}`,
    DELETE_CHAT: (chatId: number) => 
      `${ApiUrls.BASE_URL}/chat/${chatId}`,
    SEND_MESSAGE: (chatId: number) => 
      `${ApiUrls.BASE_URL}/chat/${chatId}/mensaje`,
    UPDATE_MESSAGE: (chatId: number, mensajeId: number) => 
      `${ApiUrls.BASE_URL}/chat/${chatId}/mensaje/${mensajeId}`,
    DELETE_MESSAGE: (chatId: number, mensajeId: number) => 
      `${ApiUrls.BASE_URL}/chat/${chatId}/mensaje/${mensajeId}`,
    GET_MESSAGES: (chatId: number) => 
      `${ApiUrls.BASE_URL}/chat/${chatId}/mensajes`
  };


public static readonly ADMIN = {
  USUARIOS: `${ApiUrls.BASE_URL}/admin/usuarios`,
  USUARIO: (id: number) => `${ApiUrls.BASE_URL}/admin/usuarios/${id}`,
  CATEGORIAS: `${ApiUrls.BASE_URL}/admin/categorias`,
  CATEGORIA: (id: number) => `${ApiUrls.BASE_URL}/admin/categorias/${id}`,
  PRODUCTOS: `${ApiUrls.BASE_URL}/admin/productos`,
  PRODUCTO: (id: number) => `${ApiUrls.BASE_URL}/admin/productos/${id}`,
};

  }