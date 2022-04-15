import { SimplrRoute, SimplrRouter } from '@simplr-wc/router';
import './components/IconManager.js';
import './components/PageHeader.js';
import './components/PageFooter.js';

export const routes: SimplrRoute[] = [
  {
    path: '',
    component: 'products-page',
    import: () => import('./pages/ProductsPage.js'),
  },
  {
    path: '/:id',
    component: 'single-product-page',
    import: () => import('./pages/SingleProductPage.js'),
  },
];

const router = new SimplrRouter({ routes, transitionSpeed: 200 });
router.init();
