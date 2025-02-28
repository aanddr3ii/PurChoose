import { Component } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-product-location',
  standalone: true,
  imports: [],
  templateUrl: './product-location.component.html',
  styleUrl: './product-location.component.css'
})
export class ProductLocationComponent {

  locationUser: User[] = [
    { id: 1, location: 'Madrid' },
  ];

}
