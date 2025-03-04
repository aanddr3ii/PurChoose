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
    name: 'Yassine Riahi El Kihal',
    email: 'paco@gmailcom',
    password: '1234',
    role: 'user',
    registrationDate: new Date(),
    location: 'New York',
    phone: 1234567890,
    profilePicture: 'https://media.licdn.com/dms/image/v2/D5603AQHyYxdhP8mV2Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719498858263?e=1746662400&v=beta&t=xnDUsAahOKC7h71UEz88i_eXIP5gjH6s9jiTbPlGCzs'
  };

};

