import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/authService/auth.service';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-user-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-user-bar.component.html',
  styleUrls: ['./product-user-bar.component.css']
})
export class ProductUserBarComponent implements OnInit {
  userName: string | null = null;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private chatService: ChatService,
    private authService: AuthService,
    private chatState: ChatStateService,
    private router: Router // ✅ Inyectamos Router

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.loadUserName();
    }
  }

  loadUserName(): void {
    this.productDetailService.getUserName(this.productId).subscribe({
      next: (name) => {
        this.userName = name;
      },
      error: (err) => {
        console.error('Error al cargar nombre:', err);
        this.userName = 'Usuario desconocido';
      }
    });
  }

  // ✅ Botón de chat - Crear o abrir chat
 onOpenChat(): void {
  const usuario1_id = this.authService.getUserId();
  if (!this.productId || !usuario1_id) {
    console.warn('Faltan datos para crear el chat');
    return;
  }

  this.productDetailService.getProductOwnerId(this.productId).subscribe({
    next: (usuario2_id) => {
      if (usuario1_id === usuario2_id) {
        console.warn('No puedes chatear contigo mismo');
        alert('No puedes iniciar un chat contigo mismo');
        return;
      }

      // Llamamos a createChat()
      this.chatService.createChat(this.productId, usuario1_id, usuario2_id).subscribe({
        next: (chat) => {
          console.log('✅ Chat creado o recuperado:', chat);

          // Guardamos el chat actual
          this.chatState.currentChat.set(chat);

          // Navegamos a /inbox
          this.router.navigate(['/inbox']);
          
          // Mostramos mensaje de éxito
          alert('✅ Chat creado correctamente.');
        },
        error: (err) => {
          if (err.status === 409) {
            // El chat ya existe → lo guardamos y redirigimos igualmente
            this.chatState.currentChat.set(err.error.chat); // Si tu backend lo devuelve
            this.router.navigate(['/inbox']);
            alert('💬 Ya existe un chat con este usuario.');
          } else {
            // Otro error → mostramos mensaje
            console.error('❌ Error al crear el chat:', err);
            alert('⚠️ No se pudo crear el chat. Inténtalo más tarde.');
          }
        }
      });
    },
    error: (err) => {
      console.error('❌ No se encontró el dueño del producto', err);
      alert('⚠️ No se pudo encontrar al propietario del producto');
    }
  });
}
}