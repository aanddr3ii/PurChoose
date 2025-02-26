import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Review } from '../../interfaces/review'

@Component({
  selector: 'app-product-user-bar',
  standalone: true,
  imports: [],
  templateUrl: './product-user-bar.component.html',
  styleUrl: './product-user-bar.component.css'
})
export class ProductUserBarComponent {

  user: User = {
    id: 1,
    name: 'Paco',
    email: 'paco@gmailcom',
    password: '1234',
    role: 'user',
    registrationDate: new Date(),
    location: 'New York',
    phone: 1234567890,
    profilePicture: 'https://static01.nyt.com/images/2025/01/17/espanol/17dc-trump-photo-01-cpvw-ES-copy1/17dc-trump-photo-01-cpvw-ES-copy1-facebookJumbo-v2.jpg'
  };

  review: Review = {
    id: 1,
    text: 'Deportes y Fitness',
    rating: 3
  };
};

