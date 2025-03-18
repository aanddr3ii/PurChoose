import { Component } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { LeftBarProductsComponent } from "../left-bar-products/left-bar-products.component";
import { UserBarChatComponent } from "../user-bar-chat/user-bar-chat.component";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, LeftBarComponent, LeftBarProductsComponent, UserBarChatComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {

}
