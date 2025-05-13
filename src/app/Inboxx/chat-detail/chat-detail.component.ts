import { Component, OnInit } from '@angular/core';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { Chat } from '../../interfaces/Chat.model';
import { FormsModule } from '@angular/forms';
import { effect } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  chat: Chat | null = null;

  nuevoMensaje = '';
  chatId!: number;

  constructor(private chatState: ChatStateService, private chatService: ChatService // 👈 Inyectamos el servicio
) {
  effect(() => {
    const currentChat = this.chatState.currentChat();
    console.log('currentChat:', currentChat);
    
    if (currentChat?.id) {
      this.loadChat(currentChat.id); // Cargamos los mensajes
    }
  });
  }
loadChat(chatId: number): void {
  this.chatService.getMessages(chatId).subscribe({
    next: (mensajes) => {
      const currentChat = this.chatState.currentChat();

      if (!currentChat?.id) {
        console.warn('No se encontró un chat válido para actualizar');
        return;
      }

      // ✅ Ahora sí, construimos el chat completo
      this.chat = {
        ...currentChat,
        mensajes: mensajes
      };

      console.log('Chat actualizado con mensajes:', this.chat);
    },
    error: (err) => {
      console.error('Error al cargar los mensajes:', err);
    }
  });
}
  ngOnInit(): void {
    // Inicializar con el valor actual
    this.chat = this.chatState.currentChat();
  }

  onSendMessage(): void {
    if (!this.nuevoMensaje.trim()) return;
    console.log('Enviando mensaje:', this.nuevoMensaje);
    this.nuevoMensaje = '';
  }
}