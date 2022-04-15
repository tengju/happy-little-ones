import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LionSelect } from '@lion/select';

// Using the older version of LionSelect because v0.16 has a bug where it has errors with validation imports
@customElement('filter-select')
export class FilterSelect extends LionSelect {
  static get styles() {
    return [...super.styles, css``];
  }
}
