import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {id: 1,
    images:["https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087286.jpg?pictureSize=W640", "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087372.jpg?pictureSize=W640", "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087391.jpg?pictureSize=W640"], 
    price: 196, title: "Botas esqui tecnica", state: "Nuevo", location: "Barcelona", description: "Botas de esqui marca Nordica tamaño de la suela 295 mm, talla 25-25,5en buen estado.", popularity: 4.8, dateAdded: new Date("2024-03-11")
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
