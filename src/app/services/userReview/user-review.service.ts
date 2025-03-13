import { Injectable } from '@angular/core';
import { Review } from '../../interfaces/review';

@Injectable({
  providedIn: 'root'
})

export class UserReviewService {

  private review: Review[] = [
    {id: 1, rating: 3.7, text: 'Gracias crack por el 5.8 a la proxima review negativa pal linkedin'}
  ];

    getReviews(): Review[] {
      return this.review;
    }
}
