import { Component, inject, input } from '@angular/core';
import { Product } from '../../product.model';
import { ProductInteropService } from '../../services/product-interop.service';

@Component({
  selector: 'lib-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  readonly #productInteropService = inject(ProductInteropService);
  products = input<Product[]>([]);

  addToBasket(product: Product) {
    console.log(`Added ${product.name} to basket!`);
    this.#productInteropService.state.addProduct(product);
  }
}
