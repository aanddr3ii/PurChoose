import { Injectable } from '@angular/core';
import { Review } from '../../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class UserReviewService {

  private review: Review[] = [
    {id: 1, rating: 4.80, text: 'Gracias crack por el 5.8 a la proxima review negativa pal linkedin'},
    {id: 2, rating: 3.05, text: 'Muy buen trabajo, me ha ayudado mucho en mi proyecto'},
    {id: 3, rating: 2.55, text: 'No me ha gustado nada, no lo recomiendo'},
    
  ];

    getReviews(): Review[] {
      return this.review;
    }
}
