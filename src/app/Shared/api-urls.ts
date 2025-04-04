// src/app/shared/api-urls.ts

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
  
    // Endpoints de productos
    public static readonly PRODUCTOS = {
      LIST: `${ApiUrls.BASE_URL}/productos`,
      STORE: `${ApiUrls.BASE_URL}/productos`,
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
  }