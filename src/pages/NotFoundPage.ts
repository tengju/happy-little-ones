import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
  render() {
    return html` <h1 style="text-align:center;">404 - Page Not Found</h1> `;
  }
}
