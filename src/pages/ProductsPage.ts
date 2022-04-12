import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { IProduct } from '../interfaces/IProduct.js';

export class ProductsPage extends LitElement {
  @property({ type: Array }) products: IProduct[] = [];

  @property({ type: Boolean }) errored = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.getData();
  }

  async getData() {
    this.errored = false;
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      this.products = data;
    } catch (error) {
      this.errored = true;
      this.products = [];
    }
  }

  render() {
    return html`
      <main>
        <div>Products</div>
        ${this.errored ? html`<div>Could not fetch products</div>` : ''}
        ${this.products.map(
          product => html`<a href="products/${product.id}">${product.name}</a>`
        )}
      </main>
    `;
  }
}

customElements.define('products-page', ProductsPage);
