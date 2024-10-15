import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  readonly #httpClient: HttpClient = inject(HttpClient);

  fetchProducts(): Observable<Product[]> {
    return this.#httpClient
      .get<{ products: Product[] }>('products.json')
      .pipe(map((item) => item.products));
  }
}
