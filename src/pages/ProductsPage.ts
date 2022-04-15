import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sortByDateFunction } from '../helpers/product.helper.js';
import { IProduct } from '../interfaces/IProduct.js';

@customElement('products-page')
export class ProductsPage extends LitElement {
  @property({ type: Array }) products: IProduct[] = [];

  @property({ type: Boolean }) errored = false;

  static styles = css`
    .title-container {
      display: flex;
      justify-content: space-between;
    }
  `;

  connectedCallback(): void {
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
      <main>
        <div class="title-container">Products</div>
        ${this.getErrorTemplate()} ${this.getNoResultTemplate()}
        ${this.products.map(
          product => html`
            <div>
              <span>${product.DateAdded}</span>
              <a href="products/${product.id}">${product.name}</a>
            </div>
          `
        )}
      </main>
    `;
  }
}
