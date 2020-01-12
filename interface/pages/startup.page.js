import { LitElement, html } from 'lit-element';
import ButtonComponent from '../components/button.component';

class StartupPage extends LitElement {
  render() {
      return html`<p>IOTA-Terminal</p> TEST2XX99<button-component>Test</button-component><button-component link="/wifi-selection">Wifi-Selection</button-component>`;
  }
}

customElements.define('startup-page', StartupPage);