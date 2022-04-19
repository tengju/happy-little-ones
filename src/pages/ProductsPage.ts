import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IProduct } from '../interfaces/IProduct.js';
import '../components/ProductTile.js';
import '../layouts/DefaultLayout.js';
import { getAllProducts } from '../api/products.api.js';
import { StoreElement } from '../StoreElement.js';
import { numberToEuro } from '../helpers/number.helper.js';

@customElement('products-page')
export class ProductsPage extends StoreElement {
  @property({ type: Array }) products: IProduct[] = [];

  @property({ type: Boolean }) errored = false;

  @property({ type: Number }) page = 1;

  @property({ type: Boolean }) lastPage = false;

  static styles = css`
    main {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      max-width: 800px;
      padding: 1rem 0;
    }
    .title-container {
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 5rem 0.5rem 0.5rem 0.5rem;
      margin-top: -5rem;
      background-color: white;
    }

    .product-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding: 0 0.25rem;
      gap: 1rem;
    }

    product-tile {
      display: flex;
    }

    .load-more-button {
      border: none;
      padding: 0.25rem 1rem;
      background-color: #005588;
      color: white;
      font-size: 2rem;
      min-width: 300px;
      margin: 0 auto;
      cursor: pointer;
    }
    .no-pagination-text {
      padding-top: 2rem;
      font-size: 2rem;
      margin: 0 auto;
    }
    .enticing-ad {
      width: 100%;
      padding: 0.25rem 0.75rem;
      background-color: #005588;
      color: white;
      font-size: 1.5rem;
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.getData();
  }

  async getData(initial = true) {
    if (initial) {
      this.products = [];
      this.page = 1;
      this.lastPage = false;
    }
    this.errored = false;
    try {
      const { body }: any = await getAllProducts({
        page: String(this.page),
        type: this.filters.type,
        brand: this.filters.brand,
      });

      if (body.length < 10) this.lastPage = true;
      this.products = [...this.products, ...body];
    } catch (error) {
      this.errored = true;
      this.products = [];
    }
  }

  loadNextPage() {
    this.page += 1;
    this.getData(false);
  }

  getErrorTemplate() {
    return this.errored ? html`<div>Could not fetch products</div>` : '';
  }

  getNoResultTemplate() {
    return !this.errored && !this.products.length
      ? html`<div>Could not find any products</div>`
      : '';
  }

  render() {
    return html`
      <default-layout>
        <main>
          <div class="title-container">
            <span>Products</span>
            <span>${this.products.length} products</span>
          </div>
          ${this.getErrorTemplate()} ${this.getNoResultTemplate()}
          <div class="product-list">
            <div class="enticing-ad">
              SPECIAL: Free shipping for orders above ${numberToEuro(50)}
            </div>
            ${this.products.map(
              product =>
                html` <product-tile .product=${product}></product-tile> `
            )}
          </div>
          ${this.lastPage
            ? html`<span class="no-pagination-text">No more products</span>`
            : html`'<button
                  class="load-more-button"
                  @click="${this.loadNextPage}"
                >
                  Load more...
                </button>`}
        </main>
      </default-layout>
    `;
  }
}
