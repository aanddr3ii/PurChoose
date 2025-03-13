import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [TranslateModule, NavBeltComponent, NavCategoriesComponent, NavBeltComponent,NavCategoriesComponent],
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {
  mockCategories = [
    { name: 'Electrónica', description: 'Dispositivos electrónicos y accesorios.' },
    { name: 'Ropa', description: 'Ropa para hombres, mujeres y niños.' },
    { name: 'Hogar', description: 'Artículos para el hogar y decoración.' }
  ];

  editingCategoryIndex: number | null = null;

  constructor(private router: Router) {}

  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }
}