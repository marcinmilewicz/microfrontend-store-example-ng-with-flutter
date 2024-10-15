import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductInteropService {
  #state: { addProduct: (product: Product) => void } = {
    addProduct: () => {},
  };

  set state(state) {
    this.#state = state;
  }

  get state() {
    return this.#state;
  }
}
