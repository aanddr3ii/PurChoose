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

  users: User[] = [
    {id:1, name: 'Aleix', profilePicture: 'https://media.licdn.com/dms/image/v2/D4D03AQHZUtDMwvW49w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696004719195?e=2147483647&v=beta&t=zYv2c3HUsY1n9gSlk-ll0MoWictwpiixi-5nEce20H0'},
    {id:2, name: 'Juan', profilePicture: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png'}
  ];
  reviews: (Review & { user?: User })[] = [
    { id: 1, rating: 5.8, text: 'Great service!', user: this.users[0] },
    { id: 2, rating: 3.0, text: 'It was okay.', user: this.users[1] }
  ];

}
