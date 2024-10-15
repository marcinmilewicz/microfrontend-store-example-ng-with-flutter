import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FlutterLoaderComponent } from '@store-example-ng-with-flutter/flutter-shared';
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

  onBasketLoaded(state:any) {
    this.#productInteropService.state = state;
  }
}
