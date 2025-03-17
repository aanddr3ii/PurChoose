import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      images: [
        "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087286.jpg?pictureSize=W640",
        "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087372.jpg?pictureSize=W640",
        "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087391.jpg?pictureSize=W640"
      ],
      price: 196,
      title: "Botas esqui tecnica",
      state: "Nuevo",
      location: "Barcelona",
      description: "Botas de esqui marca Nordica tamaño de la suela 295 mm, talla 25-25,5 en buen estado.",
      popularity: 4.8,
      dateAdded: new Date("2024-03-11")
    },
    {
      id: 2,
      images: [
        "https://cdn.wallapop.com/images/10420/ie/kr/__/c10420p1112875012/i5485839981.jpg?pictureSize=W640",
        "https://cdn.wallapop.com/images/10420/ie/kr/__/c10420p1112875012/i5485840017.jpg?pictureSize=W640"
      ],
      price: 49,
      title: "Lámpara de escritorio",
      state: "Usado",
      location: "Madrid",
      description: "Lámpara de escritorio en buen estado, perfecta para estudiar.",
      popularity: 4.5,
      dateAdded: new Date("2024-02-15")
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}