import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-categories',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './nav-categories.component.html',
  styleUrl: './nav-categories.component.css'
})
export class NavCategoriesComponent {
  isSidenavOpen = false;

  toggleSidenav(event: Event) {
    event.preventDefault(); // previene que cargue la pg acutal
    this.isSidenavOpen = !this.isSidenavOpen;

    if (this.isSidenavOpen) {
        document.body.classList.add('no-scroll'); // no puedes hacer scroll
    } else {
        document.body.classList.remove('no-scroll'); // vuelves a poder hacer scroll
    }
  }
}
