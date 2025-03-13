import { Component } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { UserReviewService } from '../../services/userReview/user-review.service';
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
  user: User | null = null;
  reviews:Review[] | null = null;

  constructor(private userService: UserService, private userReviewService: UserReviewService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(); 
    this.reviews = this.userReviewService.getReviews();
  }
}
