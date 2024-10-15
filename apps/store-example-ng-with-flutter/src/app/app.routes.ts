import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@store-example-ng-with-flutter/store-feature').then(
        ({ StoreComponent }) => StoreComponent
      ),
  },
];
