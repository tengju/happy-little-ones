import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sortByDateFunction } from '../helpers/product.helper.js';
import { IProduct } from '../interfaces/IProduct.js';
import '../components/ProductTile.js';

@customElement('products-page')
export class ProductsPage extends LitElement {
  @property({ type: Array }) products: IProduct[] = [];

  @property({ type: Boolean }) errored = false;

  static styles = css`
    .title-container {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }

    .product-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 1rem;
    }

    product-tile {
      display: flex;
    }
  `;

  constructor() {
    super();
    this.getData();
  }

  async getData() {
    this.errored = false;
    try {
      const response = await fetch('http://localhost:3000/products');
      const products = await response.json();
      // in an ideal situation I would sort this in the backend
      this.products = products.sort(sortByDateFunction);
    } catch (error) {
      this.errored = true;
      this.products = [];
    }
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
      <div class="title-container">
        <span>Products</span> <span>${this.products.length} products</span>
      </div>
      ${this.getErrorTemplate()} ${this.getNoResultTemplate()}
      <div class="product-list">
        ${this.products.map(
          product => html` <product-tile .product=${product}></product-tile> `
        )}
      </div>
    `;
  }
}
