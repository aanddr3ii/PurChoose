import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-product-user-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-user-bar.component.html',
  styleUrl: './product-user-bar.component.css'
})
export class ProductUserBarComponent {
  user: User | null = null;
  
  constructor(private userService: UserService) {} 
  
  ngOnInit(): void {
    this.user = this.userService.getUser(); 
  }
};

