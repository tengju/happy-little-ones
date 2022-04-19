/* eslint-disable lit-a11y/click-events-have-key-events */
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { changeView, getCurrentView } from '@simplr-wc/router';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IProduct } from '../interfaces/IProduct.js';
import { getProductById } from '../api/products.api.js';
import { StoreElement } from '../StoreElement.js';

import '../components/BuyButton.js';
import '../components/CustomChip.js';
import '../components/StockChip.js';
import '../components/DetailTable.js';
import '../layouts/DefaultLayout.js';

@customElement('single-product-page')
export class SingleProductPage extends StoreElement {
  @property({ type: Object }) product: IProduct | null = null;

  @property({ type: Boolean }) errored: boolean = false;

  @property({ type: Number }) activeSize: number | null = null;

  static styles = css`
    main {
      display: flex;
      flex-direction: column;
    }
    img {
      aspect-ratio: 1/1;
      object-fit: contain;
      width: 100%;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      max-height: 60vh;
    }

    section {
      padding: 1rem;
    }

    .sizes-container {
      display: flex;
      flex-direction: column;
    }

    .sizes-container custom-chip {
      cursor: pointer;
      user-select: none;
    }

    .buy-button-container {
      display: none;
    }

    .custom-chip-container {
      position: absolute;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      bottom: 1rem;
      right: 1rem;
      max-width: 40vw;
    }

    .price {
      font-weight: bold;
      text-align: center;
      width: 100%;
      padding-bottom: 1rem;
      font-size: 2.5rem;
    }

    .image-container {
      position: relative;
    }

    .label {
      font-size: 1.2rem;
    }

    .mobile-buy-footer {
      position: sticky;
      left: 0;
      bottom: 0;
      padding: 0.5rem;
      background-color: white;
      box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
    }

    @media only screen and (min-width: 768px) {
      h1 {
        margin-top: 0;
      }
      img {
        aspect-ratio: 1/1;
        width: 400px;
        box-shadow: none;
      }

      main {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        max-width: 800px;
        padding: 1rem 0;
      }

      .image-container {
        max-width: 400px;
        padding: 1rem;
      }

      .price {
        text-align: left;
        font-size: 2rem;
        padding-top: 1rem;
      }

      .buy-button-container {
        display: block;
        margin-top: 1rem;
      }

      .custom-chip-container {
        top: 0;
        right: 0;
        padding: 1.5rem 1.5rem;
        max-width: 100%;
      }

      .mobile-buy-footer {
        display: none;
      }
    }
  `;

  constructor() {
    super();
    this.getData();
  }

  #getMaterialChip() {
    if (!this.product || !('Material' in this.product)) return '';
    return html`
      <custom-chip backgroundColor="#ff7676" color="#fff">
        ${this.product.Material}
      </custom-chip>
    `;
  }

  #getAvailableSizesChipSelection() {
    if (!this.product || !('availableSizes' in this.product)) return '';
    return html`
      <div class="sizes-container">
        <span class="label">Available sizes:</span>

        <div>
          ${this.product.availableSizes?.map(
            size => html`
              <custom-chip
                @click="${() => {
                  this.activeSize = size;
                }}"
                .backgroundColor="${this.activeSize === size
                  ? '#0022ff'
                  : '#76b8ff'}"
                color="#fff"
              >
                ${size}
              </custom-chip>
            `
          )}
        </div>
      </div>
    `;
  }

  async getData() {
    const {
      params: { id },
    } = getCurrentView();
    this.errored = false;
    try {
      const { body }: any = await getProductById(id);
      if ('availableSizes' in body) {
        const [activeSize] = body.availableSizes;
        this.activeSize = activeSize;
      }
      this.product = body as IProduct;
    } catch (error) {
      changeView({ path: '/not-found' });
    }
  }

  addProductToCart() {
    super.addProductToCart(this.product, this.activeSize);
  }

  render() {
    return html`
      <default-layout>
        <main>
          <div class="image-container">
            <img
              src="${ifDefined(this.product?.image)}"
              alt="${ifDefined(this.product?.name)}"
            />
            <div class="custom-chip-container">
              <custom-chip
                backgroundColor="#76b8ff"
                color="#fff"
              >
                ${this.product?.brand}
              </custom-chip>
              ${this.#getMaterialChip()}
            </div>
            </custom-chip>
          </div>
          <section>
            <h1>
            ${this.product?.name}</h1>
            <stock-chip .stock="${this.product?.stock || 0}"></stock-chip>
            <div class="price">
              <span>${this.product?.Price}</span>
            </div>
            <div class="buy-button-container">
              <buy-button 
              .stock="${this.product?.stock || 0}"
              @click=${this.addProductToCart}
              ></buy-button>
            </div>
            ${this.#getAvailableSizesChipSelection()}


            <h2 class="label">Description:</h2>
            <p class="description">${this.product?.description}</p>

            <detail-table .product=${this.product}> </detail-table>
          </section>
        </main>
        <footer class="mobile-buy-footer" >
          <buy-button 
            .stock="${this.product?.stock || 0}"
            @click=${this.addProductToCart}
          ></buy-button>
        </footer>
      </default-layout>
    `;
  }
}
