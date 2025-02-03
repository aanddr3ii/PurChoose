import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBeltComponent } from './nav-belt/nav-belt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBeltComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PurChoose';
}
