import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Chat } from '../../interfaces/Chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  public currentChat = signal<Chat | null>(null);
  
  // ✅ Nueva señal para la lista de chats
  public chats = signal<Chat[]>([]); 

  // ✅ Opcional: señal para recargar chats desde otro componente
  public reloadChats = signal<boolean>(false);
}