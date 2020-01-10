import { LitElement, html } from 'lit-element';

class ErrorPage extends LitElement {
  render() {
      return html`<h1>Error</h1> <a href="/">Go back to start!</a>`;
  }
}

customElements.define('error-page', ErrorPage);