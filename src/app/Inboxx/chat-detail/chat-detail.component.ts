import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat/chat.service';
import { Chat} from '../../interfaces/Chat.model';
import { Mensaje } from '../../interfaces/Mensaje.model';
import { AuthService } from '../../services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-chat-detail',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  chatId!: number;
  chat: Chat | null = null;
  mensajes: Mensaje[] = [];
  nuevoMensaje = '';
  usuarioId!: number;

 constructor(private chatState: ChatStateService, private chatService: ChatService, private authService: AuthService, private route: ActivatedRoute) {
    // ✅ Escucha cambios en la señal
    effect(() => {
      this.chat = this.chatState.currentChat();
    });
  }

  ngOnInit(): void {
    // Inicializa con el valor actual
    this.chat = this.chatState.currentChat();
  }

  loadChat(chatId: number): void {
    this.chatService.getMessages(chatId).subscribe({
      next: (data: any) => {
        this.chat = data;
        this.mensajes = data.mensajes || [];
      },
      error: (err) => {
        console.error('Error al cargar el chat:', err);
      }
    });
  }

  onSendMessage(): void {
    if (!this.nuevoMensaje.trim() || !this.chatId) return;

    const mensajeData = {
      contenido: this.nuevoMensaje,
      usuario_id: this.usuarioId
    };

    this.chatService.sendMessage(this.chatId, mensajeData.contenido, mensajeData.usuario_id).subscribe({
      next: (mensaje: Mensaje) => {
        this.mensajes.push(mensaje);
        this.nuevoMensaje = '';
      },
      error: (err) => {
        console.error('Error al enviar el mensaje:', err);
      }
    });
  }
}