import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-display2',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './product-display2.component.html',
  styleUrl: './product-display2.component.css'
})
export class ProductDisplay2Component {

}
