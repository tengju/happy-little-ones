import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class HomePage extends LitElement {
  @property({ type: String }) title = 'Happy Little Ones';

  static styles = css``;

  render() {
    return html`
      <main>
        <div>THIS IS THE HOMEPAGE</div>
      </main>
    `;
  }
}

customElements.define('home-page', HomePage);
