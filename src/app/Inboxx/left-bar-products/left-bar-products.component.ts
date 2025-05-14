import { Component, OnInit, effect } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

// Servicios
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/authService/auth.service';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { ChatDetailComponent } from '../chat-detail/chat-detail.component';
// Modelos
import { Chat } from '../../interfaces/Chat.model';

@Component({
  selector: 'app-left-bar-products',
  standalone: true,
  imports: [TranslateModule, RouterLink, ChatDetailComponent],
  templateUrl: './left-bar-products.component.html',
  styleUrls: ['./left-bar-products.component.css']
})
export class LeftBarProductsComponent implements OnInit {
  chats: Chat[] = [];
  usuarioId!: number;

  constructor(
    private chatService: ChatService,
    public chatState: ChatStateService,
    private authService: AuthService
  ) {
    // Escuchar cambios en currentChat()
    effect(() => {
      const currentChat = this.chatState.currentChat();
      if (currentChat?.id) {
        this.loadChats(); // Recarga toda la lista de chats
      }
    });

    // Escuchar cambios en chats desde backend
    effect(() => {
      const currentChats = this.chatState.chats();
      if (currentChats.length > 0) {
        this.chats = currentChats;
      }
    });
  }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();

    if (!this.usuarioId) {
      console.warn('Usuario no autenticado');
      return;
    }

    this.loadChats();
  }

  loadChats(): void {
    this.chatService.getAllChatsByUser(this.usuarioId).subscribe({
      next: (data: Chat[]) => {
        this.chats = data;
        this.chatState.chats.set(data); // Sincronizamos con señal compartida
      },
      error: (err) => {
        console.error('Error al cargar los chats:', err);
      }
    });
  }

  onChatClick(chat: Chat): void {
    this.chatState.currentChat.set(chat); // ✅ Esto sí funciona
  }

  logChat(chat: Chat): void {
    console.log('Chat seleccionado:', chat);
  }
}