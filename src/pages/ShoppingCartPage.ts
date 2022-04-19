import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { changeView } from '@simplr-wc/router';
import { StoreElement } from '../StoreElement.js';
import { numberToEuro } from '../helpers/number.helper.js';
import { IShoppingItem } from '../interfaces/IShoppingItem.js';
import '../layouts/DefaultLayout.js';

@customElement('shopping-cart-page')
export class ShoppingCartPage extends StoreElement {
  static styles = css`
    section {
      display: flex;
      flex-direction: column;
      max-width: 800px;
      margin: 0 auto;
    }
    img {
      aspect-ratio: 1/1;
      object-fit: cover;
      width: 50px;
    }
    th {
      padding-right: 1.5rem;
    }
    th,
    td {
      border-bottom: 1px solid #ccc;
    }
    .amount-cell {
      display: flex;
      justify-content: space-between;
      width: 80%;
    }
    .cursor-pointer {
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    if (Object.keys(this.shoppingCart).length < 1) {
      changeView({ path: '/' });
    }
  }

  decrementCartItem(item: IShoppingItem) {
    super.decrementCartItem(item);
    if (Object.keys(this.shoppingCart).length < 1) {
      changeView({ path: '/' });
    }
  }

  render() {
    return html`
      <default-layout>
        <section>
          <h1>Shopping cart</h1>
          <table>
            <thead>
              <tr>
                <th align="left"></th>
                <th align="left">Product</th>
                <th align="left">Price</th>
                <th align="left">Amount</th>
                <th align="left">Total</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(this.shoppingCart).map(
                item => html`
                  <tr>
                    <td>
                      <img src="${item.image}" alt="${item.product}"></img>
                    </td>
                    <td>
                      ${item.product} ${item.size ? html`(${item.size})` : ''}
                    </td>
                    <td>${numberToEuro(item.price)}</td>
                    <td>
                      <div class="amount-cell">
                        <lion-icon
                          icon-id="lion:store:basketMinus"
                          class="cursor-pointer"
                          @click=${() => this.decrementCartItem(item)}
                        ></lion-icon>
                          ${item.amount}
                        <lion-icon
                          icon-id="lion:store:basketPlus"
                          class="cursor-pointer"
                          @click=${() => this.incrementCartItem(item)}
                        ></lion-icon>
                      </div>
                    </td>
                    <td>
                      ${numberToEuro(item.price * item.amount)}
                    </td>
                  </tr>
                `
              )}
              ${this.totalPrice < 50
                ? html`
                  <tr>
                    <td colspan="4" align="right">Delivery cost:(below ${numberToEuro(
                      50
                    )})</td>
                    </td>
                    <td>${numberToEuro(7.95)}</td>
                  </tr>
                `
                : ''}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" align="right">Total:</td>
                <td>
                  ${numberToEuro(
                    this.totalPrice < 50
                      ? this.totalPrice + 7.95
                      : this.totalPrice
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      </default-layout>
    `;
  }
}
