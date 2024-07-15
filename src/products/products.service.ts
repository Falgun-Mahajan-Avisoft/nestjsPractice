import { Injectable, Scope } from '@nestjs/common';
import { createProductsDTO } from './DTO/ProductsDTO';
import { ConfigService } from '@nestjs/config';

// @Injectable({scope:Scope.TRANSIENT})
// @Injectable({scope:Scope.REQUEST})
interface JwtConfig{
  "JWT.SECRET":string;
  "JWT.EXPIRE_TIME":number
}
@Injectable()
export class ProductsService {
  private products: createProductsDTO[] = [
    { id: 1, name: 'Samsung Mobile', price: 299 },
    { id: 2, name: 'HP Laptop', price: 299 },
    { id: 3, name: 'Infinix Mobile', price: 299 },
    { id: 4, name: 'Intel Laptop', price: 299 },
  ];

  // constructor(private readonly configService : ConfigService) {
  //   const port = this.configService.get<number>("APP_PORT")
  //   const email = this.configService.get<string>("APP_EMAIL.SUPPORT")
  //   const dbPort = this.configService.get<number>("DATABASE.PORT")
  //   const dbUrl = this.configService.get<string>("DATABASE.url")
  //   const isLocalDb = this.configService.get<Function>("DATABASE.isLocal")
  //   const cron = this.configService.get("CRON")
  //   const url = this.configService.get("ADMIN_DATABASE.URL")
  //   console.log('Service init', port, email, dbPort, dbUrl, isLocalDb(), cron, url);
  // }
  // constructor(private readonly configService : ConfigService<JwtConfig>) {
  //   const secret = this.configService.get<string>("JWT.SECRET")
  //   const expireTime = this.configService.get<number>("JWT.EXPIRE_TIME")
    
  //   console.log('Service init',secret,expireTime);
  // }

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
