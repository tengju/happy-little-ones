import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('stock-chip')
export class StockChip extends LitElement {
  @property({ type: Number }) stock = 0;

  static styles = css`
    .chip {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25em;
      background-color: white;
      outline: thin solid;
      font-size: 0.875rem;
      user-select: none;
    }
  `;

  getStockStyling() {
    return {
      outlineColor: this.stock > 0 ? '#009900' : '#ff0000',
      color: this.stock > 0 ? '#009900' : '#ff0000',
    };
  }

  render() {
    return html`
      <span class="chip" style=${styleMap(this.getStockStyling())}>
        ${this.stock > 0 ? 'In stock' : 'Out of stock'}
      </span>
    `;
  }
}
