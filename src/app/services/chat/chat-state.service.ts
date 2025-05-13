import { Injectable, signal } from '@angular/core';
import { Chat } from '../../interfaces/Chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  public currentChat = signal<Chat | null>(null); // ✅ Bien tipado
}