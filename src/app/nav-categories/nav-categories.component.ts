import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './nav-categories.component.html',
  styleUrl: './nav-categories.component.css'
})
export class NavCategoriesComponent {
  isSidenavOpen = false;

  toggleSidenav(event: Event) {
    event.preventDefault();  // Previene que el enlace recargue la página actual
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
