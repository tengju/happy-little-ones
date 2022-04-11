import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class ProductsPage extends LitElement {
  @property({ type: String }) title = 'Happy Little Ones';

  render() {
    return html`
      <main>
        <div>THIS IS THE PRODUCTS PAGE</div>
      </main>
    `;
  }
}

customElements.define('products-page', ProductsPage);
