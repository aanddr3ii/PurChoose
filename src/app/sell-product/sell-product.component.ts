import { Component, inject  } from '@angular/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../app/services/Product/product.service';
import { Product } from '../interfaces/product';
import { RouterModule } from '@angular/router';
import { SellProductPictureComponent } from "../sell-product-picture/sell-product-picture.component";

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, FormsModule, ReactiveFormsModule, RouterModule, SellProductPictureComponent],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.css'
})

export class SellProductComponent {
  private readonly fb = inject(FormBuilder);

  categories: string[] = ['Moda', 'Electrónica', 'Hogar', 'Libros'];
  newCategory = '';

  // Controls whether the "Add Category" form is shown
  showAddCategory = false;

  productForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [0, Validators.required],
    estado: ['nuevo', Validators.required],
    oferta: [false],
    ubicacion: [''],
    categoria: [''],
    user_id: ['']
  });

  toggleAddCategory(): void {
    // Toggle from false to true or vice versa
    this.showAddCategory = !this.showAddCategory;
  }

  addCategory(): void {
    const trimmed = this.newCategory.trim();
    if (trimmed && !this.categories.includes(trimmed)) {
      this.categories.push(trimmed);
    }
    this.newCategory = '';
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log('Creating product with data:', formData);
      // yourService.createProduct(formData).subscribe(...)
    }
  }

}
