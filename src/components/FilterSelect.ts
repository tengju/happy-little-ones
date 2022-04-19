import { css } from 'lit';
import { LionSelect } from '@lion/select';
import { customElement } from 'lit-element';

@customElement('filter-select')
export class FilterSelect extends LionSelect {
  static get styles() {
    return [...super.styles, css``];
  }
}
