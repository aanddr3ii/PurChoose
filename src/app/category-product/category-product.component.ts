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
      popularity: 2, // Popularidad (1-5)
      dateAdded: new Date('2022-06-01') // Fecha de publicación
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
      popularity: 4,
      dateAdded: new Date('2023-12-25')
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
      popularity: 1,
      dateAdded: new Date('2024-11-15')
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
      popularity: 5,
      dateAdded: new Date('2025-02-28') 
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
      popularity: 3,
      dateAdded: new Date('2025-03-05') 
    },

    {
      id: 6,
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
      popularity: 3,
      dateAdded: new Date('2025-03-20')
    },

    {
      id: 7,
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
      popularity: 3,
      dateAdded: new Date('2025-03-21')
    },

    {
      id: 8,
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
      popularity: 3,
      dateAdded: new Date('2025-03-24')
    },

    {
      id: 9,
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
      popularity: 3,
      dateAdded: new Date('2025-03-26') 
    },

    {
      id: 10,
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
      popularity: 3,
      dateAdded: new Date('2025-03-26T15:30:00')
    },
    
    {
      id: 11,
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
      popularity: 3,
      dateAdded: new Date('2025-03-27T08:00:00')
    }
  ];

  openFilter: string | null = 'dateRange';

  toggleFilter(name: string): void {
    this.openFilter = this.openFilter === name ? null : name;
  }
  


  // Estado de los filtros (usamos null para indicar que no hay filtro seleccionado)
  filters = {
    price: null,
    popularity: null,
    date: null,
    dateRange: null
  };

  dateOptions = [
    { label: 'Todos', value: null },
    { label: '24 horas', value: '24h' },
    { label: '7 días', value: '7d' },
    { label: '30 días', value: '30d' }
  ];
  
  // Lista filtrada de productos
  filteredProducts: Product[] = [...this.products];

  // Método para aplicar los filtros
  applyFilters(type: string, value: any): void {
    this.filteredProducts = [...this.products];
  
    // Ordenar por precio
    if (this.filters.price) {
      this.filteredProducts.sort((a, b) => 
        this.filters.price === 'asc'
          ? a.price! - b.price!
          : b.price! - a.price!
      );
    }
  
    // Ordenar por popularidad
    if (this.filters.popularity) {
      this.filteredProducts.sort((a, b) => 
        this.filters.popularity === 'asc'
          ? (a.popularity || 0) - (b.popularity || 0)
          : (b.popularity || 0) - (a.popularity || 0)
      );
    }
  
    // Ordenar por fecha
    if (this.filters.date) {
      this.filteredProducts.sort((a, b) =>
        this.filters.date === 'asc'
          ? new Date(a.dateAdded!).getTime() - new Date(b.dateAdded!).getTime()
          : new Date(b.dateAdded!).getTime() - new Date(a.dateAdded!).getTime()
      );
    }
  
    // Filtro por rango de fecha (24h, 7d, 30d)
    if (this.filters.dateRange) {
      const now = new Date();
      let threshold: number;
  
      switch (this.filters.dateRange) {
        case '24h':
          threshold = now.getTime() - 24 * 60 * 60 * 1000;
          break;
        case '7d':
          threshold = now.getTime() - 7 * 24 * 60 * 60 * 1000;
          break;
        case '30d':
          threshold = now.getTime() - 30 * 24 * 60 * 60 * 1000;
          break;
        default:
          threshold = 0;
      }
  
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.dateAdded && new Date(product.dateAdded).getTime() >= threshold
      );
    }
  }
  
  
 // Método para obtener un comparador combinado
  getCombinedComparator(): (a: Product, b: Product) => number {
  return (a: Product, b: Product): number => {
    let result = 0;

    // Aplicamos el filtro de precio si está activado
    if (this.filters.price) {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      result = this.filters.price === 'asc' ? priceA - priceB : priceB - priceA;
    }

    // Aplicamos el filtro de popularidad si está activado
    if (this.filters.popularity && result === 0) {
      const popularityA = a.popularity || 0;
      const popularityB = b.popularity || 0;
      result = this.filters.popularity === 'asc' ? popularityA - popularityB : popularityB - popularityA;
    }

    // Aplicamos el filtro de fecha si está activado
    if (this.filters.date && result === 0) {
      const dateA = a.dateAdded?.getTime() || 0;
      const dateB = b.dateAdded?.getTime() || 0;
      result = this.filters.date === 'asc' ? dateA - dateB : dateB - dateA;
    }

    return result;
  };
}

}