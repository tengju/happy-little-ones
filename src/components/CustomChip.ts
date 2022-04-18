import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('custom-chip')
export class CustomChip extends LitElement {
  @property({ type: String }) backgroundColor = '#e0e0e0';

  @property({ type: String }) color = '#000';

  static styles = css`
    .chip {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      margin: 0 0.25rem 0.25rem 0;
      border-radius: 0.25rem;
      background-color: #e0e0e0;
      color: #000;
    }
  `;

  render() {
    const colorStyling = {
      backgroundColor: this.backgroundColor,
      color: this.color,
    };
    return html`
      <span class="chip" style=${styleMap(colorStyling)}> <slot></slot> </span>
    `;
  }
}
