import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/PageHeader.js';

@customElement('default-layout')
export class DefaultLayout extends LitElement {
  render() {
    return html`
      <page-header></page-header>
      <slot></slot>
    `;
  }
}
