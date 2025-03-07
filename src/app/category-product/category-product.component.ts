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
        'https://cdn.wallapop.com/images/10420/gt/b4/__/c10420p1016687127/i4952895348.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/gt/b4/__/c10420p1016687127/i4952895411.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/gt/b4/__/c10420p1016687127/i4952895367.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/gt/b4/__/c10420p1016687127/i4952895447.jpg?pictureSize=W640'
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

  // Estado de los filtros (usamos union types para evitar errores)
  filters = {
    price: "" as 'asc' | 'desc' | '', // Solo puede ser 'asc', 'desc' o vacío
    popularity: "" as 'asc' | 'desc' | '', // Solo puede ser 'asc', 'desc' o vacío
    date: "" as 'asc' | 'desc' | '' // Solo puede ser 'asc', 'desc' o vacío
  };

  // Lista filtrada de productos
  filteredProducts: Product[] = [...this.products];

  // Método para aplicar los filtros
  applyFilters(filterType: keyof typeof this.filters, order: 'asc' | 'desc' | '') {
    // Actualizamos el filtro correspondiente
    this.filters[filterType] = order;

    // Reiniciamos la lista filtrada
    this.filteredProducts = [...this.products];

    // Aplicamos cada filtro activo
    if (this.filters.price) this.sortByPrice(this.filters.price);
    if (this.filters.popularity) this.sortByPopularity(this.filters.popularity);
    if (this.filters.date) this.sortByDate(this.filters.date);
  }

  // Método para ordenar por precio
  sortByPrice(order: 'asc' | 'desc' | '') {
    this.filteredProducts.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  // Método para ordenar por popularidad
  sortByPopularity(order: 'asc' | 'desc' | '') {
    this.filteredProducts.sort((a, b) => {
      const popularityA = a.popularity || 0;
      const popularityB = b.popularity || 0;
      return order === 'asc' ? popularityA - popularityB : popularityB - popularityA;
    });
  }

  // Método para ordenar por fecha
  sortByDate(order: 'asc' | 'desc' | '') {
    this.filteredProducts.sort((a, b) => {
      const dateA = a.dateAdded?.getTime() || 0;
      const dateB = b.dateAdded?.getTime() || 0;
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}