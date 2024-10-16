import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FlutterLoaderComponent } from '@store-example-ng-with-flutter/flutter-shared';
import { Product } from '../../product.model';
import { ProductsApiService } from '../../services/products-api.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductInteropService } from '../../services/product-interop.service';

@Component({
  selector: 'lib-store-feature',
  standalone: true,
  imports: [CommonModule, FlutterLoaderComponent, ProductListComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent {
  readonly #productsApiService = inject(ProductsApiService);
  readonly #productInteropService = inject(ProductInteropService);
  readonly products = toSignal(this.#productsApiService.fetchProducts(), {
    initialValue: [],
  });

  readonly eventsForListening = [
    '[StoreBasket] Product added',
    '[StoreBasket] Product decremented',
    '[StoreBasket] Product removed from basket',
    '[StoreBasket] Product incremented',
  ];

  onBasketLoaded(state: { addProduct: (product: Product) => void }) {
    this.#productInteropService.state = state;
  }

  onEventBroadcasted(event: CustomEvent) {
    console.log(event);
  }
}
