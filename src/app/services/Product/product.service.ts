import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {id: 1,
    images:["https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087286.jpg?pictureSize=W640", "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087372.jpg?pictureSize=W640", "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087391.jpg?pictureSize=W640"], 
    price: 196, title: "Botas esqui tecnica", state: "New", location: "Madrid", description: "High-quality wireless gaming headset with noise cancellation and 20-hour battery life.", popularity: 4.8, dateAdded: new Date("2024-03-11")
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
