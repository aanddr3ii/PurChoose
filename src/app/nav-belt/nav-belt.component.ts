import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/authService/auth.service'; // Servicio de autenticación
import { CartService } from '../services/cart/cart.service'; // Servicio del carrito
import { UserService } from '../services/userService/user.service'; // Servicio de usuario
import { User } from '../interfaces/user';

@Component({
  selector: 'app-nav-belt',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './nav-belt.component.html',
  styleUrls: ['./nav-belt.component.css']
})
export class NavBeltComponent {
  currentLang: string = 'en';
  dropdownOpen = false;
  isUserAdmin = false; // Propiedad para verificar si el usuario es admin
  cartItemCount: number = 0; // Cantidad de productos en el carrito

  languages = [
    { code: 'en', label: 'inglés - EN' },
    { code: 'pt', label: 'portugués - PT' },
    { code: 'es', label: 'español - ES' },
    { code: 'fr', label: 'francés - FR' }
  ];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private cartService: CartService, // Inyecta el servicio del carrito
    private userService: UserService // Inyecta el servicio de usuario
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Configuración del idioma
      const savedLang = localStorage.getItem('selectedLanguage');
      this.currentLang = savedLang || this.translate.getBrowserLang() || 'en';
      this.translate.use(this.currentLang);

      // Verifica si el usuario es admin
      this.isUserAdmin = this.authService.getUserRole() === 'admin';

      // Actualiza la cantidad de productos en el carrito
    }
  }

  toggleDropdown(state: boolean): void {
    this.dropdownOpen = state;
  }

  onLanguageSelect(lang: string): void {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      this.translate.use(lang);
      localStorage.setItem('selectedLanguage', lang);
      this.dropdownOpen = false;

      const currentUrl = this.router.url.split('?')[0];
      this.router.navigate([currentUrl], {
        queryParams: { lang },
        queryParamsHandling: 'merge'
      }).then(() => {
        window.location.reload();
      });
    }
  }

  navigateToAdmin(): void {
    // Redirige al panel de administración
    this.router.navigate(['/admin']);
  }

  goToCart(): void {
    // Redirige al carrito
    this.router.navigate(['/cart']);
  }
  


  isInvitado(): boolean {
    const user = this.userService.getUser();
    return user.id === null || user.name?.toLowerCase() === 'invitado';
  }

  handleProfileClick(): void {
    const user = this.userService.getUser();
    const isInvitado = user.id === null || user.name?.toLowerCase() === 'invitado';
  
    if (isInvitado) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/perfil']);
    }
  }
  
}