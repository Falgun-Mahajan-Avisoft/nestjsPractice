import { Injectable, Scope } from '@nestjs/common';
import { createProductsDTO } from './DTO/ProductsDTO';

// @Injectable({scope:Scope.TRANSIENT})
// @Injectable({scope:Scope.REQUEST})
@Injectable()
export class ProductsService {
  private products: createProductsDTO[] = [
    { id: 1, name: 'Samsung Mobile', price: 299 },
    { id: 2, name: 'HP Laptop', price: 299 },
    { id: 3, name: 'Infinix Mobile', price: 299 },
    { id: 4, name: 'Intel Laptop', price: 299 },
  ];

  constructor() {
    console.log('Service init');
  }

  createProducts(product: createProductsDTO): string {
    console.log('hello');
    this.products.push(product);
    return 'Products added';
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id: number) {
    const prod = this.products.find((product) => product.id === id);
    return prod;
  }

  getSearchProduct(query: string) {
    const prod = this.products.filter((product) =>
      product.name.includes(query),
    );
    return prod;
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(prod), 7000);
    // });
  }

  updateProduct(id: number, product: createProductsDTO) {
    const prodIdx = this.products.findIndex((product) => product.id === id);
    if (!prodIdx) {
      return 'no data found';
    }
    this.products[prodIdx] = product;
    return this.products[prodIdx];
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    return 'Product deleted';
  }
}
