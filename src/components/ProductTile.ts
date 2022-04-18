import { changeView } from '@simplr-wc/router';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IProduct } from '../interfaces/IProduct.js';
import './CustomChip.js';

@customElement('product-tile')
export class ProductTile extends LitElement {
  @property({ type: Object }) product: IProduct | undefined;

  static styles = css`
    .tile {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      border: 0px;
      border-radius: 0.5rem;
      width: 100%;
      background-color: #fefefe;
      cursor: pointer;
      padding: 0;
      overflow: hidden;
      box-shadow: rgb(163 163 163 / 25%) 0px 0px 5px;

      width: 150px;
    }

    .tile img {
      aspect-ratio: 1920 / 1080;
      object-fit: cover;
      object-position: center center;
      width: 100%;
    }

    .detail-section {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      padding: 1rem;
      height: 100%;
    }

    .detail-section span:nth-child(1) {
      font-weight: bold;
      padding-bottom: 1rem;
      font-size: 1rem;
    }

    .detail-section span:nth-child(2) {
      font-size: 1.2rem;
      margin-top: auto;
    }

    custom-chip {
      position: absolute;
      bottom: 0.25rem;
      right: 0.25rem;
    }

    .relative {
      position: relative;
    }

    @media only screen and (min-width: 480px) {
      .tile {
        width: 250px;
      }
      .tile img {
        aspect-ratio: 1/1;
      }
    }
  `;

  goToProductPage() {
    if (this.product?.id) {
      changeView({ path: `/products/${this.product?.id}` });
    }
  }

  render() {
    return html`
      <button class="tile" @click=${this.goToProductPage}>
        <div class="relative">
          <img
            src="${ifDefined(this.product?.image)}"
            alt="${ifDefined(this.product?.name)}"
          />
          <custom-chip backgroundColor="#ff7676" color="#fff">
            ${this.product?.type}
          </custom-chip>
        </div>
        <div class="detail-section">
          <span>${this.product?.name}</span>
          <span>${this.product?.Price}</span>
        </div>
      </button>
    `;
  }
}
