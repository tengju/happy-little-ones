import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

// Image created on https://hatchful.shopify.com/
const logo = new URL('../../assets/logo_transparent.png', import.meta.url).href;

export class PageHeader extends LitElement {
  @property({ type: String }) title = 'Happy Little Ones';

  static styles = css``;

  render() {
    return html`
      <header>
        <a href="/">HOME</a>
        <a href="/products">PRODUCTS</a>
        <img src="${logo}" alt="Happy Little Ones" />
      </header>
    `;
  }
}

customElements.define('page-header', PageHeader);
