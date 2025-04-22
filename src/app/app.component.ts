import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, Router, NavigationStart} from '@angular/router';
import { UserService } from './services/userService/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // De la manera que tenemos lo de "invitado, usuario" el como invitado podia ir a editarP y a perfil y con esto le redirigimos al login
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.restringirRutasParaInvitado(event.url);
      }
    });
  }

  restringirRutasParaInvitado(url: string): void {
    const user = this.userService.getUser();
    const esInvitado =
      !user || user.id === null || user.name?.toLowerCase() === 'invitado';

    if (
      esInvitado &&
      (url.includes('/perfil') || url.includes('/editarP'))
    ) {
      this.router.navigate(['/login']);
    }
  }
}
