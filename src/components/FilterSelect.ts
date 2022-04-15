import { css } from 'lit';
import { LionSelect } from '@lion/select';

// Using the older version of LionSelect because v0.16 has a bug where it has errors with validation imports
export class FilterSelect extends LionSelect {
  static get styles() {
    return [...super.styles, css``];
  }
}

customElements.define('home-page', FilterSelect);
