import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-user-bar-chat',
  standalone: true,
  imports: [],
  templateUrl: './user-bar-chat.component.html',
  styleUrl: './user-bar-chat.component.css'
})
export class UserBarChatComponent {
  user: User | null = null;
  
  constructor(private userService: UserService) {} 
  
  ngOnInit(): void {
    this.user = this.userService.getUser(); 
  }
}
