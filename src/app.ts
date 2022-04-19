import { SimplrRoute, SimplrRouter } from '@simplr-wc/router';
import './components/IconManager.js';
import './layouts/DefaultLayout.js';

export const routes: SimplrRoute[] = [
  {
    path: '',
    component: 'products-page',
    import: () => import('./pages/ProductsPage.js'),
  },
  {
    path: '/shopping-cart',
    component: 'shopping-cart-page',
    import: () => import('./pages/ShoppingCartPage.js'),
  },
  {
    path: '/products/:id',
    component: 'single-product-page',
    import: () => import('./pages/SingleProductPage.js'),
  },
  {
    path: 'not-found',
    component: 'not-found-page',
    import: () => import('./pages/NotFoundPage.js'),
  },
];

const router = new SimplrRouter({ routes, transitionSpeed: 200 });
router.init();
