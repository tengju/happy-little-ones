import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class SingleProductPage extends LitElement {
  @property({ type: String }) title = 'Happy Little Ones';

  render() {
    return html`
      <main>
        <div>THIS IS A SINGLE PRODUCT</div>
      </main>
    `;
  }
}

customElements.define('single-product-page', SingleProductPage);
