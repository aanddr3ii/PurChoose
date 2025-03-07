import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-product',
  standalone: true,
  templateUrl: './category-product.component.html',
  imports: [NavBeltComponent, NavCategoriesComponent, CardProductComponent, AsyncPipe, FormsModule],
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent {
  // Datos simulados de productos
  products: Product[] = [
    {
      id: 1,
      title: 'VOLKSWAGEN GOLF GTI 2.0 230cv 2015',
      price: 18400,
      location: 'Leganés',
      description: 'FINANCIAMOS SOLO CON TU NÓMINA Y DNI ¡¡SIN ENTRADA!! POR TAN SOLO 240€ / MES',
      images: [
        'images/wgg2.1.png',
        'images/wgg2.0.png',
        'images/wgg2.3.png',
        'images/wgg2.2.png'
      ],
      popularity: 4.5, // Popularidad (1-5)
      dateAdded: new Date('2023-10-01') // Fecha de publicación
    },
    {
      id: 2,
      title: 'CUPRA LEON 1.5 eTSI 150CV',
      price: 23500,
      location: 'Leganés',
      description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
      images: [
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511518.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511592.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511656.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511667.jpg?pictureSize=W640'
      ],
      popularity: 4.2,
      dateAdded: new Date('2023-09-25')
    },
    {
      id: 3,
      title: 'Morgan 4/4 2006',
      price: 57000,
      location: 'Madrid',
      description: 'Impresionante Morgan 4/4 2006 totalmente restaurada.',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932761.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932771.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932768.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932765.jpg?pictureSize=W640'
      ],
      popularity: 5.0,
      dateAdded: new Date('2023-08-15')
    },
    {
      id: 4,
      title: 'Chevrolet GMC Apache 1959',
      price: 37500,
      location: 'Madrid',
      description: 'Impresionante GMC Apache de 1959 totalmente restaurada.',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932761.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932771.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932768.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932765.jpg?pictureSize=W640'
      ],
      popularity: 3.8,
      dateAdded: new Date('2023-07-10')
    },
    {
      id: 5,
      title: 'Volkswagen Escarabajo 1975',
      price: 18400,
      location: 'Madrid',
      description: 'TOTALMENTE RESTAURADO Y TERMINADO EN 2023, CARROCERÍA, MOTOR, FRENOS.',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934862.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934869.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934865.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934872.jpg?pictureSize=W640'
      ],
      popularity: 4.0,
      dateAdded: new Date('2023-06-01')
    }
  ];

  // Opciones de filtro
  filterOptions = [
    { value: 'price_asc', label: 'Precio (Bajo a Alto)' },
    { value: 'price_desc', label: 'Precio (Alto a Bajo)' },
    { value: 'popularity_asc', label: 'Popularidad (Baja a Alta)' },
    { value: 'popularity_desc', label: 'Popularidad (Alta a Baja)' },
    { value: 'date_asc', label: 'Fecha (Antigua a Reciente)' },
    { value: 'date_desc', label: 'Fecha (Reciente a Antigua)' }
  ];

  // Filtro seleccionado
  selectedFilter: string = 'price_asc';

  // Método para aplicar el filtro
  applyFilter() {
    this.sortProducts();
  }

  // Método para ordenar los productos
  sortProducts() {
    switch (this.selectedFilter) {
      case 'price_asc':
        this.products.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        this.products.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popularity_asc':
        this.products.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
        break;
      case 'popularity_desc':
        this.products.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'date_asc':
        this.products.sort((a, b) => (a.dateAdded?.getTime() || 0) - (b.dateAdded?.getTime() || 0));
        break;
      case 'date_desc':
        this.products.sort((a, b) => (b.dateAdded?.getTime() || 0) - (a.dateAdded?.getTime() || 0));
        break;
      default:
        break;
    }
  }
}