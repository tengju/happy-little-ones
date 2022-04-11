import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class PageFooter extends LitElement {
  @property({ type: String }) title = 'Happy Little Ones';

  static styles = css``;

  render() {
    return html` <footer>THIS IS A FOOTER</footer> `;
  }
}

customElements.define('page-footer', PageFooter);
