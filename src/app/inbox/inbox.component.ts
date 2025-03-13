import { Component } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, LeftBarComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {

}
