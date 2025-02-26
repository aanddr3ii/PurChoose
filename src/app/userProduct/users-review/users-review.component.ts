import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-users-review',
  standalone: true,
  imports: [],
  templateUrl: './users-review.component.html',
  styleUrl: './users-review.component.css'
})
export class UsersReviewComponent {
  user: User = {
    id: 1,
    name: 'paco',
    email: '',
    password: '',
    role: '',
    registrationDate: new Date(),
    location: '',
    phone: 0,
    profilePicture: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/5aed/live/909f0fe0-ea63-11ef-a819-277e390a7a08.jpg.webp'
  };

  review: Review = {
    id: 1,
    text: 'un vendedor amable y',
    rating: 3.4,
  };
}
