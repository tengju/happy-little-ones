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
      position: sticky;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      padding: 0 1rem;
      top: 0;
      z-index: 2;
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

    .header-icon {
      width: 1rem;
      height: 1rem;
    }

    .cursor-pointer {
      cursor: pointer;
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
        <a href="/">
          <img
            class="logo cursor-pointer"
            src="${logo}"
            alt="Happy Little Ones"
          />
        </a>
        <span>
          <lion-icon
            icon-id="lion:store:search"
            class="header-icon cursor-pointer"
            style=" margin-right: 1rem;"
            @click="${this.#toggleFilterBar}"
          ></lion-icon>
          <lion-icon
            icon-id="lion:store:basket"
            class="header-icon cursor-pointer"
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
