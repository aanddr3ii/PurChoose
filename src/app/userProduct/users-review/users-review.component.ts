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
    name: 'Paco'
  };

  review: Review = {
    id: 1,
    rating: 3.4,
    text: 'Excelente vendedor! Gracias'
  };
}
