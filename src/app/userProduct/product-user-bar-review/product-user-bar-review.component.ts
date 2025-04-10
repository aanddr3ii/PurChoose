import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserReviewService } from '../../services/userReview/user-review.service';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product-user-bar-review',
  standalone: true,
  imports: [],
  templateUrl: './product-user-bar-review.component.html',
  styleUrl: './product-user-bar-review.component.css'
})
export class ProductUserBarReviewComponent {
  user: any[] = [];
  reviews: any[] = [];

  constructor(private userService: UserService, private userReviewService: UserReviewService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(); 
    this.reviews = this.userReviewService.getReviews();
  }
}
