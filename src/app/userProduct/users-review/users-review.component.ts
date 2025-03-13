import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserReviewService } from '../../services/userReview/user-review.service';

@Component({
  selector: 'app-users-review',
  standalone: true,
  imports: [],
  templateUrl: './users-review.component.html',
  styleUrl: './users-review.component.css'
})
export class UsersReviewComponent {
  user: any[] = [];
  reviews: any[] = [];

  constructor(private userService: UserService, private userReviewService: UserReviewService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(); 
    this.reviews = this.userReviewService.getReviews();
  }
}
