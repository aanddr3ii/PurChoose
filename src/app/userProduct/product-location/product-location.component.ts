import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-product-location',
  standalone: true,
  imports: [],
  templateUrl: './product-location.component.html',
  styleUrl: './product-location.component.css'
})
export class ProductLocationComponent {
  user: User | null = null;
  
  constructor(private userService: UserService) {} 
  
  ngOnInit(): void {
    this.user = this.userService.getUser(); 
  }
}
