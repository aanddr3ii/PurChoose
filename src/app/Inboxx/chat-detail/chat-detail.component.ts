import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { Chat } from '../../interfaces/Chat.model';
import { FormsModule, NgForm } from '@angular/forms';
import { effect } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/authService/auth.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// Extiende el tipo Mensaje para incluir esTemporal
export interface MensajeConTemp {
  id: number;
  chat_id: number;
  usuario_id: number;
  contenido: string;
  leido: boolean;
  created_at: string;
  updated_at: string;
  esTemporal?: boolean;
}

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  chat: Chat | null = null;
  nuevoMensaje = '';
  public usuarioId!: number;
  private pollingInterval: any;

  // Variables para edición y eliminación
  selectedMessage: MensajeConTemp | null = null;
  showDeleteConfirm: boolean = false;
  editingMessage: MensajeConTemp | null = null;
  editingMessageContent: string = '';

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('formDir') form!: NgForm;

  constructor(
    private chatState: ChatStateService,
    private chatService: ChatService,
    public authService: AuthService
  ) {
    this.usuarioId = this.authService.getUserId();
    this.chat = this.chatState.currentChat();

 effect(() => {
    const currentChat = this.chatState.currentChat();
    console.log('currentChat ha cambiado', currentChat);

    if (currentChat && currentChat.id) {
      this.chat = currentChat; // ✅ Asignamos directamente
      this.loadChat(currentChat.id); // Cargamos mensajes
    } else {
      this.chat = null; // ✅ Si no hay chat seleccionado
    }
  });
}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();
    this.chat = this.chatState.currentChat();
  }

  // Cargar mensajes desde API
loadChat(chatId: number): void {
    this.chatService.getMessages(chatId).subscribe({
      next: (mensajes) => {
        const currentChat = this.chatState.currentChat();

        if (!currentChat?.id) return;

        // ✅ Actualiza el chat localmente
        this.chat = {
          ...currentChat,
          mensajes: mensajes
        };

        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error al cargar mensajes:', err);
      }
    });
  }

  // Iniciar polling
  startPolling(chatId: number): void {
    this.stopPolling(); // Evitar duplicados

    this.pollingInterval = setInterval(() => {
      if (this.chat?.id) {
        this.loadChat(this.chat.id);
      }
    }, 5000); // cada 5 segundos
  }

  // Detener polling
  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Enviar mensaje
  onSendMessage(): void {
    if (!this.nuevoMensaje.trim() || !this.chat || !this.chat.id) return;

    const { usuario1, usuario2 } = this.chat;

    if (!usuario1 || !usuario2 || !usuario1.id || !usuario2.id) {
      console.warn('Datos incompletos del chat');
      return;
    }

    const esUsuario1 = usuario1.id === this.usuarioId;
    const usuario_id = esUsuario1 ? usuario1.id : usuario2.id;

    const mensajeTemporal = {
      id: Date.now(),
      chat_id: this.chat.id,
      usuario_id,
      contenido: this.nuevoMensaje,
      leido: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      esTemporal: true
    };

    this.chat.mensajes.push(mensajeTemporal);
    this.scrollToBottom();

    this.chatService.sendMessage(this.chat.id, this.nuevoMensaje, usuario_id).subscribe({
      next: (mensajeEnviado) => {
        const index = this.chat!.mensajes.findIndex(m => m.esTemporal);
        if (index > -1) {
          this.chat!.mensajes[index] = {
            ...mensajeEnviado,
            esTemporal: false
          };
        }

        this.nuevoMensaje = '';
        if (this.form) {
          this.form.resetForm(); // Reinicia formulario
        }
      },
      error: () => {
        const index = this.chat!.mensajes.findIndex(m => m.esTemporal);
        if (index > -1) {
          this.chat!.mensajes.splice(index, 1);
        }

        this.nuevoMensaje = '';
        if (this.form) {
          this.form.resetForm();
        }
      }
    });

    this.scrollToBottom();
  }

  // Mostrar menú contextual (click derecho)
  showMessageMenu(event: MouseEvent, mensaje: MensajeConTemp): void {
    event.preventDefault(); // Prevenir menú por defecto

    if (mensaje.usuario_id !== this.usuarioId) return; // Solo si es tuyo

    this.selectedMessage = mensaje;
  }

  // Editar mensaje
  editMessage(mensaje: MensajeConTemp): void {
    this.editingMessage = mensaje;
    this.editingMessageContent = mensaje.contenido;
    this.selectedMessage = null;
  }

  // Guardar mensaje editado
  saveEditedMessage(): void {
  if (!this.editingMessage) return;

  const chatId = this.editingMessage.chat_id;
  const mensajeId = this.editingMessage.id;
  const contenido = this.editingMessageContent.trim();

  if (!contenido || !chatId || !mensajeId) {
    this.cancelEdit();
    return;
  }

  // ✅ Envía directo al backend sin mensaje temporal
  this.chatService.updateMessage(chatId, mensajeId, contenido).subscribe({
    next: () => {
      // ✅ Recarga todos los mensajes del chat
      if (this.chat?.id) {
        this.loadChat(this.chat.id);
      }

      this.cancelEdit();
      this.scrollToBottom();
    },
    error: (err) => {
      console.error('Error al editar mensaje:', err);
      alert('No se pudo guardar la edición');
      this.cancelEdit();
    }
  });
}
showDeleteChatConfirm: boolean = false;

// Botón de eliminar chat
onDeleteChat(): void {
  this.showDeleteChatConfirm = true;
}

// Confirmar eliminación del chat
confirmDeleteChat(): void {
  if (!this.chat?.id) return;

  this.chatService.deleteChat(this.chat.id).subscribe({
    next: () => {
      console.log('✅ Chat eliminado:', this.chat?.id);

      this.chatState.currentChat.set(null);
      this.chat = null;
      this.stopPolling();

      // 🔁 Notificamos que hay que recargar la lista
      this.chatState.reloadChats.set(true);

      this.showDeleteChatConfirm = false;
    },
    error: (err) => {
      console.error('❌ Error al eliminar el chat:', err);
      alert('No se pudo eliminar el chat');
      this.showDeleteChatConfirm = false;
    }
  });
}

// Cancelar eliminación del chat
cancelDeleteChat(): void {
  this.showDeleteChatConfirm = false;
}

  // Eliminar mensaje
  deleteMessage(mensaje: MensajeConTemp): void {
    this.selectedMessage = mensaje;
    this.showDeleteConfirm = true;
  }

  confirmDelete(): void {
    if (!this.selectedMessage) return;

    const chatId = this.selectedMessage.chat_id;
    const mensajeId = this.selectedMessage.id;

    if (!chatId || !mensajeId) return;

    this.chatService.deleteMessage(chatId, mensajeId).subscribe({
      next: () => {
        this.chat!.mensajes = this.chat!.mensajes.filter(m => m.id !== mensajeId);
        this.cancelDelete();
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error al eliminar mensaje:', err);
        alert('No se pudo eliminar el mensaje');
        this.cancelDelete();
      }
    });
  }

  // Cancelar acción
  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.selectedMessage = null;
  }

  cancelEdit(): void {
    this.editingMessage = null;
    this.editingMessageContent = '';
  }

  // Scroll automático al final
  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  // Cerrar menú al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.message')) {
      this.selectedMessage = null;
    }
  }
}