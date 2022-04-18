import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('buy-button')
export class BuyButton extends LitElement {
  @property({ type: Number }) stock = 0;

  static styles = css`
    button {
      padding: 0.5rem;
      border-radius: 0.25rem;
      align-self: inherit;
      background-color: white;
      border: #228840 solid medium;
      color: #228840;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      transition: ease-in-out 0.2s;
    }

    button:hover {
      background-color: #228840;
      color: white;
    }

    lion-icon {
      margin-right: 0.25em;
      color: white;
    }
  `;

  render() {
    if (this.stock < 1) return '';
    return html`
      <button>
        <!-- <lion-icon icon-id="lion:store:basketPlus"></lion-icon> -->
        Add to basket
      </button>
    `;
  }
}
