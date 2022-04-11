import { SimplrRoute, SimplrRouter } from '@simplr-wc/router';
import './components/PageHeader.js';
import './components/PageFooter.js';

export const routes: SimplrRoute[] = [
  {
    path: '',
    component: 'home-page',
    import: () => import('./pages/HomePage.js'),
  },
  {
    path: '/products',
    component: 'products-page',
    import: () => import('./pages/ProductsPage.js'),
  },
  {
    path: '/products/:id',
    component: 'single-product-page',
    import: () => import('./pages/SingleProductPage.js'),
  },
];

const router = new SimplrRouter({ routes, transitionSpeed: 200 });
router.init();
