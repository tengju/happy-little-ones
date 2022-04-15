import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getAllBrands, getAllTypes } from '../helpers/product.helper';
import './FilterSelect.js';

// Image created on https://hatchful.shopify.com/
const logo = new URL('../../../assets/logo_transparent.png', import.meta.url)
  .href;

@customElement('page-header')
export class PageHeader extends LitElement {
  @property({ type: Boolean }) filterBarOpened = false;

  static styles = css`
    header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fafafa;
      margin-bottom: 1rem;
      padding: 0 1rem;
    }

    .logo {
      height: 4rem;
      width: 4rem;
    }

    .filter-bar {
      position: absolute;
      top: 4rem;
      right: 0;
      background-color: #fff;
      z-index: 1;
      overflow: hidden;
      transition-duration: 0.3s;
      height: 0;
    }

    .filter-bar.active {
      height: 100%;
    }

    .filter-button {
      width: 100%;
    }
  `;

  #toggleFilterBar() {
    this.filterBarOpened = !this.filterBarOpened;
  }

  #applyFilter() {
    console.log('applyFilter', this.filterBarOpened);
    this.filterBarOpened = false;
  }

  #getOptions = (option: string) =>
    html` <option value="${option}">${option}</option>`;

  render() {
    return html`
      <header>
        <img class="logo" src="${logo}" alt="Happy Little Ones" />
        <span>
          <lion-icon
            icon-id="lion:store:search"
            style="width: 2rem; height: 2rem; margin-right: 1rem;"
            @click="${this.#toggleFilterBar}"
          ></lion-icon>
          <lion-icon
            icon-id="lion:store:basket"
            style="width: 2rem; height: 2rem;"
          ></lion-icon>
        </span>
        <div class="filter-bar ${this.filterBarOpened ? 'active' : ''}">
          <filter-select>
            <select slot="input">
              <option value="">None</option>
              ${getAllBrands().map(this.#getOptions)}
            </select>
          </filter-select>
          <filter-select>
            <select slot="input">
              <option value="">None</option>
              ${getAllTypes().map(this.#getOptions)}
            </select>
          </filter-select>
          <button class="filter-button" @click=${this.#applyFilter}>
            Search
          </button>
        </div>
      </header>
    `;
  }
}
