import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/Product/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-title',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-title.component.html',
  styleUrl: './product-title.component.css'
})
export class ProductTitleComponent {

}
