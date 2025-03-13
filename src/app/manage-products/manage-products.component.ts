import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [TranslateModule, NavBeltComponent, NavCategoriesComponent, NavBeltComponent,NavCategoriesComponent],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  mockCategories = [
    { name: 'Electrónica' },
    { name: 'Ropa' },
    { name: 'Hogar' }
  ];

  mockProducts = [
    { name: 'Laptop', price: 999, category: 'Electrónica' },
    { name: 'Camiseta', price: 19, category: 'Ropa' },
    { name: 'Lámpara', price: 49, category: 'Hogar' }
  ];

  editingProductIndex: number | null = null;

  constructor(private router: Router) {}

  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }
}