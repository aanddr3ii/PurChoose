import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-product-user-bar-review',
  standalone: true,
  imports: [],
  templateUrl: './product-user-bar-review.component.html',
  styleUrl: './product-user-bar-review.component.css'
})
export class ProductUserBarReviewComponent {
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
