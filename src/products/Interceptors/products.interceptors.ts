import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { createProductsDTO } from '../DTO/ProductsDTO';
import { RecentSearchProduct } from '../recent-search.service';
import { query } from 'express';
@Injectable()
export class ProductsInterceptor implements NestInterceptor {
  constructor(private recentSearchProduct: RecentSearchProduct) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const { query, token } = req.query;
    const cachedRecentList = this.recentSearchProduct.findByTokenAndQuery(
      token,
      query,
    );
    if (cachedRecentList.length) {
      console.log('cached value');
      const recentList = cachedRecentList.reduce((acclist, cachedlist) => {
        acclist.push(cachedlist.list);
        return acclist;
      }, []);
      return recentList;
    }
    return next.handle().pipe(
      timeout(5000),
      tap((list: createProductsDTO[]) => {
        if (query.trim().length && token) {
          this.recentSearchProduct.addRecentSearch(token, query, list);
        }
      }),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => new ServiceUnavailableException());
      }),
    );
  }
}
