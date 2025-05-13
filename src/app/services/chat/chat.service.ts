import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importa tus rutas compartidas
import { ApiUrls } from '../../Shared/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // 1. 🟢 Crear chat manualmente
  createChat(producto_id: number, usuario1_id: number, usuario2_id: number): Observable<any> {
    return this.http.post(ApiUrls.CHAT.CREATE_CHAT, {
      producto_id,
      usuario1_id,
      usuario2_id
    });
  }

  // 2. 🔍 Obtener o crear chat desde producto y otro usuario
  getOrCreateChat(productoId: number, otroUsuarioId: number, usuario1_id: number): Observable<any> {
    return this.http.post(ApiUrls.CHAT.GET_OR_CREATE_CHAT(productoId, otroUsuarioId), {
      usuario1_id
    });
  }

  // 3. 🔹 Listar todos los chats de un usuario
  getAllChatsByUser(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(ApiUrls.CHAT.GET_ALL_CHATS_BY_USER(usuarioId));
  }

  // 4. 🗑️ Eliminar un chat por ID
  deleteChat(chatId: number): Observable<any> {
    return this.http.delete(ApiUrls.CHAT.DELETE_CHAT(chatId));
  }

  // 5. 📩 Enviar mensaje a un chat
  sendMessage(chatId: number, contenido: string, usuario_id: number): Observable<any> {
    return this.http.post(ApiUrls.CHAT.SEND_MESSAGE(chatId), {
      contenido,
      usuario_id
    });
  }

  // 6. ✏️ Editar un mensaje del chat
  updateMessage(chatId: number, mensajeId: number, contenido: string): Observable<any> {
    return this.http.put(ApiUrls.CHAT.UPDATE_MESSAGE(chatId, mensajeId), {
      contenido
    });
  }

  

  // 7. 🗑️ Eliminar un mensaje específico
  deleteMessage(chatId: number, mensajeId: number): Observable<any> {
    return this.http.delete(ApiUrls.CHAT.DELETE_MESSAGE(chatId, mensajeId));
  }

  // 8. 🔎 Ver todos los mensajes de un chat
  getMessages(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(ApiUrls.CHAT.GET_MESSAGES(chatId));
  }
}