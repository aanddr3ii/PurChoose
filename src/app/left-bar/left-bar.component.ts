import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {
  user: User | null = null; // Define a product object
  constructor(private userService: UserService) {} // Inject the service

  ngOnInit(): void {
    this.user = this.userService.getUser(); 
  }
}
