import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IProduct } from '../interfaces/IProduct.js';
import '../components/CustomChip.js';

@customElement('detail-table')
export class DetailTable extends LitElement {
  @property({ type: Object }) product: IProduct | null = null;

  static styles = css`
    tr > td:first-child {
      font-weight: bold;
      min-width: 20vw;
    }

    td {
      border-bottom: 1px solid #ccc;
      margin-right: -0.5rem;
    }

    .label {
      font-weight: bold;
      font-size: 1.2rem;
    }
  `;

  #getMaterialRow() {
    if (!this.product || !('Material' in this.product)) return '';
    return html`
      <tr>
        <td valign="top">Materials</td>
        <td>${this.product.Material}</td>
      </tr>
    `;
  }

  #getMeasuresRow() {
    if (!this.product?.width || !this.product?.height) return '';
    return html`
      <tr>
        <td valign="top">W x H</td>
        <td>${this.product?.width} x ${this.product?.height}</td>
      </tr>
    `;
  }

  render() {
    return html`
      <span class="label">Details:</span>
      <table>
        <tr>
          <td valign="top">Brand</td>
          <td>${this.product?.brand}</td>
        </tr>
        ${this.#getMeasuresRow()} ${this.#getMaterialRow()}
      </table>
    `;
  }
}
