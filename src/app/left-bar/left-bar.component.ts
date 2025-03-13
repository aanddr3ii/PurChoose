import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {
  isSidenavOpen = true;

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
