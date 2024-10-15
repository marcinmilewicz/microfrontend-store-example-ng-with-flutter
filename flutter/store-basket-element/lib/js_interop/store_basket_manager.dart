import 'dart:js_interop';

import 'package:store_basket/product.dart';
import 'package:store_basket/store_basket.dart';

extension type ProductJSTO._(JSObject object) implements JSObject {
  external int get id;

  external String get name;

  external double get price;
}

@JSExport()
class StoreBasketManager {
  StoreBasketManager({
    required StoreBasketState storeBasketState,
  }) : _storeBasketState = storeBasketState;

  final StoreBasketState _storeBasketState;

  void addProduct(ProductJSTO product) {
    _storeBasketState.shoppingCart.addProduct(
        Product(id: product.id, name: product.name, price: product.price));
  }
}
