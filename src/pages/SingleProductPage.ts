import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { getCurrentView } from '@simplr-wc/router';
import { IProduct } from '../interfaces/IProduct.js';

export class SingleProductPage extends LitElement {
  @property({ type: Object }) product: IProduct | null = null;

  @property({ type: Boolean }) errored = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.getData();
  }

  async getData() {
    const {
      params: { id },
    } = getCurrentView();
    this.errored = false;
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      const data = await response.json();
      this.product = data;
    } catch (error) {
      this.errored = true;
      this.product = null;
    }
  }

  render() {
    return html`
      <main>
        <div>THIS IS A SINGLE PRODUCT</div>
      </main>
    `;
  }
}

customElements.define('single-product-page', SingleProductPage);
