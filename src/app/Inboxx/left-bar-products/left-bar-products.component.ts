import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Servicios
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/authService/auth.service';

// Modelos
import { Chat } from '../../interfaces/Chat.model';
// Servicio compartido para estado del chat
import { ChatStateService } from '../../services/chat/chat-state.service';

@Component({
  selector: 'app-left-bar-products',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './left-bar-products.component.html',
  styleUrls: ['./left-bar-products.component.css']
})
export class LeftBarProductsComponent implements OnInit {
  chats: Chat[] = [];
  usuarioId!: number;

  constructor(
    private chatService: ChatService,
    private chatState: ChatStateService,
    private authService: AuthService
  ) {}

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
      },
      error: (err) => {
        console.error('Error al cargar los chats:', err);
      }
    });
  }

  // Al hacer clic en un chat, guardarlo en el servicio compartido
 onChatClick(chat: Chat): void {
  this.chatState.currentChat.set(chat); // ✅ Guarda el chat seleccionado
}
}